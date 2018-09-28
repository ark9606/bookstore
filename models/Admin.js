/**
 * Author: Arkady Zelensky
 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('admin', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT(11)
    },
    login: DataTypes.STRING(45),
    password: DataTypes.STRING(100),

  
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })
}