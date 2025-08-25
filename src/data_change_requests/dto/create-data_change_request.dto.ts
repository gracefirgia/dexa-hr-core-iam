import { IsNotEmpty } from "class-validator";

export class CreateDataChangeRequestDto {
  @IsNotEmpty({message: "Type is required"})
  type: string;

  @IsNotEmpty({message: "Notes is required"})
  notes: string;

  @IsNotEmpty({message: "Field Changes is required"})
  field_changes: string;
}
