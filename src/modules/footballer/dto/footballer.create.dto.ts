import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class FootballerCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    description: 'Player name',
    type: String,
    example: 'Robert Sapolski',
    required: true,
  })
  name: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @ApiModelProperty({
    description: 'Player number',
    type: Number,
    example: 13,
    required: true,
  })
  number: number;
}
