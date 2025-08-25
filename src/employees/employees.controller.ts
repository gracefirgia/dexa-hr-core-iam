import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/common/decorators/user.decorator';
import { FirebaseAdminService } from 'src/firebase_admin/firebase_admin.service';
import { EmployeeTokenService } from 'src/employee_token/employee_token.service';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly sequelize: Sequelize,
    private readonly employeeTokenService: EmployeeTokenService,
    private readonly firebaseAdminService: FirebaseAdminService,
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
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @User('name') name:string) {
    const request = await this.sequelize.transaction(async (transaction) => {
      const employee = await this.employeesService.update(id, updateEmployeeDto, transaction);
      return employee;
    });
    if (request) {
      const tokens = await this.employeeTokenService.findAll()

      const notificationPromises = tokens.map((t) =>
        this.firebaseAdminService.sendNotification(
          t.fcm_token,
          'New Profile Info Change',
          `Employee ${name} successfully changed their profile information!`
        ),
      );
      await Promise.all(notificationPromises);
    }
    return request
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
