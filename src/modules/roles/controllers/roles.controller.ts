import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { RoleDto } from '../dtos/roles.dto';
import { Role } from '../entities/role.entity';

@Controller('roles')
export class RolesController {
    constructor(
      private readonly roleService: RoleService,
        
    ){}

    @Post('create')
    async createRoleUser(@Body()role:RoleDto){
        await this.roleService.createRole(role);
    }
    @Get('get')
    async getRole(@Body()role:RoleDto){
      
    }
    @Patch('update')
    async updateRole(@Body()role:RoleDto){

    }
    @Delete('delete')
    async deleteRole(@Body()role:RoleDto){
      
    }

    
  //   @Post('create-roles')
  // async createRole(@Body() roleDto: RoleDto): Promise<Role> {
  //   try {
  //     const createdRole = await this.roleService.createRole(roleDto);
  //     return createdRole;
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     } else {
  //       throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }
  // }

    
    
}
