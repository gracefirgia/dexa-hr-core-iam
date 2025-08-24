import { Injectable } from '@nestjs/common';
import { CreateDataChangeRequestDto } from './dto/create-data_change_request.dto';
import { UpdateDataChangeRequestDto } from './dto/update-data_change_request.dto';

@Injectable()
export class DataChangeRequestsService {
  create(createDataChangeRequestDto: CreateDataChangeRequestDto) {
    return 'This action adds a new dataChangeRequest';
  }

  findAll() {
    return `This action returns all dataChangeRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataChangeRequest`;
  }

  update(id: number, updateDataChangeRequestDto: UpdateDataChangeRequestDto) {
    return `This action updates a #${id} dataChangeRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataChangeRequest`;
  }
}
