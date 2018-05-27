import {injectable, inject} from 'inversify';
import {Address} from '../wrapper/Address';
import {AddressRepository} from '../repository/AddressRepository';
import TYPES from '../types';
import {AddressDTO} from '../model/AddressSchema';
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
        const addressesDb: Array<Address> = await this.addressRepositoryDb.findAll().then((a2) => a2.map((dto: AddressDTO) => {
            return this.toAddressDTO(dto);
        }));

        return _.uniqBy(addressesDb, 'id');
    }

    public async createAddress(address: Address): Promise<Address> {
        const addressDTO: AddressDTO = this.toAddress(address);

        const createdDTO: AddressDTO = await this.addressRepositoryDb.create(addressDTO);

        return await this.toAddressDTO(createdDTO);
    }

    public async updateAddress(address: Address): Promise<Address> {
        const addressDTO: AddressDTO = this.toAddress(address);

        const updatedDTO: AddressDTO = await this.addressRepositoryDb.update(addressDTO);

        return await this.toAddressDTO(updatedDTO);
    }

    public async getAddress(id: string): Promise<Address> {
        const address = await this.addressRepositoryDb.find(id).then((a) => {
            return this.toAddressDTO(a);
        });

        return address;
    }

    private toAddress(address: Address): AddressDTO {
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

    private toAddressDTO(addressDTO: AddressDTO): Address {
        return new Address(
            addressDTO.address1,
            addressDTO.address2,
            addressDTO.city,
            addressDTO.state,
            addressDTO.zip,
            addressDTO.country,
            addressDTO._id);
    }
}
