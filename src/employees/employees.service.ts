import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from 'src/departments/departments.model';
import { Role } from 'src/roles/roles.model';
import { EmployeeDetail } from 'src/employee_details/employee_details.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { makeId } from 'src/utils/genererator';
import bcrypt from 'bcryptjs';

@UseGuards(JwtAuthGuard)
@Injectable()
export class EmployeesService {
    constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
    @InjectModel(EmployeeDetail) 
    private readonly employeeDetailModel: typeof EmployeeDetail,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto, userId, transaction) {
    const code = makeId(5)
    const hash = await bcrypt.hash(createEmployeeDto.password, 10)
    const payload = {
      name: createEmployeeDto.name,
      employee_code: `DEXA-${code}`,
      email: createEmployeeDto.email,
      password: hash,
      department_id: createEmployeeDto.department_id,
      role_id: createEmployeeDto.role_id,
      created_by: userId,
      active: createEmployeeDto.active
    }
    const employee = await this.employeeModel.create(payload as any, {
      transaction
    })
    
    const employee_detail = {
      employee_id: employee?.id,
      photo: null,
      phone: createEmployeeDto.phone,
      join_date: createEmployeeDto.join_date,
      terminate_date: createEmployeeDto.terminate_date,
    }

    const details = await this.employeeDetailModel.create(employee_detail as any, {
      transaction
    });

    return { ...employee.toJSON(), details }
  }

  findAll() {
    return this.employeeModel.findAndCountAll(
      {
        attributes: ["id", "employee_code","name", "email", "active"],
        include: [
          {
            as: "department",
            attributes: ["id", "name"],
            model: Department,
          },
          {
            as: "role",
            attributes: ["id", "name"],
            model: Role,
          },
          {
            as: "detail",
            attributes: ["photo", "phone", "join_date", "terminate_date"],
            model: EmployeeDetail,
          }
        ]
      }
    );
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

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto, transaction) {
    const payload = {
      name: updateEmployeeDto.name,
      department_id: updateEmployeeDto.department_id,
      role_id: updateEmployeeDto.role_id,
      active: updateEmployeeDto.active
    }
    await this.employeeModel.update(payload as any, {
      where: {
        id
      },
      transaction
    })
    
    const employee_detail = {
      employee_id: id,
      phone: updateEmployeeDto.phone,
      join_date: updateEmployeeDto.join_date,
      terminate_date: updateEmployeeDto.terminate_date,
    }

    await this.employeeDetailModel.update(employee_detail as any, {
      where: {
        employee_id: id
      },
      transaction
    });

    return { payload, employee_detail }
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
