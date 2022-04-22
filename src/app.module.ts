import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TagsModule } from './tags/tags.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MARIADB_HOST: Joi.string().required(),
        MARIADB_PORT: Joi.number().required(),
        MARIADB_USER: Joi.string().required(),
        MARIADB_PASSWORD: Joi.string().required(),
        MARIADB_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    DatabaseModule,
    ProductsModule,
    UsersModule,
    AuthenticationModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}