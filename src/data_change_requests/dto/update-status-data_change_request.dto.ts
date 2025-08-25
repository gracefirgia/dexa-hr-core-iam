import { IsNotEmpty } from 'class-validator';

export class UpdateStatusDataChangeRequestDto {
  @IsNotEmpty({message: "Status is required"})
  status: string;
}
