import http from 'node:http';
import fs from 'node:fs';

const myWeather = {
    lat: "52.3341",
    long: "9.7065"
}

const weatherServer = http.createServer((request, response) => {

    response.setHeader("Content-Type", "text/html; charset=utf-8");

    if(request.url === '/weather') {

        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${myWeather.lat}&longitude=${myWeather.long}&current_weather=true`;

        fetch(weatherURL).then(weatherResponse => {
            return weatherResponse.json();
        }).then(weatherData => {
            
            const site = fs.readFileSync('./myWeatherSite.html').toString();
            const wTime = new Date(weatherData.current_weather.time);
            const tempStr = weatherData.current_weather.temperature + weatherData.current_weather_units.temperature;

            function addZero(i) {
                if (i < 10) {i = "0" + i}
                return i;
              }

            response.write(
                site.replace('#Zeit', "Letzte Messung: "+wTime.getHours()+":"+addZero(wTime.getMinutes())+" Uhr")
                .replace('#Temperatur', tempStr)
            );
            //response.write(`Dein Wetter heute: ${wStr}`);
            response.end(); 
        });  
        
    } else if(request.url === '/') {

        response.write("Willkommen auf der Wetterseite!");
        response.end(); 
    } else {
        response.statusCode = 404;
        response.write("Keine Seite gefunden!");
        response.end(); 
    }  
    
});

weatherServer.listen(4242);