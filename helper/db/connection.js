import Sequelize from 'sequelize';

class DataBase{
  
    constructor(dabase, host, user, password){

        this.database = database
        this.host = host
        this.user = user
        this.password = password

    }

    Connect(){
        const sequelize = new Sequelize(this.database, this.user, this.password, {
            host: this.host,
            dialect:'mysql'
        });

        return sequelize;
        
    }

}

export default new DataBase();