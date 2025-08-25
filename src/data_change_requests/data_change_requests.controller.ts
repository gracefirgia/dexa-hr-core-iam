import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { DataChangeRequestsService } from './data_change_requests.service';
import { CreateDataChangeRequestDto } from './dto/create-data_change_request.dto';
import { UpdateDataChangeRequestDto } from './dto/update-data_change_request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { GetDataChangeRequestDto } from './dto/get-data_change_request.dto';
import { User } from 'src/common/decorators/user.decorator';
import { EmployeeTokenService } from 'src/employee_token/employee_token.service';
import { FirebaseAdminService } from 'src/firebase_admin/firebase_admin.service';
import { UpdateStatusDataChangeRequestDto } from './dto/update-status-data_change_request.dto';

@UseGuards(JwtAuthGuard)
@Controller('data-change-requests')
export class DataChangeRequestsController {
  constructor(
    private readonly dataChangeRequestsService: DataChangeRequestsService,
    private readonly employeeTokenService: EmployeeTokenService,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  @Post()
  async create(@Body() createDataChangeRequestDto: CreateDataChangeRequestDto, @User('id') userId: string) {
    const request = await this.dataChangeRequestsService.create(createDataChangeRequestDto, userId);

    if (request) {
      const tokens = await this.employeeTokenService.findAll()

      const notificationPromises = tokens.map((t) =>
        this.firebaseAdminService.sendNotification(
          t.fcm_token,
          'New Change Request',
          `Employee ${t?.employee?.name} submitted a change request with code: ${request?.code}!`
        ),
      );
      await Promise.all(notificationPromises);
    }
    return request;
  }

  @Get()
  findAll(@Query() param: GetDataChangeRequestDto) {
    return this.dataChangeRequestsService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataChangeRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataChangeRequestDto: UpdateDataChangeRequestDto) {
    return this.dataChangeRequestsService.update(+id, updateDataChangeRequestDto);
  }

  @Patch('approval/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateDataChangeRequestDto: UpdateStatusDataChangeRequestDto,
    @User('id') userId: string
  ) {
    return this.dataChangeRequestsService.updateStatus(id, updateDataChangeRequestDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataChangeRequestsService.remove(+id);
  }
}
