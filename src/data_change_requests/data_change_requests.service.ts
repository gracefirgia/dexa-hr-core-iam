import { Injectable } from '@nestjs/common';
import { CreateDataChangeRequestDto } from './dto/create-data_change_request.dto';
import { UpdateDataChangeRequestDto } from './dto/update-data_change_request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DataChangeRequest } from './data_change_requests.model';
import { calculatePage } from 'src/utils/calculate';
import { GetDataChangeRequestDto } from './dto/get-data_change_request.dto';
import { Op } from 'sequelize';
import { Employee } from 'src/employees/employees.model';
import { makeId } from 'src/utils/genererator';
import { UpdateStatusDataChangeRequestDto } from './dto/update-status-data_change_request.dto';

@Injectable()
export class DataChangeRequestsService {
  constructor(
    @InjectModel(DataChangeRequest)
    private readonly dataChangeRequestModel: typeof DataChangeRequest,
  ) { }

  create(createDataChangeRequestDto: CreateDataChangeRequestDto, userId: string) {
    const field_changes = JSON.parse(createDataChangeRequestDto.field_changes)
    const code = makeId(5)
    const payload: Partial<DataChangeRequest> = {
      employee_id: userId,
      code: `CR-${createDataChangeRequestDto.type}-${code}`,
      type: createDataChangeRequestDto.type,
      notes: createDataChangeRequestDto.notes,
      field_changes,
    }
    
    return this.dataChangeRequestModel.create(payload as any);
  }

  findAll(param?: GetDataChangeRequestDto) {
    const { limit, offset } = calculatePage(param?.limit, param?.page)
    const where = {
      active: true,
      ...(param?.employee_id && { employee_id: param?.employee_id }),
      ...(param?.start_date && {
        requested_at: {
          [Op.between]: [param?.start_date, param?.end_date],
        },
      })
    }

    return this.dataChangeRequestModel.findAndCountAll(
      {
        attributes: [
          "id", "code", "type", "notes", "status", "field_changes", "requested_at"
        ],
        include: [
          {
            model: Employee,
            attributes: ["id", "name"]
          }
        ],
        where,
        offset,
        limit
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} dataChangeRequest`;
  }

  update(id: number, updateDataChangeRequestDto: UpdateDataChangeRequestDto) {
    return `This action updates a #${id} dataChangeRequest`;
  }

  updateStatus(id: string, updateStatusDataChangeRequestDto: UpdateStatusDataChangeRequestDto, userId: string) {
    return this.dataChangeRequestModel.update({ status: updateStatusDataChangeRequestDto.status, reviewed_by: userId }, { where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} dataChangeRequest`;
  }
}
