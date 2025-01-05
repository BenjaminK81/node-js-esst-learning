import http from 'node:http';
import pug from 'pug';
import { WebSocketServer } from 'ws';
import { config } from 'dotenv';
config();

/* Wetter-Daten per fetch holen */
const myWeather = {
    lat: "52.3341",
    long: "9.7065"
}
const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${myWeather.lat}&longitude=${myWeather.long}&current_weather=true`;
const getWeather = () => {

    return fetch(weatherURL).then((data)=>{
        return(data.json())
    }).then((dataObj) => {
        return dataObj;
    });
}


/* ------------- WEBSOCKET SERVER ---------------- */
const wsserver = new WebSocketServer({
    port: process.env.WSPORT
});
wsserver.on('connection', (socket) => {

    setInterval(() => {

        getWeather().then((wobject) => {
            socket.send(JSON.stringify(wobject));
        })

    }, 5000);

});

const server = http.createServer((req, resp) => {

    if(req.url === '/') {

        const site = pug.compileFile('./templates/weather.pug');

        resp.write(site());
        resp.end();
    
    } else {
        resp.statusCode = 404;
        const site = pug.compileFile('./templates/error.pug');
        resp.write(site());
        resp.end();
    }
    
});

server.listen(process.env.PORT);

//console.log(process.env);
