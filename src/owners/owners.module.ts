import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import {  OwnerSchema } from './owner.model';
import { ProductSchema } from 'src/products/product.model';

@Module({
    imports:[MongooseModule.forFeature([{ name:'Owner' ,schema:OwnerSchema }])], //This will import the OwnerSchema from Owner.model.ts
    controllers:[OwnersController],
    providers:[OwnersService],
})
export class OwnersModule{}