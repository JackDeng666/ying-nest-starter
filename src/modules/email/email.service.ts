import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter
  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',			// QQ邮箱的SMTP地址
      port: 465,				// 每个邮箱的端口号可能是一样的，一般都使用465，但有些公司使用的就不是465
      auth: {
        user: this.configService.get('EMAIL_USER'), 		// 你自己的邮箱
        pass: this.configService.get('EMAIL_AUTH_CODE')         // qq邮箱的授权码
      }
    })
  }

  async sendEmail(): Promise<string> {
    await this.transporter.sendMail({
      from: 'jackdeng155@qq.com', // sender address
      to: "757738398@qq.com", // list of receivers
      subject: `邮箱验证码`, // Subject line
      html: `
        <img width="150px" src="http://mihoyoimage.oss-cn-hangzhou.aliyuncs.com/logo/mihoyo_logo.png">
        <h1>您好：</h1>
        <p style="font-size: 18px;color:#000;">
          您的验证码为：
          <span style="font-size: 16px;color:#f00;"> 123456 </span>
          您当前正在网站注册账号。
        </p>
        <p style="font-size: 1.5rem;color:#999;">3分钟内有效</p>
      `,
    });
    return 'send email!';
  }
}
