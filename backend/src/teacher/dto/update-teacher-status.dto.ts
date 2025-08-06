import { IsIn } from 'class-validator';

export class UpdateTeacherStatusDto {
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';
}
