import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) { }

  findAll() {
    return this.roleModel.findAndCountAll(
      {
        attributes: ['id', 'name'],
        where: { active: true },
      }
    );
  }
}
