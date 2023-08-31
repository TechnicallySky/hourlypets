import * as dotenv from 'dotenv';
import { Client } from "@petfinder/petfinder-js";
dotenv.config();


const petfinder_api_key = process.env.PETFINDER_API_KEY as string;
const petfinder_api_secret = process.env.PETFINDER_API_SECRET as string;
const animal_type = process.env.ANIMAL_TYPE;

//Simple class for grabbing a pet. 

export class PetPoster {
    async login() {
        const client = new Client({ apiKey: petfinder_api_key, secret: petfinder_api_secret});
        return client;
    }
    async petlookup() {
        const client = await this.login();
        const animals = await client.animal.search({type:animal_type, limit:1, sort:"random"})
        return animals.data.animals[0];
    }
}


//Test animal ID:65254473
//Pickles