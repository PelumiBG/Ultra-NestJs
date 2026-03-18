import { Controller, Get, Post, Param, Body, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import type { UUID } from 'node:crypto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.greet();
  }
}

@Controller('cat')
export class CatProfile {

  @Get(':id')
  findOne(@Param() id: string) {
    return { id }
  }

  @Post('create')
  
  create(@Body() id: UUID){
    return `This is what you just created ${id}`
  }
}