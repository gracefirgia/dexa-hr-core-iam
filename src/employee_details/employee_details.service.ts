import { Injectable } from '@nestjs/common';
import { CreateEmployeeDetailDto } from './dto/create-employee_detail.dto';
import { UpdateEmployeeDetailDto } from './dto/update-employee_detail.dto';

@Injectable()
export class EmployeeDetailsService {
  create(createEmployeeDetailDto: CreateEmployeeDetailDto) {
    return 'This action adds a new employeeDetail';
  }

  findAll() {
    return `This action returns all employeeDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeDetail`;
  }

  update(id: number, updateEmployeeDetailDto: UpdateEmployeeDetailDto) {
    return `This action updates a #${id} employeeDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeDetail`;
  }
}
