import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

type User = {
  id: string
  email: string
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Такого email нет в базе auth.service.ts');
    }

    const passwordIsMatch = await argon2.verify(user.password, password);

    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Не правильно введён пароль auth.service.ts');
  }

  async login(user: User) {
    const { id, email } = user;
    return {
      id: id,
      email: email,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email
      }),
    };
  }

}
