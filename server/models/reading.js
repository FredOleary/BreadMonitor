'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reading = sequelize.define('Reading', {
    co2: DataTypes.DOUBLE
  }, {});
  Reading.associate = function(models) {
    Reading.belongsTo(models.Batch, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Reading;
};