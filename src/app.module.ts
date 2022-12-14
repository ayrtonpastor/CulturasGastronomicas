import { CacheModule, Module } from '@nestjs/common';
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
import { RestauranteModule } from './restaurante/restaurante.module';
import { EstrellasMichelinModule } from './estrellas_michelin/estrellas_michelin.module';
import { RestauranteEntity } from './restaurante/restaurante.entity';
import { EstrellasMichelinEntity } from './estrellas_michelin/estrellas_michelin.entity';
import { CiudadEntity } from './ciudad/ciudad.entity';
import { PaisModule } from './pais/pais.module';
import { PaisCulturagastronomicaModule } from './pais-culturagastronomica/pais-culturagastronomica.module';
import { CategoriaProductoModule } from './categoria-producto/categoria-producto.module';
import { PaisEntity } from './pais/pais.entity';
import { CiudadModule } from './ciudad/ciudad.module';
import { RestauranteCulturagastronomicaModule } from './restaurante-culturagastronomica/restaurante-culturagastronomica.module';
import { RecetaCulturaGastronomicaModule } from './receta-cultura_gastronomica/receta-cultura_gastronomica.module';
import { RestauranteCiudadModule } from './restaurante-ciudad/restaurante-ciudad.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as sqliteStore from 'cache-manager-sqlite';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    CacheModule.register({
      store: sqliteStore,
      path: ':memory:',
      options: {
        ttl: 5,
      },
      isGlobal: true,
      
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),
    CategoriaModule,
    ProductoModule,
    CulturaGastronomicaModule,
    RecetaModule,
    RestauranteModule,
    EstrellasMichelinModule,
    PaisModule,
    CiudadModule,
    PaisCulturagastronomicaModule,
    RestauranteCulturagastronomicaModule,
    RestauranteCiudadModule,
    CategoriaProductoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'asdfgh',
      database: 'cultura_gastronomica',
      entities: [
        CategoriaEntity,
        ProductoEntity,
        CulturaGastronomicaEntity,
        RecetaEntity,
        RestauranteEntity,
        EstrellasMichelinEntity,
        CiudadEntity,
        PaisEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    RecetaCulturaGastronomicaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}