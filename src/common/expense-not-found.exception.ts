import { NotFoundException } from '@nestjs/common';

export class ExpenseNotFundException extends NotFoundException {
  constructor(id: number) {
    super(`Expense with id ${id} not found.`);
  }
}
