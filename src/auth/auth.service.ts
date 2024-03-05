import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) return null;
    if (findUser.hashedPassword === password) {
      const { hashedPassword, ...user } = findUser;
      return this.jwtService.sign(user);
    } else return null;
  }
}
