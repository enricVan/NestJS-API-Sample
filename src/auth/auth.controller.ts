import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local')) // Lỗi khi em sử dụng Guard (mở comment dòng này)
  async login(@Request() req: Request, @Body() authPayload: AuthPayloadDto) {
    const user = await this.authService.validateUser(authPayload);
    console.log(user);
    if (!user) throw new UnauthorizedException('Invalid credentials.');
    return user;
  }
}
