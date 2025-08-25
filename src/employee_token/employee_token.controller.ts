import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EmployeeTokenService } from './employee_token.service';
import { CreateEmployeeTokenDto } from './dto/create-employee_token.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('employee-token')
export class EmployeeTokenController {
  constructor(private readonly employeeTokenService: EmployeeTokenService) {}

  @Post()
  create(@Body() createEmployeeTokenDto: CreateEmployeeTokenDto, @User('id') userId: string) {
    return this.employeeTokenService.create(createEmployeeTokenDto, userId);
  }

  @Get()
  findAll() {
    return this.employeeTokenService.findAll();
  }
}
