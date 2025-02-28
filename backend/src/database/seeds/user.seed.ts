import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async run() {
    const users = [
      {
        email: 'admin@example.com',
        name: 'Admin',
        lastname: 'User',
        birthdate: new Date('1990-01-01'),
        password: await bcrypt.hash('adminpassword', 10),
        role: 'admin',
        username: 'adminuser',
      },
      {
        email: 'regularuser@yopmail.com',
        name: 'Regular',
        lastname: 'User',
        birthdate: new Date('1995-05-15'),
        password: await bcrypt.hash('userpassword', 10),
        role: 'user',
        username: 'regularuser',
      },
    ];

    for (const user of users) {
      const exists = await this.userRepository.findOne({ where: { email: user.email } });
      if (!exists) {
        await this.userRepository.save(user);
      }
    }

    console.log('✅ Usuarios insertados correctamente.');
  }
}
