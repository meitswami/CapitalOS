import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationType } from '@capitalos/database';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: OrganizationType })
  @IsEnum(OrganizationType)
  type: OrganizationType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gstin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pan?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;
}

export class UpdateOrganizationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;
}
