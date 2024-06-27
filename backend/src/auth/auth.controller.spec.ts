import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '../user/schema/user.schema';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { LoginDTOStub, RegisterDTOStub } from "../../test/stubs/AuthDto.stub";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { hash } from 'bcrypt'
import Rol from '../user/entities/user.rol';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';

describe('AuthController', () => {
  let authController: AuthController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {provide: getModelToken(User.name), useValue: userModel},
      ],
      imports: [
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '20h' },
      })
    ]
    }).compile();
    authController = moduleRef.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe("Register", () => {
    it("should return the saved object", async () => {
      const createdUser = await authController.registerUser(RegisterDTOStub());
      expect(createdUser.username).toBe(RegisterDTOStub().username);
    });
  });

  describe("login", () => {
    it("should return the corresponding saved object", async () => {
      const { password } = RegisterDTOStub();
      const plainToHash = await hash(password, 10);
      const userObject = new CreateUserDto();
      userObject.email = RegisterDTOStub().email;
      userObject.username = RegisterDTOStub().username;
      userObject.password = password;
      userObject.rol = Rol.PLAYER;
      await (authController.registerUser(userObject));

      const data = await authController.loginUser(LoginDTOStub());
      expect(data.user.username).toBe(RegisterDTOStub().username);
    });
    it("should return HttpException", async () => {
      await expect(authController.loginUser(LoginDTOStub())).rejects.toThrow(HttpException);
    });
  });
});