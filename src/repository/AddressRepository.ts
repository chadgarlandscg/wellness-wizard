import {injectable} from 'inversify';
import {AddressDto, AddressDbSchema} from '../model/AddressSchema';
import {logger} from '../util/Logger';
import {createConnection, Connection, Repository, ConnectionOptions} from 'typeorm';

export interface AddressRepository {
    findAll(): Promise<Array<AddressDto>>;
    create(addressDto: AddressDto): Promise<AddressDto>;
    update(addressDto: AddressDto): Promise<AddressDto>;
    find(id: string): Promise<AddressDto>;
}

@injectable()
export class AddressRepositoryImplDb implements AddressRepository {
    private addressRepository: Repository<AddressDbSchema>;

    constructor() {
        this.connect().then(async connection => {
            this.addressRepository = connection.getRepository(AddressDbSchema);
        }).catch(err => logger.error('Cannot connect to database', err));
    }

    public async findAll(): Promise<Array<AddressDto>> {
        return await this.addressRepository.find();
    }

    public async create(addressDto: AddressDto): Promise<AddressDto> {
        return await this.addressRepository.save(addressDto);
    }

    public async update(addressDto: AddressDto): Promise<AddressDto> {
        return await this.addressRepository.save(addressDto);
    }

    public async find(id: string): Promise<AddressDto> {
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
