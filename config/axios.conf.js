
const cgl=require('./city.geo.location.config');
const axios=require('axios');
console.log(cgl);

const clientHttp=axios.create({
    baseURL:cgl.UrlPeticion,
    timeout:1000,
    headers:cgl.HeadersApiKeys
});

module.exports={
    axios:clientHttp
}