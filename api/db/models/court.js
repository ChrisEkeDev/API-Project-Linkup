const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Court extends Model {
        static associate(models) {
            Court.hasMany(models.Session, {
                foreignKey: 'courtId',
                sourceKey: 'id'
            })

            Court.hasMany(models.Comment, {
                foreignKey: 'courtId',
                sourceKey: 'id'
            })

            Court.hasMany(models.Like, {
                foreignKey: 'courtId',
                sourceKey: 'id'
            })
        }
    }

    Court.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        placeId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            min: -90,
            max: 90
        },
        lng: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            min: -180,
            max: 180
        }
    }, {
        sequelize,
        modelName: 'Court'
    });
    return Court;
}
