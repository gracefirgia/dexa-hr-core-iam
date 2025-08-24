import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from './attendances.model';
import { Employee } from 'src/employees/employees.model';
import { Op } from 'sequelize';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
  ) { }

  recordAttendance(createAttendanceDto: CreateAttendanceDto, employeeId: string) {
    if ( createAttendanceDto.id ) {
      this.attendanceModel.update({ clock_out: new Date().toString() }, { where: {id: createAttendanceDto.id} })
      return "Attendance Updated!"
    }

    const payload = {
      clock_in: new Date().toString(),
      employee_id: employeeId
    }
    this.attendanceModel.create(payload)
    return "Attendance Recorded!"
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

  findOne(params: Partial<Attendance>) {
    return this.attendanceModel.findOne({
      where: params
    })
  }

  findTodayAttendance(employee_id, clock_in_start,clock_in_end) {
    console.log({clock_in_start, clock_in_end})
    return this.attendanceModel.findOne({
      where: {
        active: true,
        employee_id: employee_id,
        clock_in: {
          [Op.between]: [clock_in_start, clock_in_end],
        },
      }
    })
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
