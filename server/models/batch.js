'use strict';
module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define('Batch', {
    name: {type: DataTypes.STRING, allowNull: false},
    endDate: {type: DataTypes.DATE, allowNull: false}
  }, {});
  Batch.associate = function(models) {
    Batch.hasMany(models.Reading);
  };
  return Batch;
};