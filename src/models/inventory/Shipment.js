import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/db.js';

class Shipment extends Model {}

Shipment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // Foreign Key: Links the shipment to the Business that received it
        businessId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Foreign Key: Links the shipment to the Supplier that sent it
        supplierId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateReceived: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        referenceNumber: { // Supplier's Invoice or PO reference number
            type: DataTypes.STRING,
            allowNull: true,
        },
        totalPrice: { // Total cost of all items in this shipment (calculated summary)
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: { min: 0 }
        },
        // Total number of unique product types (SKUs) in this shipment
        totalDistinctItems: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 0 }
        }
    },
    {
        sequelize,
        modelName: 'Shipment',
        timestamps: true,
    }
);

export default Shipment;
