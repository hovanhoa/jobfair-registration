import { Repository } from 'typeorm';
import { Stall } from './../models/Stall.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
// import { getConnection } from "typeorm";

@Injectable()
export class StallService {
    constructor(
        @InjectRepository(Stall) private StallRepository: Repository<Stall>
    ){}

    async getAll(): Promise<Stall[]> {
        return await this.StallRepository.find({
          order: {
            name: "ASC",
          },
        });
      }

      async getWithNoRegistered(): Promise<Stall[]> {
        return await this.StallRepository.find({
          where: {
            Registered: 0,
          },
          order: {
            name: "ASC",
          },
        });
      }
    
      async getOne(id: string): Promise<Stall> {
        return await this.StallRepository.findOne(id);
      }

      async deleteOne(id: string): Promise<void> {
        await this.StallRepository.delete(id);
      }
    
      async add(Stall: Stall): Promise<void> {
        await this.StallRepository.insert(Stall);
      }
    
      async edit(Stall: Stall): Promise<void> {
        await this.StallRepository.update(Stall.id, Stall);
      }

      async register(registeredNumber: number, idNumber: string): Promise<void> {
        await this.StallRepository.update(idNumber, {Registered: registeredNumber});
      }
    
      async delete(Stall: Stall): Promise<void> {
        await this.StallRepository.delete(Stall.id);
      }
}