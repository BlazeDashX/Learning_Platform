import { IsString, IsInt, Min, MaxLength, IsOptional, IsIn } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

