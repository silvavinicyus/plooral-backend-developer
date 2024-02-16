import { ICompanyEntity } from '@domain/entities/company'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/database'

export class CompanyModel extends Model<ICompanyEntity> {}

CompanyModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'companies',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
