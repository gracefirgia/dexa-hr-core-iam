import { IsOptional } from "class-validator";

export class CreateAttendanceDto {
  @IsOptional()
  id: string;
  
}
