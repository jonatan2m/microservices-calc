import bcrypt from 'bcrypt'

export default (sequelize, DataType) => {
    const Services = sequelize.define('Services', {
        name: {
            type: DataType.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        url: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        endpoints: {
            type: DataType.JSON,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return Services;
}