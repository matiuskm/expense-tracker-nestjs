import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseNotFundException } from 'src/common/expense-not-found.exception';

@Injectable()
export class ExpensesService {
  private readonly logger = new Logger(ExpensesService.name);

  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
  ) {}

  findAll(): Promise<Expense[]> {
    return this.expensesRepository.find();
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.expensesRepository.findOneBy({ id });
    if (!expense) {
      this.logger.log(`Expense with id ${id} not found`);
      throw new ExpenseNotFundException(id);
    }
    return expense;
  }

  async create(expense: CreateExpenseDto): Promise<Expense> {
    this.logger.log(`Creating new expense: ${JSON.stringify(expense)}`);
    const newExpense = this.expensesRepository.create(expense);
    return await this.expensesRepository.save(newExpense);
  }

  async update(id: number, expense: UpdateExpenseDto): Promise<Expense> {
    this.logger.log(
      `Updating expense with id ${id}: ${JSON.stringify(expense)}`,
    );
    await this.expensesRepository.update(id, expense);
    return this.expensesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.expensesRepository.delete(id);
  }
}
