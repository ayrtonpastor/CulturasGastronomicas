import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { CulturaGastronomicaModule } from './cultura_gastronomica/cultura_gastronomica.module';
import { RecetaModule } from './receta/receta.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './categoria/categoria.entity';
import { ProductoEntity } from './producto/producto.entity';
import { CulturaGastronomicaEntity } from './cultura_gastronomica/cultura_gastronomica.entity';
import { RecetaEntity } from './receta/receta.entity';

@Module({
  imports: [
    CategoriaModule, ProductoModule, CulturaGastronomicaModule, RecetaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'cultura_gastronomica',
      entities: [CategoriaEntity, ProductoEntity, CulturaGastronomicaEntity, RecetaEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
