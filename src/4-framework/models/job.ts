import { IJobEntity } from '@domain/entities/job'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/database'
import { CompanyModel } from './company'

export class JobModel extends Model<IJobEntity> {}

JobModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: 'id',
        model: 'companies',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived', 'rejected'),
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
    tableName: 'jobs',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)

JobModel.belongsTo(CompanyModel, {
  foreignKey: 'company_id',
  as: 'company',
})

CompanyModel.hasMany(JobModel, {
  sourceKey: 'id',
  foreignKey: 'company_id',
  as: 'jobs',
})
