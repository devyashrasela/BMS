import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.js';

class Customer extends Model { }

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        businessId: { // FK: Which business owns this customer record
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true }
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
        },
    },
    {
        sequelize,
        modelName: 'Customer',
        timestamps: true,
    }
);

export default Customer;