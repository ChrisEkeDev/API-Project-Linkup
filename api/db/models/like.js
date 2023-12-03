const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            Like.belongsTo(models.Player, {
                foreignKey: 'playerId',
                targetKey: 'id'
            })

            Like.belongsTo(models.Court, {
                foreignKey: 'courtId',
                targetKey: 'id'
            })
        }
    }

    Like.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        courtId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Like'
    })
    return Like;

}
