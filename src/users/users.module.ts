import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { User } from './schema/user.schema';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions =>  ({
    secret: configService.get<string>('JWT_SECRET') ?? 'secret_key',
    signOptions: { 
      expiresIn: (configService.get<string>('JWT_EXPIRES_IN') as StringValue) ?? '7d' 
    }
  }),
      inject: [ConfigService]
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}