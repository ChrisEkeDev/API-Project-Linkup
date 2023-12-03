const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.Player, {
                foreignKey: "playerId",
                targetKey: 'id'
            })

            Comment.belongsTo(models.Comment, {
                foreignKey: "replyTo",
                targetKey: 'id'
            })

            Comment.hasOne(models.Comment, {
                foreignKey: 'replyTo',
                sourceKey: 'id',
                onDelete: 'SET NULL',
                hooks: true
            })

            Comment.belongsTo(models.Court, {
                foreignKey: "courtId",
                targetKey: 'id'
            })

            Comment.belongsTo(models.Session, {
                foreignKey: "sessionId",
                targetKey: 'id'
            })
        }
    }

    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        replyTo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        courtId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
     sequelize,
     modelName: 'Comment'
    })
    return Comment;

}
