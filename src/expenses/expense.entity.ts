import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', {precision: 10, scale: 2})
    amount: number;

    @Column()
    description: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;
}
