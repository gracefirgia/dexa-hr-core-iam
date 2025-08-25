import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { EmployeeDetailsService } from './employee_details.service';
import { CreateEmployeeDetailDto } from './dto/create-employee_detail.dto';
import { UpdateEmployeeDetailDto } from './dto/update-employee_detail.dto';
import { FileUploadInterceptor } from 'src/common/interceptors/file-upload.interceptor';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';

@UseGuards(JwtAuthGuard)
@Controller('employee-details')
export class EmployeeDetailsController {
  constructor(private readonly employeeDetailsService: EmployeeDetailsService) {}

  @Post()
  create(@Body() createEmployeeDetailDto: CreateEmployeeDetailDto) {
    return this.employeeDetailsService.create(createEmployeeDetailDto);
  }

  @Get()
  findAll() {
    return this.employeeDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeDetailsService.findOne(+id);
  }

  @Patch('profile-picture')
  @UseInterceptors(FileUploadInterceptor('file', 'employee_profile'))
  uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @User('id') userId: string) {
    const uploaded = {
      filename: file.filename,
      url: `/uploads/employee_profile/${file.filename}`,
    }
    return this.employeeDetailsService.updatePhoto(userId, uploaded?.filename);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDetailDto: UpdateEmployeeDetailDto) {
    return this.employeeDetailsService.update(+id, updateEmployeeDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeDetailsService.remove(+id);
  }
}
