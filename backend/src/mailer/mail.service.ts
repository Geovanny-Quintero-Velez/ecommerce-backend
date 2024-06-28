// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderPaymentConfirmation(username: string, email: string, orderid: string, price: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Order Payment Confirmation',
      template: './order-payment-confirmation',
      context: {
        username,
        orderid,
        price,
      },
    });
  }

  async sendUserConfirmation(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to MyApp! Confirm your Email',
      template: './confirmation', // The name of the template file
      context: {  // Data to be sent to template engine
        token,
      },
    });
  }

  async sendResetPassword(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      template: './reset-password',
      context: {
        token,
      },
    });
  }
}
