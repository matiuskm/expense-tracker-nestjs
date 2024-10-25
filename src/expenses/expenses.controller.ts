import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @Roles('user', 'admin')
  async findAll(): Promise<{
    expenses: Expense[];
    totalRecords: number;
    totalAmount: number;
  }> {
    const expenses = await this.expensesService.findAll();
    const totalRecords = expenses.length;
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );

    return { expenses, totalRecords, totalAmount };
  }

  @Get(':id')
  @Roles('user', 'admin')
  findOne(@Param('id') id: string): Promise<Expense> {
    return this.expensesService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() expense: CreateExpenseDto): Promise<Expense> {
    return this.expensesService.create(expense);
  }

  @Put(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() expense: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expensesService.update(+id, expense);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
