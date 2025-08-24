import { IsNotEmpty } from "class-validator";

export class CreateDepartmentDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Active is required' })
  active: boolean;
}
