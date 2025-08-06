// src/teacher/dto/update-profile.dto.ts
import {
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9 ]*$/, { message: 'Name must not contain special characters' })
  name: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/.*[a-z].*/, { message: 'Password must contain at least one lowercase letter' })
  password: string;

  @IsString()
  @Matches(/^01\d*$/, { message: 'Phone number must start with 01' })
  phone: string;
}
