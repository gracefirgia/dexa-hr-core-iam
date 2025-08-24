import { IsDateString, IsOptional } from "class-validator";

export class CreateAttendanceDto {
  @IsDateString()
  clock_in: string;

  @IsOptional()
  @IsDateString()
  clock_out: string;
}
