import { Module } from '@nestjs/common';
import { AppController, CatProfile } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        ssl: true,
        tlsAllowInvalidCertificates: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    MessageModule,
    AuthModule,
    
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
