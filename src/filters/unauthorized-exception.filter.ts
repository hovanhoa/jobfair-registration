import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const message = exception.message;

        if(!message) response.redirect(`/login`);
        else response.redirect(`/login?message=${message}`);
    }
}