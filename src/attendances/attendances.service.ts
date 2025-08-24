import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance, AttendanceCreationAttributes } from './attendances.model';
import { Employee } from 'src/employees/employees.model';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
  ) { }

  create(createAttendanceDto: CreateAttendanceDto, employeeId: string) {
    const payload: AttendanceCreationAttributes = {
      clock_in: createAttendanceDto.clock_in,
      clock_out: createAttendanceDto.clock_out,
      employee_id: employeeId
    }
    return this.attendanceModel.create(payload)
  }

  findAll(employeeId?: string) {
    const where = {
      active: true,
      ...(employeeId && {employee_id: employeeId})
    }

    return this.attendanceModel.findAll(
      {
        where,
        include: [
          {
            model: Employee,
            attributes: ['name'],
          },
        ],
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
