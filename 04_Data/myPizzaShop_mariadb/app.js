import http from 'node:http';
import querystring from 'node:querystring';
import fs from 'node:fs';
import pug from 'pug';
import { DataTypes, Sequelize } from 'sequelize';

// Datenbank-Verbindung zu MySQL/MariaDB mit Sequelize
const sequelize = new Sequelize('mypizza', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
});

// Testen der Datenbank-Verbindung
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Anlegen eines Datenbank-Model
const Bestellung = sequelize.define('Bestellung', {
    adresse: DataTypes.STRING,
    datum: DataTypes.STRING,
    bestellung: DataTypes.STRING
});

// Definiert die Spalten einer Datenbank und legt sie an, falls noch nicht vorhanden (Sequelize ist Asynchron, darum await)
await sequelize.sync();

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

            // Anlegen einer Bestellung mit Sequelize (Asynchron -> gibt einen Promise zurück)
            Bestellung.create({
                adresse: formatData.adresse,
                bestellung: formatData.pizzaauswahl,
                datum: orderDate
            }).then(() => { // Promise gibt Funktion zurück

                // SHOW ORDER-DATA ON SITE
                response.write(site({
                    orderProd: formatData.pizzaauswahl,
                    orderAddress: formatData.adresse,
                }));
                response.end();
            });  

        });

    } else if (request.url === '/bestellungen') { // BESTELLÜBERSICHT

        const site = pug.compileFile('./templates/bestellungen.pug');
        let allOrders;

        // Abrufen aller Bestellungen aus der MySql/MariaDB Datenbank (Asynchron -> gibt Promise zurück)
        Bestellung.findAll().then((data) => {

            // Übergabe der Datenbank-Inhalte an die bestellungen.pug Template-Datei
            response.write(site(
                {
                    orders: data
                }
            ));
            response.end();
        });

    } else { // FEHLERSEITE

        response.statusCode = 404;
        const site = pug.compileFile('./templates/error.pug');
        response.write(site());
        response.end();
    }

});

server.listen(4200);