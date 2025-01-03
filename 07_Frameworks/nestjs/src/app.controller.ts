import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/pizza')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return 'Was geht ab?';
  }

  @Get('/bestellungen')
  getBestellungen(): string {
    return 'Bestellübersicht';
  }

  @Get('/bestellung')
  getBestellung(): string {
    return 'Danke für die Bestellung:';
  }
}
