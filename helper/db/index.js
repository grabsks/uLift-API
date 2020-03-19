import Sequelize from 'sequelize';

import databaseConfig from '../../config/database';
import User from '../../model/User';
import College from '../../model/College';
import Lift from '../../model/Lift';
import File from  '../../model/File';

class DataBase{
    constructor(){
        this.models = [User, College, Lift, File]
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        this.models         
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }
}

export default new DataBase();