import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
    
    constructor(@InjectModel("Product") private readonly productModel: Model <Product>) { } 
    async insertProduct(title: string, desc: string, price: number,) {
        
        const newProduct = new this.productModel({ title , description : desc , price});
        const result = await newProduct.save();//Before returning the id I need to save the product in the database so we will use await
        console.log(result);
        return result.id as string ;// I used async-await on products.service.ts so I need to return a promise here other wise I will get nothing as a result
    }
    
    async getProducts() {
        // this.productModel.find({title:'A Book',price:{$gt:10}}); //This will return all the products with the title 'A Book' in the database
        const products = await this.productModel.find().exec(); //This will return all the products in the database
        
        return products as Product[]; //Take all the elements in the array and add them to a new array and return it    
    }
    async getSingleProduct(productId: string) { //This method will return a single product 
        const product = await this.findProduct(productId); 
        return {
            id:product.id,
            title:product.title,
            description:product.description,
            price:product.price,
            
        };
    }
    async updateProduct(productId: string, title: string, desc: string, price: number,) {
        const updatedProduct = await this.findProduct(productId);
        
        
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        
        updatedProduct.save();
        
        
    }
    
    private async findProduct(id: string): Promise<Product> {
        let product;
        try{
            product = await this.productModel.findById(id).exec();//This will return the product with the id we passed
        }catch(error){
            throw new NotFoundException('Could not find product.');
        }
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }
    async deleteProduct(prodId: string) {
       const result = await this.productModel.deleteOne({_id:prodId}).exec();// I used _id because that is how it is stored in the database not id itself normally
       console.log(result);
    } 

}    