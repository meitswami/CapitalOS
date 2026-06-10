import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@capitalos.io' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'CapitalOS@2026' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ description: 'MFA TOTP code when MFA is enabled' })
  @IsOptional()
  @IsString()
  mfaCode?: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class MfaSetupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
}
