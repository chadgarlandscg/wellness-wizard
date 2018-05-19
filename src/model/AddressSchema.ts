import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export interface AddressDto {
    _id?: number;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

/**
 * TypeORM Schema Config
 */
@Entity('address')
export class AddressDbSchema implements AddressDto {
    @PrimaryGeneratedColumn()
    // tslint:disable-next-line:variable-name
    public _id?: number;
    @Column()
    public address1: string;
    @Column()
    public address2?: string;
    @Column()
    public city: string;
    @Column()
    public state: string;
    @Column()
    public zip: string;
    @Column()
    public country: string;
}
