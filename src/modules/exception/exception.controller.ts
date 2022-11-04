import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";

@Controller()
export class ExceptionController {
    @Get('/403')
    async page403(@Res() res: Response) {
        res.send("403 page");
    }
    @Get('/401')
    async page401(@Res()res: Response){
        res.send("401 page")
    }
}
