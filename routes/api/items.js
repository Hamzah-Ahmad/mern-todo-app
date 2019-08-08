const express = require('express');
const app = express();
const uuid = require('uuid');
const mongoose = require('mongoose');
const router = express.Router();

const Item = require('../../models/Items');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const newItem = new Item({
            id,
            name
        });
        
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async(req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({"msg": "Success"});
    } catch (err) {
        res.status(500).send('Server error');
    }
    
});

module.exports =  router;