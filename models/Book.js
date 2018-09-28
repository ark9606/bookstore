/**
 * Author: Arkady Zelensky
 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('book', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT(11)
    },

    id_genre: DataTypes.BIGINT(11),
    id_author: DataTypes.BIGINT(11),

    title: DataTypes.STRING(45),
    image: DataTypes.STRING(45),
    pubdate: DataTypes.DATEONLY,  

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })
}