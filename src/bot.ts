import { PetPoster } from './petposter.js';
import { HourlyPoster } from './mastodon.js'


async function main() {
    const petposter = new PetPoster;
    const animal = await petposter.petlookup();
    console.log(animal.name, animal.id, animal.contact.address.city, animal.contact.address.state);
    const hourlyposter = new HourlyPoster;
    await hourlyposter.Post(animal.name);
}

main();