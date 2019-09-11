
const cgl=require('./city.geo.location.config');
const cow=require('./openwheatermap.config');
const axios=require('axios');


const clientHttpLugar=axios.create({
    baseURL:cgl.UrlPeticion,
    timeout:1000,
    headers:cgl.HeadersApiKeys
});


const clientHttpWeather=axios.create({
    baseURL:cow.WeatherApiConf.urlBase,
    timeout:10000

});

const getLugar= async (lugar)=> {
    const respuesta=await clientHttpLugar.get(`latlon.php?location=${encodeURI(lugar)}`);
    let data=respuesta.data;
    if(data.Results.length===0) {
        throw new Error(`No se ha encontrado lugar ${lugar}`);
    } else {
        let retorno=[];
        for(let i=0;i<data.Results.length;i++) {
            let lugar={
                id:retorno.length,
                tipo:data.Results[i].type,
                lugar:data.Results[i].name,
                lat:data.Results[i].lat,
                lng:data.Results[i].lon
            };
            let tiempo=await getTiempo(lugar);            
            lugar.tiempo=tiempo;
            retorno.push(lugar);
        }
        return retorno;
    }
}

const getTiempo=async (lugar) => {
    const respuesta=await clientHttpWeather.get(cow.WeatherApiConf.urlActions.urlByCoors.replace('#lat#',encodeURI(lugar.lat)).replace('#lon#',encodeURI(lugar.lng)));
    if(respuesta) {
        
        return {
            tiempo:respuesta.data.weather[0].main,
            prms:{
                temperatura:{
                    minima:respuesta.data.main.temp_min,
                    actual:respuesta.data.main.temp,
                    maxima:respuesta.data.main.temp_max,
                },
                presion:respuesta.data.main.pressure,
                humedad:respuesta.data.main.humidity,
            }
        }
    } else {
        return {
            tiempo:"ERROR",
            prms:{
                temperatura:{
                    minima:0.0,
                    actual:0.0,
                    maxima:0.0,
                },
                presion:0,
                humedad:0,
            }
        }
    }
};

module.exports={
    getLugar,
    getTiempo
}