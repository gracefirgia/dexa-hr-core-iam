import { Injectable } from '@nestjs/common';
import { CreateEmployeeDetailDto } from './dto/create-employee_detail.dto';
import { UpdateEmployeeDetailDto } from './dto/update-employee_detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeDetail } from './employee_details.model';

@Injectable()
export class EmployeeDetailsService {
  constructor(
    @InjectModel(EmployeeDetail)
    private readonly employeeDetailModel: typeof EmployeeDetail,
  ) { }
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

  updatePhoto(id: string, filename: string) {
    return  this.employeeDetailModel.update({ photo: filename }, {
      where: {
        employee_id: id
      },
    });;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeDetail`;
  }
}
