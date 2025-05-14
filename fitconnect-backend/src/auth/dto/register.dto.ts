import { IsEmail, IsNotEmpty, MinLength, IsIn, IsDateString, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password!: string;

  @IsIn(['PATIENT', 'TRAINER', 'NUTRITIONIST'], { message: 'Tipo de usuário inválido' })
  role!: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate!: string;  // Deve ser enviado no formato YYYY-MM-DD

  @IsNotEmpty()
  @IsEnum(['MALE', 'FEMALE'])
  gender!: 'MALE' | 'FEMALE';
}