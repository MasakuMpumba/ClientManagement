const mongoose = require('mongoose');
const config = require('../config/database');

// user schema
const customerSchema = mongoose.Schema({
    // fields of the user document
    name: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String },
    address: { type: String },
    department: { type: String }
});

// enable the user to be used in external functions
const Customer = module.exports = mongoose.model('Customer', customerSchema);

// gets all the customers in the db
module.exports.getCustomers = function(callback, limit) {
    Customer.find(callback).limit(limit).sort([['created_at', 'ascending']]);
}

// gets user by the id
module.exports.getCustomerById = function(id, callback) {
    Customer.findById(id, callback);
}

// gets user by the email
module.exports.getCustomerByEmail = function(email, callback) {
    const query = {email: email}; // query to equate email to db username
    Customer.findOne(query, callback);
}

// gets a user by their phone number
module.exports.getCustomerByPhone = function(phone, callback) {
    const query = {phone: phone};
    Customer.findOne(query, callback);
}

// adds data to db
module.exports.addCustomer = function (customer, callback) {
    const add = {
        name: customer.name,
        email: customer.email,
        phone: customerSchema.phone,
        address: customer.address,
        department: customerSchema.department
    }

    Customer.create(add, callback); // creates a customer doc
}

// updates a customers details
module.exports.editCustomer = function (customer_id, data, options, callback) {
    const query = {_id: customer_id}; // query to identify speciic customer

    const updateDits = {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: data.address,
        department: data.department
    }

    Customer.findOneAndUpdate(query, updateDits, options, callback);
}

// deletes a customers record from the db
module.exports.deleteCustomer = function(customer_id, callback) {
    const query = {_id: customer_id}; // query to find customer

    Customer.findOneAndRemove(query, callback);
}



