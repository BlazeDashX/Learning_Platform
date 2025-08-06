import { IsString, Matches, IsNotEmpty, IsUrl, IsDateString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Matches(/^[^\d]+$/, { message: 'Name must not contain numbers' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/[@#$&]/, { message: 'Password must include @, #, $ or &' })
  password: string;

  @IsDateString({}, { message: 'Birth date must be a valid date' })
  birthDate: string;

  @IsUrl({}, { message: 'Social link must be a valid URL' })
  socialLink: string;
}
