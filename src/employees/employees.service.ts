import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from 'src/departments/departments.model';
import { Role } from 'src/roles/roles.model';
import { EmployeeDetail } from 'src/employee_details/employee_details.model';

@Injectable()
export class EmployeesService {
    constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: string) {
    return this.employeeModel.findByPk(id, {
      attributes: ["id", "name", "employee_code", "email"],
      include: [
        {
          model: Department,
          attributes: ["id", "name"]
        },
        {
          model: Role,
          attributes: ["id", "name"]
        },
        {
          as: "detail",
          model: EmployeeDetail,
          attributes: ["photo", "phone", "join_date"]
        },
      ]
    })
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
