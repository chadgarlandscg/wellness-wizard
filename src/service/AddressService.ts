import {injectable, inject} from 'inversify';
import {Address} from '../model/Address';
import {AddressRepository} from '../repository/AddressRepository';
import TYPES from '../types';
import {AddressDto} from '../model/AddressSchema';
import * as _ from 'lodash';

export interface AddressService {
    getAddresses(): Promise<Array<Address>>;
    createAddress(address: Address): Promise<Address>;
    updateAddress(address: Address): Promise<Address>;
    getAddress(id: string): Promise<Address>;
}

@injectable()
export class AddressServiceImpl implements AddressService {
    @inject(TYPES.AddressRepository)
    private addressRepositoryDb: AddressRepository;

    public async getAddresses(): Promise<Array<Address>> {
        // grab addresses from db
        const addressesDb: Array<Address> = await this.addressRepositoryDb.findAll().then((a2) => a2.map((dto: AddressDto) => {
            return this.toAddressDto(dto);
        }));

        return _.uniqBy(addressesDb, 'id');
    }

    public async createAddress(address: Address): Promise<Address> {
        const addressDto: AddressDto = this.toAddress(address);

        const createdDto: AddressDto = await this.addressRepositoryDb.create(addressDto);

        return await this.toAddressDto(createdDto);
    }

    public async updateAddress(address: Address): Promise<Address> {
        const addressDto: AddressDto = this.toAddress(address);

        const updatedDto: AddressDto = await this.addressRepositoryDb.update(addressDto);

        return await this.toAddressDto(updatedDto);
    }

    public async getAddress(id: string): Promise<Address> {
        const address = await this.addressRepositoryDb.find(id).then((a) => {
            return this.toAddressDto(a);
        });

        return address;
    }

    private toAddress(address: Address): AddressDto {
        return {
            address1: address.getAddress1,
            address2: address.getAddress2,
            city: address.getCity,
            state: address.getState,
            zip: address.getZip,
            country: address.getCountry,
            _id: address.getId
        };
    }

    private toAddressDto(addressDto: AddressDto): Address {
        return new Address(
            addressDto.address1,
            addressDto.address2,
            addressDto.city,
            addressDto.state,
            addressDto.zip,
            addressDto.country,
            addressDto._id);
    }
}
