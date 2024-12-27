import http, { request } from 'node:http'; // http von NodeJS zur Erstellung eines Servers
import querystring from 'node:querystring'; // querystring zum Verarbeiten des POST-Querystrings
import fs from 'node:fs'; // Filesystem-Package

const pizzaArr = [
    {
        name: "Crazy Dog",
        price: "10.50",
    },
    {
        name: "Tropical",
        price: "9.20",
    }
];

const server = http.createServer((request, response) => { // Server erstellen und in Funktion den REQUEST und RESPONSE übergeben zur weiteren Verarbeitung

    response.setHeader('Content-Type', 'text/html; charset=utf-8'); // Antwort-Header Infos setzen

    if (request.url === '/bestellung') {

        // Bestelldaten verarbeiten
        let formData = '';

        request.on('data', (data)=>{ // empfängt Daten (asynchrones Event)
            formData += data; // alle formData werden gesammelt
        });

        request.on('end', ()=>{ // Verarbeitung der Daten nach Ende des Empfangs (asynchrones Event)
            
            const dataObj = querystring.decode(formData);
            console.log(dataObj);

            response.write('<h1>Bestellung erhalten</h1>'); // write schreibt eine Antwort direkt vom Server 

            response.write('Danke für deine Bestellung: <br>');
            response.write(`Pizza: ${dataObj.bestellung} <br>Lieferung an: ${dataObj.adresse}`);

            response.end(); // End muss hier gesetzt werden, damit alle asynchrone Events abgeschlossen sind
        });


    } else if(request.url === '/') {

        // Ausgabe einer HTML-Seite mit FS (Filesystem)
        const datei = fs.readFileSync('./myHome.html').toString(); 
        //response.write(datei); // Ausgabe ohne Pizza-Auflistung

        // Ausgabe mit Pizza-Auflistung
        let pizzaList = "";
        pizzaArr.forEach(pizza => {
            pizzaList += `${pizza.name}, ${pizza.price} EUR <br>`;
        }); 

        response.write(datei.replace('<ul class="pizzaList"></ul>', `<p>${pizzaList}</p>`));

        // Zeile für Zeile ausgeben, ohne Filesystem
        /* response.write('<h1>Wilkkomen bei Pizza Fuck </h1> <br>');

        response.write('Aktuelle Angebote: <br>-----------<br>');

        pizzaArr.forEach(pizza => {
            response.write(`${pizza.name}, ${pizza.price} EUR <br>`);
        });

        response.write(`
            <form action="/bestellung" method="post" style="display: flex; flex-direction: column;  border: 1px solid; padding:20px; margin-top:20px;">
                <input style="width:300px; margin-bottom: 20px;" type="text" placeholder="Bestellung..." name="bestellung" required />
                <input style="width:300px; margin-bottom: 20px;" type="text" placeholder="Adresse..." name="adresse" required />
                <button style="width:300px; margin-bottom: 20px;" type="submit">Absenden</button>
                <button style="width:300px;" type="reset">Reset</button>
            </form>
        `); */

        response.end(); // Beendet die Antwort und liefert aus

    } else {
        response.statusCode = 404;
        response.write('Nö, gibts nicht!');
        response.end();
    }

});

server.listen(3500); // Server hört auf den Port 3500
