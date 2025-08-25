import { IsNotEmpty } from "class-validator";
import { GetAllDto } from "src/common/dto/get-all.dto";

export class GetAttendanceDto extends GetAllDto {
  @IsNotEmpty({ message: "Start date is required" })
  start_date: string;
  
  @IsNotEmpty({ message: "End date is required" })
  end_date: string;
}