const colors=require('colors');
const {argv}=require('./config/yargs.config');
const ClientesHttp=require('./config/axios.conf');

const sepCab="=====================================================";
const sepLin="-----------------------------------------------------";


ClientesHttp.getLugar(argv.direccion).then(resp=> {
    console.clear();
    let resultados=resp;
    if(resultados.length<=0) {
        console.log(sepCab.red);
        console.log(`|> No se han encontrado resultados`.red);
        console.log(sepCab.red);
    } else {
        console.log(sepCab.green);
        console.log(`|> Resultados encontrados:`.green+` ${resultados.length}`.yellow);
        console.log(sepCab.green);
        console.log('|ID\t|Tipo\t|Nombre\t\t\t|longitud\t|latitud\t|\tTiempo observable\t|Temperatura (min, act, max)\t|Presion\t|humedad\t|'.yellow);
        console.log(sepLin.green);
        for(let i=0;i<resultados.length;i++) {
            let linea=`|${resultados[i].id}\t|${resultados[i].tipo}\t|${resultados[i].lugar}\t\t\t|${resultados[i].lng}\t|${resultados[i].lat}\t|${resultados[i].tiempo.tiempo}\t|${resultados[i].tiempo.prms.temperatura.minima} ºC,${resultados[i].tiempo.prms.temperatura.actual} ºC,${resultados[i].tiempo.prms.temperatura.maxima} ºC\t|${resultados[i].tiempo.prms.presion} mmHg\t|${resultados[i].tiempo.prms.humedad} %\t|`;
            console.log(i%2==0?linea.yellow:linea.white);
            console.log(sepLin.green);
        }
    }
})
.catch(err=> {
    console.clear();
    console.log('ERROR!!!!',err);
});