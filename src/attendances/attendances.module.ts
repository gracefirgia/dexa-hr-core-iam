import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from './attendances.model';
import { Employee } from 'src/employees/employees.model';

@Module({
  imports: [SequelizeModule.forFeature([Attendance, Employee])],
  controllers: [AttendancesController],
  providers: [AttendancesService],
})
export class AttendancesModule {}
