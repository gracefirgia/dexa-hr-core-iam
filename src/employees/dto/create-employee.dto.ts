import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty({message: "Name is required"})
  name: string;

  @IsNotEmpty({message: "Name is required"})
  active: boolean;

  @IsNotEmpty({message: "Name is required"})
  email: string;

  @IsNotEmpty({message: "Department is required"})
  department_id: string;

  @IsNotEmpty({message: "Role is required"})
  role_id: string;

  @IsOptional()
  phone: string;

  @IsNotEmpty({message: "Name is required"})
  password: string;

  @IsOptional()
  join_date: string;

  @IsOptional()
  terminate_date: string;
}
