import { error } from 'node:console';
import http from 'node:http';

const server = http.createServer((request, response) => {    
    response.write('Hallo Welt!');
    response.end();
});

server.listen(4230);

/* 
    ### Prozess greift auf den NodeJS-Prozess im Allgemeinen zu! ### 
    ## Damit kontrollier ich den kompletten Node-Prozess ##
*/


// process.on() wartet auf bestimmte Eingänge
// hier hört der Prozess auf einen geworfenen Fehler und beendet den Prozess / Server
process.on('uncaughtException', (error) => {
    console.log('Sclimm: ', error);
    process.exit();
});

// process.exit() -> FUNKTION/METHODE beendet den Node-Prozess
/* setTimeout(()=>{
    console.log('Prozess angehalten!'); 
    process.exit();
}, 5000); */

// process.cwd() -> FUNKTION/METHODE (current working directory) - der aktuelle Arbeitspfad
console.log(process.cwd());

// process.version -> Eigenschaft - gibt die aktuelle NodeJS-Version 
console.log(process.version);

// Node beendet den Server und Prozess auch, wenn ich den Fehler selber werfe
setTimeout(()=>{
    throw new Error('Schlimmer Fehler!');
}, 5000);



