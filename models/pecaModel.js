var conn = require('./../db/mysql.js');

class Peca {
    constructor(id){
        if (id != 0){
            let sql = "SELECT * FROM peca WHERE id = " + id + ";";
            conn.query(sql, (err, result) => {
                if (err) return;
                this.id = id;
                this.imagem = result[0].imagem;
                this.cor = result[0].cor;
                this.tamanho = result[0].tamanho;
                this.altura = result[0].altura;
                this.liso = result[0].liso;
            });
        } else {
            this.id = 0;
            this.imagem = '';
            this.cor = '';
            this.tamanho = '';
            this.altura = '';
            this.liso = '';
        }
    };
    getPeca(){
        console.log(this.id);
    };
    save(){

    };
    delete(){

    };

}

module.exports = Peca;