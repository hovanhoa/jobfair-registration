import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
// import { LocalStrategy } from './local.strategy';
// import { UserService } from './../../services/user.service';
// import { User } from './../../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'src/services/user.service';
import { LocalStrategy } from './local.strategy';
import { User } from 'src/models/user.entity';
@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 5,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
