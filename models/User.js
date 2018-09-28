/**
 * Author: Arkady Zelensky
 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT(11)
    },
    email: DataTypes.STRING(45),
    password: DataTypes.STRING(100),
    forgot_token: DataTypes.STRING(100),
    first_name: DataTypes.STRING(45),
  
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })
}