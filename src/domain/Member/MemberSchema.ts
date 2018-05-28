import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn} from 'typeorm';
import { HIDE } from '../../util/DecoratorHelper';
import { MetabolicEventSchema } from '../MetabolicEvent/MetabolicEventSchema';

export interface MemberDto {
    member_id: number;
    first_name: string;
    last_name: string;
    email: string;
    metric: boolean;
    gender: number;
    weight: number;
    height: number;
    target_weight_change: number;
    birth_date: Date;
    activity_level: string;
    created_timestamp: Date;
    updated_timestamp: Date;

    metabolicEvents: MetabolicEventSchema[];
}

/**
 * TypeORM Schema Config
 */
@Entity('member')
export class MemberSchema implements MemberDto {
    @PrimaryGeneratedColumn()
    public member_id: number;
    @Column()
    public first_name: string;
    @Column()
    public last_name: string;
    @Column()
    public email: string;
    @Column()
    public metric: boolean;
    @Column()
    public gender: number;
    @Column()
    public weight: number;
    @Column()
    public height: number;
    @Column()
    public target_weight_change: number;
    @Column()
    public birth_date: Date;
    @Column()
    public activity_level: string;
    @CreateDateColumn(HIDE)
    public created_timestamp: Date;
    @UpdateDateColumn(HIDE)
    public updated_timestamp: Date;

    @OneToMany(type => MetabolicEventSchema, metabolicEvent => metabolicEvent.member)
    @JoinColumn({name: 'member_id'})
    public metabolicEvents: MetabolicEventSchema[];
}
