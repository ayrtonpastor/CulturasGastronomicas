import { Injectable } from '@nestjs/common';
import { CategoriaEntity } from './categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async findAll(): Promise<CategoriaEntity[]> {
    return await this.categoriaRepository.find({ relations: ['productos'] });
  }

  async findOne(id: string): Promise<CategoriaEntity> {
    const categoria: CategoriaEntity = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['productos'],
    });
    if (!categoria)
      throw new BusinessLogicException(
        'No se encontro la categoria con el id suministrado',
        BusinessError.NOT_FOUND,
      );

    return categoria;
  }

  async create(categoria: CategoriaEntity): Promise<CategoriaEntity> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(
    id: string,
    categoria: CategoriaEntity,
  ): Promise<CategoriaEntity> {
    const persistedcategoria: CategoriaEntity =
      await this.categoriaRepository.findOne({ where: { id } });
    if (!persistedcategoria)
      throw new BusinessLogicException(
        'No se encontro la categoria con el id suministrado',
        BusinessError.NOT_FOUND,
      );

    categoria.id = id;

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: string) {
    const categoria: CategoriaEntity = await this.categoriaRepository.findOne({
      where: { id },
    });
    if (!categoria)
      throw new BusinessLogicException(
        'No se encontro la categoria con el id suministrado',
        BusinessError.NOT_FOUND,
      );

    await this.categoriaRepository.remove(categoria);
  }
}
