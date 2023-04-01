import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class BoardController {
  constructor(
    @Inject('TODO_BOARD_SERVICE')
    private readonly clientBoardService: ClientProxy,
  ) {}

  @Get('api/v1/board/:id')
  getBoard(@Param('id') id: number) {
    return this.clientBoardService.send({ cmd: 'getBoard' }, id);
  }
}
