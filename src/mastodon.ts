import * as Mastodon from 'tsl-mastodon-api';
import * as dotenv from 'dotenv';
import { PetPoster } from './petposter';
dotenv.config();



const Mastodon_api_token =  process.env.Mastodon_api_token as string; 
const Mastodon_api_url = process.env.Mastodon_api_url as string;
const petposter = new PetPoster;

export class HourlyPoster {
    Login() {
        const client = new Mastodon.API({
            access_token: Mastodon_api_token,
            api_url: Mastodon_api_url,
        })
        return client;
    }
    async Post(post_content: string){
        const client = this.Login();
        const result = await client.postStatus({status: post_content})


    }
}