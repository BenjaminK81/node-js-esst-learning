import express from "express";
const server = express();

server.set('view engine', 'pug'); // nach npm Installation von pug, können templates angelegt werden, wei bei Kapitel mit pug 
server.set('views', './views');

// eine Route für /pizza
server.get('/pizza', (request, response) => {
    response.render('pizza', { // unter views wird das template pizza.pug aufgerufen und optional Daten übergeben
        title: "WhatsUp Pizza",
        header1: "What a f****** good pizza!"
    });
});

// eine Route für hallo, mit übergebene Parameter in der URL
server.get('/hallo/:name', (request, response) => {
    response.send(`Hallo ${request.params.name}`);
});

server.listen(3500);