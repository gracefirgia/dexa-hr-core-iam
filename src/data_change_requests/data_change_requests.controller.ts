import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataChangeRequestsService } from './data_change_requests.service';
import { CreateDataChangeRequestDto } from './dto/create-data_change_request.dto';
import { UpdateDataChangeRequestDto } from './dto/update-data_change_request.dto';

@Controller('data-change-requests')
export class DataChangeRequestsController {
  constructor(private readonly dataChangeRequestsService: DataChangeRequestsService) {}

  @Post()
  create(@Body() createDataChangeRequestDto: CreateDataChangeRequestDto) {
    return this.dataChangeRequestsService.create(createDataChangeRequestDto);
  }

  @Get()
  findAll() {
    return this.dataChangeRequestsService.findAll();
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
