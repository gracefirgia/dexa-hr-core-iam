import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDetailDto } from './create-employee_detail.dto';

export class UpdateEmployeeDetailDto extends PartialType(CreateEmployeeDetailDto) {}
