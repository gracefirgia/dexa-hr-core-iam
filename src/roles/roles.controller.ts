import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }
}
