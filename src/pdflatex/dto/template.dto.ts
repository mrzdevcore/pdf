import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';

export class Section {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly body: string;
}

export class Image {
  @ApiProperty()
  @IsString()
  readonly caption: string;

  @ApiProperty()
  @IsString()
  readonly src: string;
}

export class Signature {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly src: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly meta: string;
}

export class MetaInfo {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @ValidateNested()
  readonly data: Map<number, Record<string, string | number>>;
}

export enum TemplateType {
  EEG = 'EEG',
  PRESCRIPTION = 'PRESCRIPTION',
  CONSULTATION = 'CONSULTATION',
}

export class TemplateDto {
  @ApiProperty({ enum: TemplateType, default: TemplateType.EEG })
  @IsEnum(TemplateType)
  readonly type: TemplateType;

  @ApiProperty()
  @ValidateNested()
  @IsArray()
  readonly sections: Section[];

  @ApiProperty()
  @ValidateNested()
  readonly images: Image[];

  @ApiProperty()
  @ValidateNested()
  readonly signature: Signature;

  @ApiProperty()
  @ValidateNested()
  readonly metaInfo: MetaInfo;

  @ApiProperty()
  @IsString()
  readonly paperTitle: string;

  @ApiProperty()
  @IsString()
  readonly headerTitle: string;

  @ApiProperty()
  @IsString()
  readonly footerNote: string;
}
