import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send-test')
  async sendTest(@Query('to') to: string) {
    await this.mailService.sendTestEmail(to);
    return { message: `Correo enviado a ${to}` };
  }
}