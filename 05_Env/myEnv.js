import http from 'node:http';
import { config } from 'dotenv'; // mit diesem modul kann ich die Variablen in eine .env auslagern
config();

// Umgebungsvariablen mit .env
// process.env.XXX definiert eine Variable, die ich bei Prozess-Neustart z.B. mitgeben kann
// Command: MYPORT=3700 MYNAME=Benjamin node myEnv.js
const serverPort = process.env.MYPORT;
const myName = process.env.MYNAME;

const server = http.createServer((req, resp) => {

    resp.setHeader('Content-Type', 'text/html; charset=utf-8')
    resp.write(`Hallo ${myName}, dein Server läuft auf Port: ${serverPort}!`);
    resp.end();
});

server.listen(serverPort);

// process.env -> Eigenschaft - gibt Objekt mit Prozess-Variablen zurück
console.log(process.env);