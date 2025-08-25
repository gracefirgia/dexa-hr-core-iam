import { IsNotEmpty, IsOptional } from "class-validator";
import { GetAllDto } from "src/common/dto/get-all.dto";

export class GetDataChangeRequestDto extends GetAllDto {
  @IsNotEmpty({ message: "Start date is required" })
  start_date: string;
  
  @IsNotEmpty({ message: "End date is required" })
  end_date: string;
  
  @IsOptional()
  employee_id?: string;
}