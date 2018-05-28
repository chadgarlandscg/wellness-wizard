import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import { HIDE } from '../../util/DecoratorHelper';
import { MemberSchema, MemberDto } from '../Member/MemberSchema';

export interface MetabolicEventDto {
    member_metabolic_event_id: number;
    member_id: number;
    description: string;
    scheduled_timestamp: Date;
    occurred_date: Date;
    occurred_time: Date;
    created_timestamp?: Date;
    updated_timestamp?: Date;

    member: MemberDto;
}

/**
 * TypeORM Schema Config
 */
@Entity('member_metabolic_event')
export class MetabolicEventSchema implements MetabolicEventDto {
    @PrimaryGeneratedColumn()
    public member_metabolic_event_id: number;
    @Column()
    public member_id: number;
    @Column()
    public description: string;
    @Column()
    public scheduled_timestamp: Date;
    @Column()
    public occurred_date: Date;
    @Column()
    public occurred_time: Date;
    @CreateDateColumn(HIDE)
    public created_timestamp: Date;
    @UpdateDateColumn(HIDE)
    public updated_timestamp: Date;

    @ManyToOne(type => MemberSchema, member => member.metabolicEvents)
    @JoinColumn({name: 'member_id'})
    public member: MemberSchema;

}
