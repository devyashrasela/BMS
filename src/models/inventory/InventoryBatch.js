import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.js';

class InventoryBatch extends Model { }

InventoryBatch.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sku: { // FK: The specific product item (what)
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipmentId: { // FK: Where the stock came from (who/when)
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        batchNumber: { // Unique identifier for this batch/lot
            type: DataTypes.STRING,
        },
        expirationDate: { // Crucial for FEFO/perishables
            type: DataTypes.DATEONLY,
        },
        storageLocation: { // e.g., 'Shelf 3A, Bin B'
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'InventoryBatch',
        timestamps: true,
    }
);

export default InventoryBatch;