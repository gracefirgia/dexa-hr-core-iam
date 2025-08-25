import { IsNotEmpty } from "class-validator";

export class CreateEmployeeTokenDto {
  @IsNotEmpty({message: "Token is required"})
  token: string;
}
