// import { registrationService } from 'src/services/registration.service';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from 'src/models/registration.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class registrationService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
  ) {}

  async getAll(): Promise<Registration[]> {
    return await this.registrationRepository.find({
      relations: ['stall', 'enterprise'],
    });
  }

  async getMany(idNumber: string): Promise<Registration[]> {
    return await this.registrationRepository.find({
      relations: ['stall', 'enterprise'],
      where: {
        stall: {id: idNumber},
      }
    });
  }

  async untickAnother(tickNumber: number, idNumber: string): Promise<void> {
    await this.registrationRepository.update(idNumber, {tick: tickNumber});
  }



  async getLastRegistration(email: string): Promise<Registration[]> {
    return await this.registrationRepository.find({
      take: 1,
      relations: ['enterprise'],
      where: {
        enterprise: { email: email },
      },
      order: {
        updatedAt: "ASC",
      },
      
    });
  }

  async getByEmail(email: string): Promise<Registration[]> {
    return await this.registrationRepository.find({
      where: {
        enterprise: { email: email },
      },
      order: {
        priorityNumber: 'ASC',
      },
      relations: ['enterprise', 'stall'],
    });
  }

  async deleteByEmail(email: string): Promise<void> {
    // console.log(email);
    // await getConnection()
    //     .createQueryBuilder()
    //     .delete()
    //     .from('registration')
    //     .where(`enterpriseEmail = "${email}"`)
    //     .execute();
    await this.registrationRepository.delete({
      enterprise: { email: email },
    });
  }

  async deleteByStallId(id: string): Promise<void> {
    await this.registrationRepository.delete({
      stall: { id: id },
    });
  }

  // async approveByEmail(email: string): Promise<void> {
  //   await this.registrationRepository.update(

  //   )
  // }

  async getOne(id: string): Promise<Registration> {
    return await this.registrationRepository.findOne(id);
  }

  async add(Registration: Registration): Promise<void> {
    await this.registrationRepository.insert(Registration);
  }

  async edit(Registration: Registration): Promise<void> {
    await this.registrationRepository.update(
      Registration.registration_id,
      Registration,
    );
  }

  async delete(Registration: Registration): Promise<void> {
    await this.registrationRepository.delete(Registration.registration_id);
  }
}
