import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.js';
import bcrypt from 'bcrypt';

class User extends Model { }

User.init(
    {
        serial: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isPhoneNumber(value) {
                    if (!/^\+?[0-9]{10,15}$/.test(value)) {
                        throw new Error('Invalid phone number format.');
                    }
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        profilePictureUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            }
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        hooks: {
            beforeCreate: async (user, options) => {
                console.log("Running Before Create");
                console.log("Hashing Password...")
                const salt = bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword;
                console.log('Password Hashed Successfully.')
            },
            afterCreate: async (user, options) => {
                const generatedId = "USR" + user.serial.toString().padStart(4, "0");
                await user.update(
                    { userId: generatedId },
                    { hooks: false, transaction: options.transaction }
                );
            }
        }
    },
);

export default User;