const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageflag: {
      type: DataTypes.STRING
    },
    continent: {
      type: DataTypes.STRING 
    },
    capitalcity: {
      type: DataTypes.STRING
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.STRING
    },
    population: {
      type: DataTypes.STRING
    }

  },{
    timestamps: false,
    freezeTableName: true,
  });
};
