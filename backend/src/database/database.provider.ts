import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export const DatabaseProvider:DynamicModule = TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    async useFactory(config:ConfigService) {
        const dbConfig={
            type: config.get("DATABASE_TYPE"),
            host: config.get("DATABASE_HOST"),
            port: +config.get("DATABASE_PORT"),
            username:config.get("DATABASE_USER"),
            password:config.get("DATABASE_PASSWORD"),
            database:config.get("DATABASE"),
            ssl:true,
            synchronize:true,
            autoLoadEntities:true
        } as DataSourceOptions
        
        return dbConfig
    }
})