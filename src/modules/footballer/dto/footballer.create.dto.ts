import { IsDefined, IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class FootballerCreateDto {
  @IsString()
  @Length(5, 100)
  @IsDefined()
  @ApiModelProperty({
    description: 'Player name',
    type: String,
    example: 'Robert Sapolski',
    required: true,
  })
  name: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @IsDefined()
  @ApiModelProperty({
    description: 'Player number',
    type: Number,
    example: 13,
    required: true,
  })
  number: number;
}
