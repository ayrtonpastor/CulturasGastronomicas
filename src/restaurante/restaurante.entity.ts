import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { EstrellasMichelinEntity } from '../estrellas_michelin/estrellas_michelin.entity';
import { CulturaGastronomicaEntity } from '../cultura_gastronomica/cultura_gastronomica.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class RestauranteEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nombre: string;

  @ManyToOne(() => CiudadEntity, (ciudad) => ciudad.restaurantes)
  ciudad: CiudadEntity;

  @Field(() => [EstrellasMichelinEntity])
  @OneToMany(
    () => EstrellasMichelinEntity,
    (estrellaMichellin) => estrellaMichellin.restaurante,
  )
  estrellasMichelin: EstrellasMichelinEntity[];

  @ManyToMany(
    () => CulturaGastronomicaEntity,
    (culturaGastronomica) => culturaGastronomica.restaurantes,
  )
  @JoinTable()
  culturasGastronomicas: CulturaGastronomicaEntity[];
}
