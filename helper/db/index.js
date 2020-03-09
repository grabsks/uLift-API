import Sequelize from 'sequelize';

class DataBase{
  
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(this.database, this.user, this.password, {
            host: this.host,
            dialect:'mysql'
        });
    }

}

export default new DataBase();