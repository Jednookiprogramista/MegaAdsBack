import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import { v4 as uuid} from 'uuid'

type AdRecordResults =[AdEntity[],FieldPacket[]];

export class AdRecord implements AdEntity{
    description: string;
    public id: string;
    public lat: number;
    public  lon: number;
    public name: string;
    public price: number;
    public url: string;
    constructor(obj: NewAdEntity) {
        if (obj.name || obj.name.length >100 ) {
            throw new ValidationError('The ad name cannot be empty or exceed 100 characters.');
        }
        if(obj.description.length > 1000) {
            throw new ValidationError('The content of the advertisement cannot exceed 1000 characters')
        }
        if(obj.price <0 || obj.price > 9999999){
            throw new ValidationError('The price cannot be less than 0 or greater than 9,999,999')

        }
        //@TODO check if url is valid!

        if (obj.url || obj.url.length >100 ) {
            throw new ValidationError('The ad link cannot be empty or exceed 100 characters');
        }
        if (typeof obj.lat !=='number' || typeof obj.lon !=='number') {
            throw new ValidationError('The ad could not be located');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lon = obj.lon;
        this.lat = obj.lat;
    }
    static async getOne(id: string): Promise<AdRecord | null > {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id=:id ",{
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null :  new AdRecord(results[0]);
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}`,
        }) as AdRecordResults;

        return results.map(result => {
            const {
                id,lat,lon
            } =result
            return {
                id,lat,lon
            }
        });
    }

    async insert() : Promise<void> {
        if (!this.id) {
            this.id = uuid()
        } else {
            throw new Error('Cannot insert something that is already inserted!');

        }
        await pool.execute("INSERT INTO `ads`(`id`,`name`,`description`,`price`,`url`,`lat`,`lon`)VALUES (:id,:name,:description,:price,:url,:lat,:lon)",this);

    }
}