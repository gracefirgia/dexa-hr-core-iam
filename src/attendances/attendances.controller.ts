import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}
  
  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto, @User('id') userId: string) {
    return this.attendancesService.create(createAttendanceDto, userId);
  }

  @Get()
  findAll(@User('id') userId: string) {
    return this.attendancesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendancesService.findOne(+id);
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
