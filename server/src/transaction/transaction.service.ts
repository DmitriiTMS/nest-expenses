import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id }
    }
    if (!newTransaction) throw new BadRequestException('Не удалось создать транзакцию transaction.service.ts create')
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id: id
        },
      },
      order: {
        createdAt: "DESC"
      },
    })
    return transactions
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id
      },
      relations: {
        user: true,
        category: true
      }
    })
    if (!transaction) throw new NotFoundException('Такой транзакции нет transaction.service.ts findOne')
    return transaction
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id
      }
    })
    if (!transaction) throw new NotFoundException('Такой транзакции нет transaction.service.ts update')
    return await this.transactionRepository.update(id, transaction)
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id
      }
    })
    if (!transaction) throw new NotFoundException('Такой транзакции нет transaction.service.ts remove')
    return await this.transactionRepository.delete(id);
  }

  async findAllPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id: id
        },
      },
      // relations: {
      //   category: true,
      //   user: true
      // },
      order: {
        createdAt: "DESC"
      },
      take: limit,
      skip: (page - 1) * limit
    })
    return transactions
  }

  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {id},
        type
      }
    })
    const total = transactions.reduce((acc, obj) => acc + obj.amount ,0)
    return total
  }
}
