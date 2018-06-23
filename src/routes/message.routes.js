const express = require('express');
const router = express.Router();

const Message = require('../models/message');

//R read 1
router.get('/:id', async (req, res) => {
    const message = await Message.findById(req.params.id);
    res.json(message);
});

//C create
router.post('/', async (req, res) => {
    const { author, title, description } = req.body;
    const message = new Message({author, title, description});
    await message.save();
    res.json({status: 'Message Saved'});
});
//R read all
router.get('/', async (req, res) => {
    const message = await Message.find();
    res.json(message);
});
//U update
router.put('/:id', async (req, res) => {
    const { author, title, description } = req.body;
    const newMessage = { author, title, description};
    await Message.findByIdAndUpdate(req.params.id, newMessage);
    res.json({status: 'Message Modified'});
});
//D delete
router.delete('/:id', async (req, res) => {
    await Message.findByIdAndRemove(req.params.id);
    res.json({status: 'Message Deleted'});
});

module.exports = router;