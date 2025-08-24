import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Department, DepartmentCreationAttributes } from './departments.model';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
  ) { }

  create(createDepartmentDto: CreateDepartmentDto) {
    const payload: DepartmentCreationAttributes = {
      name: createDepartmentDto.name,
      active: createDepartmentDto.active
    };
    return this.departmentModel.create(payload);
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

  update(id: string, updateDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.update(updateDepartmentDto, {
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
