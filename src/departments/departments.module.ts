import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './departments.model';

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
