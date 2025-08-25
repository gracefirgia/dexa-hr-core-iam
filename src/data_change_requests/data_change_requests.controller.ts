import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { DataChangeRequestsService } from './data_change_requests.service';
import { CreateDataChangeRequestDto } from './dto/create-data_change_request.dto';
import { UpdateDataChangeRequestDto } from './dto/update-data_change_request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { GetDataChangeRequestDto } from './dto/get-data_change_request.dto';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('data-change-requests')
export class DataChangeRequestsController {
  constructor(private readonly dataChangeRequestsService: DataChangeRequestsService) {}

  @Post()
  create(@Body() createDataChangeRequestDto: CreateDataChangeRequestDto, @User('id') userId: string) {
    return this.dataChangeRequestsService.create(createDataChangeRequestDto, userId);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataChangeRequestsService.remove(+id);
  }
}
