import { ApiProperty } from '@nestjs/swagger';
import { Length, IsInt, IsString, Min, Max } from 'class-validator';

export class CreatePollDto {
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    title: 'The topic that you want to vote',
    example: 'What is your favorite color?',
  })
  topic: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    title: 'The number of votes per voter (must be from 1 to 5)',
    example: 3,
  })
  votesPerVoter: number;

  @IsString()
  @Length(1, 25)
  @ApiProperty({
    title: 'The number of votes per voter (max length: 25)',
    example: 'John',
  })
  name: string;
}

export class JoinPollDto {
  @IsString()
  @Length(6, 6)
  @ApiProperty({
    title: 'The room id that you want to join',
    example: 'ABCDEF',
  })
  pollID: string;

  @IsString()
  @Length(1, 25)
  @ApiProperty({
    title: 'The number of votes per voter (max length: 25)',
    example: 'John',
  })
  name: string;
}

export class NominationDto {
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    title: 'The idea related to the topic you want other participants to vote',
    example: 'Red',
  })
  text: string;
}
