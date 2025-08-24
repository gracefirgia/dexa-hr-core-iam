import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './departments.model';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
  ) { }

  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  findAll() {
    return this.departmentModel.findAll(
      {
        attributes: ['id', 'name', 'active'],
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
