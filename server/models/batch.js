'use strict';
module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define('Batch', {
    name: {type: DataTypes.STRING, allowNull: false},
    endDate: {type: DataTypes.DATE, allowNull: false},
    whiteFlourGms:{type: DataTypes.DECIMAL, allowNull:true},
    wholeWheatFlourGms:{type: DataTypes.DECIMAL, allowNull:true},
    waterGms:{type: DataTypes.DECIMAL, allowNull:true},
    instantYeastGms:{type: DataTypes.DECIMAL, allowNull:true},
    saltGms:{type: DataTypes.DECIMAL, allowNull:true},
    waterTempDegF:{type: DataTypes.DECIMAL, allowNull:true},
    fermentationTimeMins:{type: DataTypes.DECIMAL, allowNull:true},
    proofTimeMins:{type: DataTypes.DECIMAL, allowNull:true},
    alertedDate: {type: DataTypes.DATE, allowNull: true}

  }, {});
  Batch.associate = function(models) {
    Batch.hasMany(models.Reading);
  };
  return Batch;
};