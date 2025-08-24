import { PartialType } from '@nestjs/mapped-types';
import { CreateDataChangeRequestDto } from './create-data_change_request.dto';

export class UpdateDataChangeRequestDto extends PartialType(CreateDataChangeRequestDto) {}
