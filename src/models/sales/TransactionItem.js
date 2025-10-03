import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/db.js';

class TransactionItem extends Model {}

TransactionItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        transactionId: { // FK: Link to the parent transaction (Bill/Invoice)
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sku: { // FK: The specific product sold
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 } // Must sell at least one item
        },
        unitPrice: { // The price the item was sold at (for this specific transaction)
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 }
        },
    },
    {
        sequelize,
        modelName: 'TransactionItem',
        timestamps: true,
    }
);

export default TransactionItem