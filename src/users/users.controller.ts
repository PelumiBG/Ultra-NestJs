import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(201)
  register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try{
      return this.usersService.register(createUserDto)
    }catch(error){
      throw new Error(error.message)
    }
  };

  @Post('login')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    try{
      return this.usersService.login(loginUserDto)
    }catch(error){
      throw new Error(error.message)
    }
  }
};