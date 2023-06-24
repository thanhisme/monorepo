import { Param, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { ControllerAuthGuard } from './controller-auth.guard';
import { CreatePollDto, JoinPollDto } from './dtos';
import { PollsService } from './polls.service';
import { RequestWithAuth } from './types';
import { ApiTags } from '@nestjs/swagger';

@UsePipes(new ValidationPipe())
@Controller('polls')
@ApiTags('polls')
export class PollsController {
  constructor(private pollsService: PollsService) {}

  @Get(':id')
  async getPolls(@Param('id') id: string) {
    const result = await this.pollsService.getPoll(id);

    return result;
  }

  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    const result = await this.pollsService.createPoll(createPollDto);

    return result;
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollsService.joinPoll(joinPollDto);

    return result;
  }

  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { userID, pollID, name } = request;
    const result = await this.pollsService.rejoinPoll({
      name,
      pollID,
      userID,
    });

    return result;
  }
}
