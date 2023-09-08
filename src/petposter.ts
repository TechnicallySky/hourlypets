import * as dotenv from 'dotenv';
import { Client } from "@petfinder/petfinder-js";
import { Animal } from '@petfinder/petfinder-js/dist/api/animal';
dotenv.config();


const animal_type = process.env.ANIMAL_TYPE;

//Simple class for grabbing a pet. 

export class PetPoster {
    readonly client: Client;
    constructor(){
        this.client = new Client({apiKey:process.env.PETFINDER_API_KEY as string, secret: process.env.PETFINDER_API_SECRET as string})
    }
    async petlookup() {
        const animals = await this.client.animal.search({type:animal_type, limit:1, sort:"random"})
        return animals.data.animals[0];
    }
    async organizationlookup(orgid : string) {
        const org = await this.client.organization.show(orgid);
        return org.data.organization;
    }
}

