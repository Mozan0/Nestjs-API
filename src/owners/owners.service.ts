import { Injectable, NotFoundException } from "@nestjs/common";
import { Owner } from "./owner.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from "mongoose";
export class OwnersService {
    
    constructor (@InjectModel("Owner") private readonly ownerModel: Model <Owner>) { } 
    
    async insertOwner(name: string, surname: string, DOB: string, numberof_prizes: number, product: any, ) {
        console.log(product);
        const newOwner = new this.ownerModel({ name , surname , DOB, numberof_prizes, product});
        const result = await newOwner.save();
        console.log(result);
        return result.id as string ;
    } 
    async getOwners() {
        // this.productModel.find({title:'A Book',price:{$gt:10}}); //This will return all the products with the title 'A Book' in the database
        const owners = await this.ownerModel.find().populate("product"); //This will return all the products in the database
        
        return owners as Owner[]; //Take all the elements in the array and add them to a new array and return it    
    }   
}