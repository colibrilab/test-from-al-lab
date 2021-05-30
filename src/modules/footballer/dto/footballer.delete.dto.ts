import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class FootballerDeleteDto {
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @ApiModelProperty({
    description: 'Player id',
    type: Number,
    example: 1,
    required: true,
  })
  id: number;
}
