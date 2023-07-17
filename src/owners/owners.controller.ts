import { Controller ,Post,Body, Get,Param,Delete, Put} from '@nestjs/common';
import { OwnersService } from './owners.service';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownerService: OwnersService) {}

    @Post()
        async addOwner(
            @Body('name')ownerName : string,
            @Body('surname')ownerSurname :string,
            @Body('DOB')ownerDOB :string,
            @Body('numberof_prizes')ownerNumberof_prizes :number,
            @Body('product')ownerProduct :any,
            ){
            const genereatedId =  await this.ownerService.insertOwner(
                ownerName,
                ownerSurname,
                ownerDOB,
                ownerNumberof_prizes,
                ownerProduct,
                );
            return{ id : genereatedId }
            }
    @Get()
    async getAllOwners(){
        const owners = await this.ownerService.getOwners();
        return owners.map((owner)=>({
            id : owner.id,
            name : owner.name,
            surname : owner.surname,
            DOB : owner.DOB,
            numberof_prizes : owner.numberof_prizes,
            product : owner.product,
            
        }));
    }
}   
