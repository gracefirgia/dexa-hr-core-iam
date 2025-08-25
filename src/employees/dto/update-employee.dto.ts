import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsNotEmpty({message: "ID is required"})
  id: string;

  @IsOptional()
  code: string;
}
