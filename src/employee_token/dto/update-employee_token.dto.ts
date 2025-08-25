import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeTokenDto } from './create-employee_token.dto';

export class UpdateEmployeeTokenDto extends PartialType(CreateEmployeeTokenDto) {}
