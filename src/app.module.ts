import { ForbiddenException } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionModule } from './modules/exception/exception.module';
import { ForbiddenFilter } from './filters/forbidden.filter';

@Module({
  imports: [TypeOrmModule.forRoot() ,AdminModule, ConfigModule.forRoot(), AuthModule, ExceptionModule],
  controllers: [],
  providers: [
		{
			provide: APP_FILTER,
			useClass: ForbiddenFilter,
		},
        {
			provide: APP_FILTER,
			useClass: UnauthorizedExceptionFilter,
		},
		AppService,
	],


})
export class AppModule {}
