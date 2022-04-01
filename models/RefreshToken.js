module.exports = (sequelize, DataTypes) => {
  const refreshToken = sequelize.defin(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updateddAt: {
        type: DataTypes.DATE,
        field: "updated_At",
        allowNull: false,
      },
    },
    {
      tableName: "refresh_tokens",
      timeStamps: true,
    }
  );

  return refreshToken;
};
