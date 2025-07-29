import { IsString, Validate } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsPDF', async: false })
class IsPDFConstraint implements ValidatorConstraintInterface {
  validate(fileName: string) {
    return typeof fileName === 'string' && fileName.toLowerCase().endsWith('.pdf');
  }
  defaultMessage(args: ValidationArguments) {
    return 'File must be a PDF';
  }
}

export class PostContentDto {
  @IsString()
  title: string;

  @IsString()
  @Validate(IsPDFConstraint)
  fileName: string;
}
