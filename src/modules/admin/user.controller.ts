import { User } from './../../models/user.entity';
import { UserService } from './../../services/user.service';
import { Response, Request } from 'express';
// import { Student } from './../../models/student.entity';
// import { FacultyService } from './../../services/faculty.service';
// import { StudentService } from './../../services/student.service';
import { Controller, Get, Render, Post, Body, Res, UseGuards } from "@nestjs/common";
import * as bcrypt from 'bcrypt'; 
import { AuthGuard } from '@nestjs/passport';


@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Render("users/index")
    async index() {
        const userList = await this.userService.getAll();
        return {
            userList: userList
        }
        // var studentList = await this.studentService.getAll();
        // console.log(studentList);
        // var facultyList = await this.facultyService.getAll();
        // return {
        //     studentList: studentList,
        //     facultyList: facultyList
        // }
    }

    @Post("add")
    @UseGuards(AuthGuard('jwt'))
    async add(@Body() user: User, @Res() res: Response) {
        // Hash: U -> K
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(user.password, salt);
        await this.userService.add(user);
        return res.redirect("/users");        
    }

    
}