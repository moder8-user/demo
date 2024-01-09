import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const account = await this.authService.validateAccount(email, password);

    if (!account) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return account;
  }
}
