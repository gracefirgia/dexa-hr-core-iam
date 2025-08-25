import { IsNotEmpty } from "class-validator";

export class GetAllDto {
  @IsNotEmpty({ message: "Page is required" })
  page: string;
  
  @IsNotEmpty({ message: "Limit is required" })
  limit: string;
}