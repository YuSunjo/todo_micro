import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly clientAuthService;
    private readonly clientBoardService;
    constructor(appService: AppService, clientAuthService: ClientProxy, clientBoardService: ClientProxy);
    getHello(): string;
    login(): import("rxjs").Observable<any>;
    getBoard(id: number): import("rxjs").Observable<any>;
}
