import { Type } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Product, ProductSchema } from 'src/products/product.model';
export const OwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    DOB : { type: String, required: true },
    numberof_prizes:{ type: Number, required: true },
    product: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Product' ,reqired : true}]
    
});




export class Owner extends mongoose.Document {
    
     name: string;
     
     surname: string;
     
     DOB: string;
     
     numberof_prizes: number;
     @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
     
     product: Product[];
     
     
}
