
// role.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from '../dtos/roles.dto';


@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}
  async createRole(role:RoleDto):Promise<Role>{
    return this.roleRepository.save(role);
  }

  // async createRole(role:RoleDto): Promise<Role> {
  //   const { name } = role;
  //   const existingRole = await this.roleRepository.findOne({ where: { name } });
  //   if (existingRole) {
  //     throw new ConflictException('Role with this name already exists');
  //   }
    
  //   const newRole = this.roleRepository.create(role);
  //   // return this.roleRepository.save(role);
  //   return this.roleRepository.save(newRole);
  // }

  async findRoles (){
    return this.roleRepository.find();
  }


  async updateRole(role:RoleDto){
    return this.roleRepository.save(role);

  }

  //find role to get valid role 
  async findNameRole(id:number){
     return await this.roleRepository.findOne({
      where:{id:id},
      select:{name:true}

    })
  }



  async findRole(id:number){
    await this.roleRepository.findOne({
      where: {id:id},
      select:{name:true}
      
    })
  }
  // async validateRole(id:number){
  //   await this.findRole(id);
  //   try{
  //     const u
      

  //   }catch(e){

  //   }
    
  // }

  // async findAll(): Promise<Role[]> {
  //   return this.roleRepository.find();
  // }

  // Add more role-related operations here

 
}
