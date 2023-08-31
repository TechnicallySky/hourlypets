import { PetPoster } from './petposter';
import { HourlyPoster } from './mastodon'


async function main() {
    const petposter = new PetPoster;
    const animal = await petposter.petlookup();
    console.log(animal.name, animal.id, animal.contact.address.city, animal.contact.address.state);
}

main();