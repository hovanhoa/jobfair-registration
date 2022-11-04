import { User } from './../models/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(email: string): Promise<User> {
    return await this.userRepository.findOne(email);
  }

  async add(user: User): Promise<void> {
    await this.userRepository.insert(user);
  }

  

//   async edit(faculty: Faculty): Promise<void> {
//     await this.facultyRespository.update(faculty.id, faculty);
//   }

//   async delete(faculty: Faculty): Promise<void> {
//     await this.facultyRespository.delete(faculty.id);
//   }
}
