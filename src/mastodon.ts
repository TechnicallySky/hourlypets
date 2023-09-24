import * as dotenv from 'dotenv';
import { PetPoster } from './petposter.js';
import { createRestAPIClient } from "masto";
import axios, { AxiosResponse } from 'axios';
dotenv.config();



const petposter = new PetPoster;

export class MastodonPoster {
    readonly client: ReturnType<typeof createRestAPIClient>;
    constructor(){
        this.client = createRestAPIClient({url: process.env.MASTODON_API_URL as string, accessToken: process.env.MASTODON_API_KEY as string})}
    async MediaUpload(photos : AxiosResponse["data"][]) {
        try {
            const full_photo_urls : string[] = photos.map((item) => item.full);
            const media_ids : string[] = [];
            let i = 0;
            for (const photo of full_photo_urls){
                media_ids.push(await this.client.v1.media.create({file: await fetch(photo).then(res => res.blob())}).then(res => res.id))
            }
            return media_ids;
    }
        catch(error) {
            console.error(error);
        }
    }
    async Post(animal : AxiosResponse["data"]) {
        console.log(await petposter.organizationlookup(animal.organization_id).then(res => res.name))
        try {
            this.client.v1.statuses.create({
                status: animal.name + animal.description && `\n\n${animal.description}` + "\n\n" + animal.name + " is at " + await petposter.organizationlookup(animal.organization_id).then(res => res.name) 
                + " in " + animal.contact.address.city + " " + animal.contact.address.state + "\n\n" + animal.url,
                visibility:"public",
                mediaIds: await this.MediaUpload(animal.photos)
            })

        }
        catch (error) {
            console.error(error)
        }
    }
}   