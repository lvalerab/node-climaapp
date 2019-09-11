const colors=require('colors');
const {argv}=require('./config/yargs.config');
const {axios}=require('./config/axios.conf');

const sepCab="=====================================================";
const sepLin="-----------------------------------------------------";

console.log(argv.direccion);

axios.get(`latlon.php?location=${encodeURI(argv.direccion)}`).then(resp=> {
    console.clear();
    let resultados=resp.data.Results;
    if(resultados.length<=0) {
        console.log(sepCab.red);
        console.log(`|> No se han encontrado resultados`.red);
        console.log(sepCab.red);
    } else {
        console.log(sepCab.green);
        console.log(`|> Resultados encontrados:`.green+` ${resultados.length}`.yellow);
        console.log(sepCab.green);
        console.log('|Tipo\t|Nombre\t\t\t|longitud\t|latitud\t|'.yellow);
        console.log(sepLin.green);
        for(let i=0;i<resultados.length;i++) {
            console.log(`|${resultados[i].type}\t|${resultados[i].name}\t\t\t|${resultados[i].lon}\t|${resultados[i].lat}\t|`.yellow);
            console.log(sepLin.green);
        }
    }
})
.catch(err=> {
    console.clear();
    console.log('ERROR!!!!',err);
});