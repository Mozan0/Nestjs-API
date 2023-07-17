import { Controller ,Post,Body, Get,Param,Delete, Put} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products') 
export class ProductsController {
    
    constructor(private readonly productsService: ProductsService) {}

    @Post()
     async addProduct(// I used async because I need to use await in the insertProduct method
        @Body('title')prodTitle : string,
        @Body('description')prodDesc :string,
        @Body('price')prodPrice :number,
        //Owner line
        ){
        const genereatedId =  await this.productsService.insertProduct(// I used await because I need my id to be generated before I return it so I can display on my frontend 
            prodTitle,
            prodDesc,
            prodPrice,
            );//Owner line  
        return{ id : genereatedId }
    }
    @Get()
    async getAllProducts(){
        const products = await this.productsService.getProducts();
        return products.map((prod)=>({
            id : prod.id,
            title : prod.title,
            description : prod.description,
            price : prod.price,
            
        }));
    }
    @Get(':id')
    getProduct(@Param('id')prodId : string){
        return this.productsService.getSingleProduct(prodId);
    }
    @Put(':id')
    async updateProduct(
    @Param('id')prodId : string,
    @Body('title')prodTitle : string,
    @Body('description')prodDesc :string,
    @Body('price')prodPrice :number,
    
    ){
        await this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
        return null;
    }
    @Delete(':id')
    async removeProduct(@Param('id')prodId : string){
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}