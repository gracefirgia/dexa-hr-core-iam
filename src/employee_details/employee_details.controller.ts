import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeDetailsService } from './employee_details.service';
import { CreateEmployeeDetailDto } from './dto/create-employee_detail.dto';
import { UpdateEmployeeDetailDto } from './dto/update-employee_detail.dto';

@Controller('employee-details')
export class EmployeeDetailsController {
  constructor(private readonly employeeDetailsService: EmployeeDetailsService) {}

  @Post()
  create(@Body() createEmployeeDetailDto: CreateEmployeeDetailDto) {
    return this.employeeDetailsService.create(createEmployeeDetailDto);
  }

  @Get()
  findAll() {
    return this.employeeDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDetailDto: UpdateEmployeeDetailDto) {
    return this.employeeDetailsService.update(+id, updateEmployeeDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeDetailsService.remove(+id);
  }
}
