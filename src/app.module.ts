import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [ProductsModule, OwnersModule ,MongooseModule.forRoot('mongodb://localhost:27017/nest-mongodb-project'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
