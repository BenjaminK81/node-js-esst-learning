
import { faker } from "@faker-js/faker";

// Ohne Auto-Input
export function calcDel() {

    const summe = process.argv[2]; // Prozess von NodeJS der ein Array von Argumenten entgegennimmt
    const summeAsNumber = summe * 1;

    if (summeAsNumber >= 35) {
        console.log("Keine Lieferkosten");
    } else {
        const kostenAbzglMindest = 35 - summeAsNumber;
        const lieferkosten = 0.2 * kostenAbzglMindest;
        console.log(`Deine Lieferkosten beträgt: ${lieferkosten} €`);
    }
}

// Mit Auto-Input
export function calcDelAutom() {

    process.stdin.on('data', data => { // Prozess von NodeJS der einen Standard-Input (stdin) aus der Konsole entgegennimmt

        const summe = data.toString();
        const summeAsNumber = summe * 1;

        if (Number.isNaN(summeAsNumber)) {
            console.log("Keine Zahl!");
        } else {
    
            if (summeAsNumber >= 35) {
                console.log("Keine Lieferkosten");
            } else {
                const kostenAbzglMindest = 35 - summeAsNumber;
                const lieferkosten = 0.2 * kostenAbzglMindest;
                console.log(`Deine Lieferkosten beträgt: ${lieferkosten} €`);
            }
        }
    })
}

// Faker Inputs mit Faker-JS, oben importiert
console.log(faker.person.firstName());


