import {injectable} from 'inversify';
import {AddressDTO, AddressDbSchema} from '../model/AddressSchema';
import {logger} from '../util/Logger';
import {createConnection, Connection, Repository, ConnectionOptions} from 'typeorm';

export interface AddressRepository {
    findAll(): Promise<Array<AddressDTO>>;
    create(addressDTO: AddressDTO): Promise<AddressDTO>;
    update(addressDTO: AddressDTO): Promise<AddressDTO>;
    find(id: string): Promise<AddressDTO>;
}

@injectable()
export class AddressRepositoryImplDb implements AddressRepository {
    private addressRepository: Repository<AddressDbSchema>;

    constructor() {
        this.connect().then(async connection => {
            this.addressRepository = connection.getRepository(AddressDbSchema);
        }).catch(err => logger.error('Cannot connect to database', err));
    }

    public async findAll(): Promise<Array<AddressDTO>> {
        return await this.addressRepository.find();
    }

    public async create(addressDTO: AddressDTO): Promise<AddressDTO> {
        return await this.addressRepository.save(addressDTO);
    }

    public async update(addressDTO: AddressDTO): Promise<AddressDTO> {
        return await this.addressRepository.save(addressDTO);
    }

    public async find(id: string): Promise<AddressDTO> {
        return await this.addressRepository.findOne(id);
    }

    private connect(): Promise<Connection> {
        return createConnection(<ConnectionOptions> {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'chadgarland',
            database: 'wellness_wizard',
            logging: true,
            synchronize: false,
            entities: [
                AddressDbSchema
            ]
        });
    }
}
