import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helpers/bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateAccount(email: string, password: string) {
    return this.login({ identifier: email, password });
  }

  async login(auth: AuthDto) {
    const account = await this.userService.findOneByEmail(auth.identifier);

    if (account && account.deletedAt) {
      throw new ForbiddenException('Account is deleted. Contact admin');
    }

    const passwordResult = comparePassword(auth.password, account.password);
    if (account && !passwordResult) {
      throw new UnauthorizedException('Invalid credentials. Please try again');
    }

    const payload = { sub: account.id, username: account.email };
    const access_token = this.jwtService.sign(payload);
    return {
      ...this.userService.returnBasicUser(account),
      access_token,
    };
  }
}
