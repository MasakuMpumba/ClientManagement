/**
 * This file handles all the cv routes
 */
const express = require('express');
const router = express.Router();

const Customer = require('../models/customer');

router.get('/', (req, res, next) => {
    Customer.getCustomers((err, customers) => {
        if(err) res.send(err);

        res.json(customers);
    })
});

// get particular customer data
router.get('/:customer_id', (req, res, next) => {
    Customer.getCustomerById(req.params.customer_id, (err, customer) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(customer);
        }
    });
});

// create cv route (stores data in db)
router.post('/create', (req, res, next) => {
    const data = req.body; // gets data sent to this URL
    
    Customer.addCustomer(data, (err, customer) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to create CV'});
        } else {
            res.json({success: true, msg: 'Suctomer record successfully created'});
        }
    });
});

// Update cv
router.put('/update/:customer_id', (req, res) => {
    const customer_id = req.params.customer_id;
    const data = req.body;

    Customer.editCustomer(customer_id, data, {}, (err, customer) => {
        if (err) {
            res.send(err);
        }
        // what is returned
        res.json({
            success: true,
            msg: 'Successfully updated'
        });
    });
});


// Delete customer
router.delete('/delete/:customer_id', (req, res) => {
    const id = req.params.customer_id;
    Customer.deleteCustomer(id, (err, customer) => {
        if (err) {
            res.send(err);
        }
        res.json({
            success: true, 
            msg: 'The customer record has been deleted successfully',
            customers: customer
        });
    });
});

module.exports = router;
