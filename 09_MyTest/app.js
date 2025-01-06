
import http from 'node:http';
import pug from 'pug';
import { config } from 'dotenv';
import fs from 'node:fs';
import querystring from 'node:querystring';
config();

const server = http.createServer((req, resp) => {

    fetch('https://api.gastro-soul.de/jsondata/stores.json').then((data) => {
        return data.json();
    }).then((stores) => {

        const aStores = stores.countries.id[1].concepts;

        aStores.forEach(concept => {
            
            if(concept.concept_id === '1'){
                
                concept.stores.forEach(store => {
                    console.log(store.store_name);    
                })
                
            }
            
        }); 
    });

    const prodData = JSON.parse(fs.readFileSync('./db/data.json', 'utf-8'));

    if (req.url === '/') {

        const site = pug.compileFile('./templates/home.pug');
        resp.write(site({
            prodData: prodData.data,
        }));
        resp.end();

    } else if (req.url === '/new') {

        const site = pug.compileFile('./templates/new.pug');

        let allData = '';
        req.on('data', (data) => {
            allData += data;
        });

        req.on('end', () => {

            const newReq = querystring.decode(allData);
            const newData = {
                data: [
                    ...prodData.data,
                    {
                        prod: newReq.product,
                        price: newReq.price,
                    }
                ]
            };

            console.log(newData);

            fs.writeFileSync("./db/data.json", JSON.stringify(newData));

            resp.write(site({
                prodData: newData.data,
            }));
            resp.end();

        });

    } else {
        const site = pug.compileFile('./templates/error.pug');
        resp.statusCode = 404;
        resp.write(site());
        resp.end();
    }

});
server.listen(process.env.MYPORT);




