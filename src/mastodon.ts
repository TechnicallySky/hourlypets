import * as Mastodon from 'tsl-mastodon-api';
import * as dotenv from 'dotenv';
import { PetPoster } from './petposter.js';
dotenv.config();



const Mastodon_api_token =  process.env.MASTODON_API_KEY as string; 
const Mastodon_api_url = process.env.MASTODON_API_URL as string;
console.log(Mastodon_api_url);
const petposter = new PetPoster;

export class HourlyPoster {
    async Login() {
        const client = new Mastodon.API({
            access_token: Mastodon_api_token,
            api_url: Mastodon_api_url,
        })
        return client;
    }
    async Post(post_content: string){
        const client = await this.Login();
        try {
            const result = await client.postStatus({status: post_content})
        }
        catch (error) {
            console.error("Error posting to Mastodon: " + JSON.stringify(error));
        }
    }
}