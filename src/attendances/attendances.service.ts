import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from './attendances.model';
import { Op, Sequelize } from 'sequelize';
import { calculateWorkTime } from './utils/calculate';
import { Employee } from 'src/employees/employees.model';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
  ) { }

  recordAttendance(createAttendanceDto: CreateAttendanceDto, employeeId: string) {
    const date = new Date().toString()
    if ( createAttendanceDto.id ) {
      const { under, overtime } = calculateWorkTime(createAttendanceDto.clockIn, date)
      this.attendanceModel.update({ clock_out: date, isUnder: under, isOver: overtime }, { where: {id: createAttendanceDto.id} })
      return "Attendance Updated!"
    }

    const { late, under, overtime } = calculateWorkTime(createAttendanceDto.clockIn)
    const payload = {
      clock_in: date,
      employee_id: employeeId,
      isLate: late,
      isUnder: under,
      isOver: overtime
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
        attributes: [
          "id", "clock_in", "clock_out", "isLate", "isUnder", "isOver",
          [
          Sequelize.literal(`
            CASE 
              WHEN "isLate" = true THEN 'LATE' 
              WHEN "isUnder" = true THEN 'UNDERTIME'
              WHEN "isOver" = true THEN 'OVERTIME' 
              ELSE 'NORMAL' 
            END
          `),
          "status"
          ],
        ],
        include: [
          {
            model: Employee,
            attributes: ["id", "name"]
          }
        ],
        where,
      }
    );
  }

  findOne(params: Partial<Attendance>) {
    return this.attendanceModel.findOne({
      where: params
    })
  }

  findTodayAttendance(employee_id, clock_in_start,clock_in_end) {
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
