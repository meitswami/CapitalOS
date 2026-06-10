import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsUUID()
  industryId: string;

  @ApiProperty()
  @IsUUID()
  subSectorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  legalName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tradeName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pan?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gstin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  incorporationDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  registeredAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  organizationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  employeeCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  annualRevenue?: number;
}

export class UpdateCompanyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tradeName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  registeredAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  employeeCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  annualRevenue?: number;
}

export class CreateCompanyProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  businessDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  productsServices?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  targetMarket?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  competitivePosition?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;
}
