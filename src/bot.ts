import { PetPoster } from './petposter.js';
import { MastodonPoster } from './mastodon.js'


async function main() {
    const petposter = new PetPoster;
    const animal = await petposter.petlookup();
    const hourlyposter = new MastodonPoster;
    await hourlyposter.Post(animal);
}

main();

//This code is for testing