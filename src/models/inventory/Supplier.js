import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/db.js';

class Supplier extends Model { }

Supplier.init(
    {
        serial: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        supplierId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        businessId: { // FK to identify which business owns this supplier record
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactPerson: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true }
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Supplier',
        timestamps: true,
        hooks: {
            afterCreate: async (supplier, options) => {
                const generatedId = "BS" + supplier.serial.toString().padStart(4, "0");
                await supplier.update(
                    { supplierId: generatedId },
                    { hooks: false, transaction: options.transaction }
                );
            }
        }
    }
);

export default Supplier;