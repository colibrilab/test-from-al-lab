import {IsDefined, IsNotEmpty, IsNumber, Min} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class FootballerDeleteDto {
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @IsDefined()
  @ApiModelProperty({
    description: 'Player id',
    type: Number,
    example: 1,
    required: true,
  })
  id: number;
}
