import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/db.js';

class BusinessUser extends Model {}

BusinessUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // Foreign Keys (FKs) - Composite unique index ensures one role per user per business
        userId: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        businessId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('Owner', 'Manager', 'Staff'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'BusinessUser',
        timestamps: true,
        indexes: [
            {
                // Ensures a user can only have ONE role per business
                unique: true,
                fields: ['userId', 'businessId'],
            }
        ]
    }
);

export default BusinessUser;
