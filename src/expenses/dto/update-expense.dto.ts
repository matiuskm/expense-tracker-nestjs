import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateExpenseDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
