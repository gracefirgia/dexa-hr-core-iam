import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { User } from 'src/common/decorators/user.decorator';
import moment from 'moment';
import { Attendance } from './attendances.model';

@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}
  
  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto, @User('id') userId: string) {
    return this.attendancesService.recordAttendance(createAttendanceDto, userId);
  }

  @Get()
  findAll(@User('id') userId: string) {
    return this.attendancesService.findAll(userId);
  }

  @Get('summary')
  async attendanceSummary(@User('id') userId: string) {
    const attendances = await this.attendancesService.findAll(userId);

    const summary = attendances?.reduce((acc, attendance: Attendance) => {
      acc.total += 1
      if (attendance.isLate) acc.late += 1
      if (attendance.isUnder) acc.under += 1
      if (attendance.isOver) acc.over += 1
      
      return acc
    }, {total: 0, late: 0, under: 0, over: 0})
    return summary
  }

  @Get('today')
  findOne(@User('id') userId: string) {
    const date = moment().format("YYYY-MM-DD")

    const clockInStart = moment(`${date} 00:00:00`, "YYYY-MM-DD HH:mm:ss")
    const clockInEnd = moment(`${date} 23:59:59`, "YYYY-MM-DD HH:mm:ss")
    return this.attendancesService.findTodayAttendance(userId, clockInStart, clockInEnd);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendancesService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendancesService.remove(+id);
  }
}
