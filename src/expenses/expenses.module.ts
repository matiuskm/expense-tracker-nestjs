import { Module } from "@nestjs/common";
import { ExpensesController } from "./expenses.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { ExpensesService } from "./expenses.service";

@Module({
    imports: [TypeOrmModule.forFeature([Expense])],
    controllers: [ExpensesController],
    providers: [ExpensesService]
})

export class ExpenseModule {}
