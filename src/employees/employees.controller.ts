import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly sequelize: Sequelize,
  ) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @User('id') userId: string) {
    return this.sequelize.transaction(async (transaction) => {
      const employee = await this.employeesService.create(createEmployeeDto, userId, transaction);
      return employee;
    });
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.sequelize.transaction(async (transaction) => {
      const employee = await this.employeesService.update(id, updateEmployeeDto, transaction);
      return employee;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
