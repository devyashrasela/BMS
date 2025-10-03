import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.js';

class AuditLog extends Model {}

AuditLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        businessId: { // FK: Which business the action belongs to
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: { // FK: Who performed the action
            type: DataTypes.STRING,
            allowNull: false,
        },
        actionType: {
            type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE', 'ADJUST'),
            allowNull: false,
        },
        entityType: {
            type: DataTypes.ENUM('PRODUCT', 'SHIPMENT', 'USER', 'TRANSACTION'),
            allowNull: false,
        },
        entityId: { // The ID of the item that was affected (e.g., product SKU or transaction ID)
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: { // Brief human-readable summary of the change
            type: DataTypes.STRING,
            allowNull: false,
        },
        oldValue: { // JSON field to store the previous state (optional but useful)
            type: DataTypes.JSON,
            allowNull: true,
        },
        newValue: { // JSON field to store the new state (optional but useful)
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'AuditLog',
        timestamps: true,
    }
);

export default AuditLog;
