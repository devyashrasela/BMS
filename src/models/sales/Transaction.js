import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/db.js';

class Transaction extends Model {}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        businessId: { // FK: The business processing the sale
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerId: { // FK: Customer who made the purchase (nullable for anonymous sales)
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        transactionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        transactionType: {
            type: DataTypes.ENUM('Bill', 'Invoice'), // Differentiates retail Bill from formal Invoice
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2), // Grand total
            allowNull: false,
            defaultValue: 0.00,
            validate: { min: 0 }
        },
        status: {
            type: DataTypes.ENUM('Paid', 'Unpaid', 'Partially Paid', 'Cancelled'),
            defaultValue: 'Paid', 
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
        timestamps: true,
    }
);
export default Transaction;
