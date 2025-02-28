import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { GenerateTeamsDto } from 'src/teams/dto/team.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async generateTeams(@Body() generateTeamsDto: GenerateTeamsDto) {
    return this.sessionsService.generateTeams(generateTeamsDto);
  }

  @Get(':id')
  async getSession(@Param('id') sessionId: string) {
    const sessionData = await this.sessionsService.getSession(sessionId);
    if (!sessionData) {
      throw new NotFoundException('Session not found');
    }
    return sessionData;
  }
}
