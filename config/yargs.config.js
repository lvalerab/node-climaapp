const argv=require('yargs')
            .option({
                direccion:{
                    alias:'d',
                    desc:'Direccion de la ciudad que queremos consultar',
                    demand:true
                }
            }).argv;


module.exports={
    argv
};