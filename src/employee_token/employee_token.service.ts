import { Injectable } from '@nestjs/common';
import { CreateEmployeeTokenDto } from './dto/create-employee_token.dto';
import { UpdateEmployeeTokenDto } from './dto/update-employee_token.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeToken } from './employee_token.model';
import { Employee } from 'src/employees/employees.model';
import { Role } from 'src/roles/roles.model';
import { Op } from 'sequelize';

@Injectable()
export class EmployeeTokenService {
  constructor(
    @InjectModel(EmployeeToken)
    private readonly employeeTokenModel: typeof EmployeeToken,
  ) { }
  create(createEmployeeTokenDto: CreateEmployeeTokenDto, userId: string) {
    const payload = {
      employee_id: userId,
      fcm_token: createEmployeeTokenDto.token
    }
    return this.employeeTokenModel.upsert(payload as any);
  }

  findAll() {
    return this.employeeTokenModel.findAll({
      include: [
        {
          model: Employee,
          include: [
            {
              model: Role,
              where: {
                name: {
                  [Op.in]: ["SUPERADMIN", "ADMINHR"]
                }
              }
            }
          ]
        }
      ]
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeToken`;
  }

  update(id: number, updateEmployeeTokenDto: UpdateEmployeeTokenDto) {
    return `This action updates a #${id} employeeToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeToken`;
  }
}
