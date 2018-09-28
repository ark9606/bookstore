/**
 * Author: Arkady Zelensky
 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('genre', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT(11)
    },
    name: DataTypes.STRING(45),

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })
}