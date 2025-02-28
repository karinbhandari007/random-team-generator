import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  findAll() {
    return `This action returns all teams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
