import { sequelize } from '../config/db.js';
import { Sequelize } from 'sequelize';

// --- 1. Import all models from their respective files (File extensions added) ---

// Authentication & Access Domain
import User from './auth/User.js';
import Business from './auth/Business.js';
import BusinessUser from './auth/BusinessUser.js';

// Inventory & Supply Chain Domain
import Product from './inventory/Product.js';
import Supplier from './inventory/Supplier.js';
import Shipment from './inventory/Shipment.js';
import InventoryBatch from './inventory/InventoryBatch.js';

// Sales & Customer Domain
import Customer from './inventory/Customer.js';
import Transaction from './sales/Transaction.js';
import TransactionItem from './sales/TransactionItem.js';

// Utility/Logging Domain
import AuditLog from './utility/AuditLog.js';

// --- 2. Collect all imported models into a db object ---
const db = {
    User,
    Business,
    BusinessUser,
    Product,
    Supplier,
    Shipment,
    InventoryBatch,
    Customer,
    Transaction,
    TransactionItem,
    AuditLog,
};

// --- 3. Apply associations AFTER all models are defined ---
import defineAssociations from './associations.js'; // Added .js extension
defineAssociations(db);

// --- 4. Attach sequelize instances and export ---
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
