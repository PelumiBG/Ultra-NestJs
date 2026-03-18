import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException, UserAlreadyExist } from 'src/exception/auth.exception';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
// import { generateToken } from 'src/utils/token';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new UserAlreadyExist()
    }

    const secPassword = await hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: secPassword,
    });

    await user.save();

    const token = this.generateToken(user);

    return {
      message: 'User Created Successfully',
      data: {
        id: user._id,
        email: user.email,
      },
      token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email});

    if(!user) {
      throw new InvalidCredentialsException()
    };

    const secPassword = await compare(loginUserDto.password, user.password);

    if(!secPassword) {
      throw new InvalidCredentialsException()
    };

    const token = this.generateToken(user)

    return {
      message: 'Login Successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      token
    }
  }
  
  private generateToken(user: User){
    const payload = {
      sub: user._id.toString(),
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async findById(id: string){
    return this.userModel.findById(id);
  }
}