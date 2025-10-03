import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/db.js';

class Product extends Model {}

Product.init(
    {
        // SKU is the Primary Key
        sku: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        // Foreign Key: Links the product to a specific business
        businessId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        imageUrl: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        },
        // Financials
        unitCost: { // Price paid to the supplier
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: { min: 0 }
        },
        unitPrice: { // Price sold to the customer
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: { min: 0 }
        },
        reorderUnit: { // Minimum stock level to trigger an alert
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 0 }
        },
        isActive: { // Soft delete flag
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        timestamps: true,
    }
);

export default Product;
