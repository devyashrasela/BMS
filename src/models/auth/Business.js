import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.js';

class Business extends Model { }

Business.init(
    {
        serial: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        businessId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: { // e.g., 'Retail', 'Service'
            type: DataTypes.STRING,
        },
        streetAddress: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        pincode: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        websiteLink: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        },
        contactNumber: {
            type: DataTypes.STRING,
        },
        gstin: { // Compliance field
            type: DataTypes.STRING,
        },
        logoUrl: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        },
        // Foreign Key: Links to the User who created the business
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Business',
        timestamps: true,
        hooks: {
            afterCreate: async (business, options) => {
                const generatedId = "BS" + business.serial.toString().padStart(4, "0");
                await business.update(
                    { businessId: generatedId },
                    { hooks: false, transaction: options.transaction }
                );
            }
        }
    }
);

export default Business;
