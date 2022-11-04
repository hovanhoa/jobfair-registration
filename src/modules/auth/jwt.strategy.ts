import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

const cookieExtractor: JwtFromRequestFunction = function (req: Request) {
  let token = null;
  if (req && req.cookies) token = req.cookies['JF'];
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(user) {
    return user;
  }
}
