import http from 'node:http';
import querystring from 'node:querystring';
import fs from 'node:fs';
import pug from 'pug';

const server = http.createServer((request, response) => {

    if (request.url === '/') { // HOME

        const aPizzen = [
            {
                prod: 'Crazy Dog',
                price: '11.50'
            },
            {
                prod: 'Hawaii',
                price: '12.50'
            },
            {
                prod: 'Original',
                price: '9.20'
            },
        ];

        const site = pug.compileFile('./templates/home.pug');
        response.write(site({
            allPizzen: aPizzen,
        }));
        response.end();

    } else if (request.url === '/bestellung') { // BESTELLEINGANG

        const site = pug.compileFile('./templates/bestellung.pug');
        let allData = '';

        request.on('data', (data) => {
            allData += data;
        });

        request.on('end', () => {

            const formatData = querystring.decode(allData);
            const orderDate = new Date().toLocaleDateString();

            let dataObj;
            let currOrders;

            // READ ORDER DATA FROM pizzadata.json
            try{
                dataObj = JSON.parse(fs.readFileSync('./db/pizzadata.json', 'utf-8'));   
            }catch(err){
                console.log(err); 
            }

            // PUSH NEW ORDER TO pizzadata.json
            dataObj.orders.push({
                prod: formatData.pizzaauswahl,
                address: formatData.adresse,
                date: orderDate
            })

            // WRITE NEW JSON-FILE
            fs.writeFileSync('./db/pizzadata.json', JSON.stringify(dataObj), (err)=>{
                console.log(err);
            });

            // SHOW ORDER-DATA ON SITE
            response.write(site({
                orderProd: formatData.pizzaauswahl,
                orderAddress: formatData.adresse,
            }));

            response.end();
        });

    } else if (request.url === '/bestellungen') { // BESTELLÜBERSICHT

        const site = pug.compileFile('./templates/bestellungen.pug');
        let allOrders;

        try{
            allOrders = JSON.parse(fs.readFileSync('./db/pizzadata.json', 'utf-8'));   
            console.log(allOrders.orders);
            
        }catch(err){
            console.log(err); 
        }

        response.write(site(
            {
                orders: allOrders.orders
            }
        ));
        response.end();

    } else { // FEHLERSEITE

        response.statusCode = 404;
        const site = pug.compileFile('./templates/error.pug');
        response.write(site());
        response.end();
    }

});

server.listen(4200);