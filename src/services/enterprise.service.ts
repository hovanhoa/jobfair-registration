import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Enterprise } from "src/models/enterprise.entity";
import { Repository } from "typeorm"
import { getConnection } from 'typeorm';

@Injectable()
export class enterpriseService {
    constructor(
        @InjectRepository(Enterprise) private enterpriseRepository: Repository<Enterprise> 
    ){}

    async getAll(): Promise<Enterprise[]> {
        return await this.enterpriseRepository.find();
    }

    async getOne(email: string): Promise<Enterprise> {
        return await this.enterpriseRepository.findOne(email);
    }

    async add(Enterprise: Enterprise): Promise<void> {
        await this.enterpriseRepository.insert(Enterprise);
    }

    async edit(Enterprise: Enterprise): Promise<void> {
        await this.enterpriseRepository.update(Enterprise.email, Enterprise);
    }
}