import bcrypt from 'bcrypt'

export default (sequelize, DataType) => {
    const Add = sequelize.define('Add', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        x: {
            type: DataType.INTEGER,
            allowNull: false
        },
        y: {
            type: DataType.INTEGER,
            allowNull: false
        },
        result: {
            type: DataType.INTEGER,
            allowNull: false
        }
    })

    return Add;
}