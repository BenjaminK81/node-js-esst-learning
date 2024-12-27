import http, { request } from 'node:http'; // http von NodeJS zur Erstellung eines Servers
import querystring from 'node:querystring'; // querystring zum Verarbeiten des POST-Querystrings
import fs from 'node:fs'; // Filesystem-Package
import pug from 'pug';

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

        // Compile the source code
        let pizzaList = {};
        pizzaArr.forEach(pizza => {
            pizzaList += `${pizza.name}, ${pizza.price} EUR`;
        }); 

        const compiledFunction = pug.compileFile('./myHome.pug'); // Dies ist ein Funktionsaufruf
        response.write( compiledFunction({
            pizzen: pizzaArr
        }) );

        response.end(); // Beendet die Antwort und liefert aus

    } else {
        response.statusCode = 404;
        response.write('Nö, gibts nicht!');
        response.end();
    }

});

server.listen(3500); // Server hört auf den Port 3500
