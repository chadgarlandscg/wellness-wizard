import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { HIDE, CASCADE } from '../../util/DecoratorHelper';
import { MemberSchema, MemberDto } from '../Member/MemberSchema';
import { UsdaSelectionEventSchema, UsdaSelectionEventDto } from '../UsdaSelectionEvent/UsdaSelectionEventSchema';

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
    usdaSelectionEvents?: UsdaSelectionEventDto[];
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
    @OneToMany(type => UsdaSelectionEventSchema, usdaSelectionEvent => usdaSelectionEvent.metabolicEvent, CASCADE)
    @JoinColumn({name: 'member_metabolic_event_id'})
    public usdaSelectionEvents: UsdaSelectionEventSchema[];
}
