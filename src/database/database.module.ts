import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('MARIADB_HOST'),
        port: configService.get('MARIADB_PORT'),
        username: configService.get('MARIADB_USER'),
        password: configService.get('MARIADB_PASSWORD'),
        database: configService.get('MARIADB_DB'),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}'
        ],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule {}