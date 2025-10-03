const defineAssociations = (db) => {
    // Destructure models from the imported db object for cleaner use
    const {
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
        AuditLog
    } = db;

    // --- 1. User and Business Management Associations ---

    // A User's integer 'serial' PK links to the Business's integer 'ownerId' FK.
    // This is a standard association as it uses the primary key.
    User.hasMany(Business, {
        foreignKey: 'ownerId',
        as: 'OwnedBusinesses'
    });
    Business.belongsTo(User, {
        foreignKey: 'ownerId',
        as: 'Owner'
    });

    // Many-to-Many: User <-> Business (via BusinessUser) using STRING IDs
    // We must specify sourceKey and targetKey because 'userId' is not the User's PK.
    User.hasMany(BusinessUser, {
        foreignKey: 'userId',
        sourceKey: 'userId'
    });
    BusinessUser.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'userId'
    });

    // We must specify sourceKey and targetKey because 'businessId' is not the Business's PK.
    Business.hasMany(BusinessUser, {
        foreignKey: 'businessId',
        sourceKey: 'businessId'
    });
    BusinessUser.belongsTo(Business, {
        foreignKey: 'businessId',
        targetKey: 'businessId'
    });


    // --- 2. Business as the Central Hub ---

    // A Business owns many Products. Association uses the custom string 'businessId'.
    Business.hasMany(Product, {
        foreignKey: 'businessId',
        sourceKey: 'businessId'
    });
    Product.belongsTo(Business, {
        foreignKey: 'businessId',
        targetKey: 'businessId'
    });

    // A Business has many Suppliers. Association uses the custom string 'businessId'.
    // NOTE: Ensure Supplier's businessId is STRING, not INTEGER.
    Business.hasMany(Supplier, {
        foreignKey: 'businessId',
        sourceKey: 'businessId'
    });
    Supplier.belongsTo(Business, {
        foreignKey: 'businessId',
        targetKey: 'businessId'
    });
    
    // A Business receives many Shipments. Association uses 'businessId'.
    Business.hasMany(Shipment, {
        foreignKey: 'businessId',
        sourceKey: 'businessId'
    });
    Shipment.belongsTo(Business, {
        foreignKey: 'businessId',
        targetKey: 'businessId'
    });

    // --- 3. Inventory and Supply Chain Associations ---

    // A Product can be in many Batches. This correctly uses 'sku' which is the PK for Product.
    Product.hasMany(InventoryBatch, {
        foreignKey: 'sku'
    });
    InventoryBatch.belongsTo(Product, {
        foreignKey: 'sku'
    });

    // A Supplier provides many Shipments. Association uses the custom string 'supplierId'.
    Supplier.hasMany(Shipment, {
        foreignKey: 'supplierId',
        sourceKey: 'supplierId'
    });
    Shipment.belongsTo(Supplier, {
        foreignKey: 'supplierId',
        targetKey: 'supplierId'
    });

    // A Shipment contains many Batches. This is a standard PK -> FK association.
    Shipment.hasMany(InventoryBatch, {
        foreignKey: 'shipmentId'
    });
    InventoryBatch.belongsTo(Shipment, {
        foreignKey: 'shipmentId'
    });


    // --- 4. Sales, Billing, and Customer Associations ---

    // A Business has many Customers. Association uses the custom string 'businessId'.
    Business.hasMany(Customer, {
        foreignKey: 'businessId',
        sourceKey: 'businessId'
    });
    Customer.belongsTo(Business, {
        foreignKey: 'businessId',
        targetKey: 'businessId'
    });

    // A Business has many Transactions. Association uses 'businessId'.
    Business.hasMany(Transaction, {
        foreignKey: 'businessId',
        sourceKey: 'businessId'
    });
    Transaction.belongsTo(Business, {
        foreignKey: 'businessId',
        targetKey: 'businessId'
    });

    // A Customer can have many Transactions. Standard PK -> FK association.
    Customer.hasMany(Transaction, {
        foreignKey: 'customerId'
    });
    Transaction.belongsTo(Customer, {
        foreignKey: 'customerId'
    });

    // A Transaction has many Items. Standard PK -> FK association.
    Transaction.hasMany(TransactionItem, {
        foreignKey: 'transactionId'
    });
    TransactionItem.belongsTo(Transaction, {
        foreignKey: 'transactionId'
    });

    // A Product can be in many TransactionItems. This correctly uses 'sku', the Product's PK.
    Product.hasMany(TransactionItem, {
        foreignKey: 'sku'
    });
    TransactionItem.belongsTo(Product, {
        foreignKey: 'sku'
    });


    // --- 5. Audit Log Associations ---

    // Audits are linked to a Business via the custom 'businessId'.
    Business.hasMany(AuditLog, {
        foreignKey: 'businessId',
        sourceKey: 'businessId'
    });
    AuditLog.belongsTo(Business, {
        foreignKey: 'businessId',
        targetKey: 'businessId'
    });

    // Audits are linked to a User via the custom 'userId'.
    User.hasMany(AuditLog, {
        foreignKey: 'userId',
        sourceKey: 'userId'
    });
    AuditLog.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'userId'
    });
};

export default defineAssociations;

