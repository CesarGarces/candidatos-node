const express = require('express');
const router = express.Router();

const Candidato = require('../models/candidatos');

//R read 1
router.get('/:id', async (req, res) => {
    const candidato = await Candidato.findById(req.params.id);
    res.json(candidato);
});

//C create
router.post('/', async (req, res) => {
    const { nombre, apellido, documento, fecha, bloqueo } = req.body;
    const candidato = new Candidato({nombre, apellido, documento, fecha, bloqueo});
    await candidato.save();
    res.json({status: 'Candidato guardado'});
});
//R read all
router.get('/', async (req, res) => {
    const candidatos = await Candidato.find();
    res.json(candidatos);
});
//U update
router.put('/:id', async (req, res) => {
    const { nombre, apellido, documento, fecha, bloqueo } = req.body;
    const newCandidato = { nombre, apellido, documento, fecha, bloqueo};
    await Candidato.findByIdAndUpdate(req.params.id, newCandidato);
    res.json({status: 'Candidato Modificado'});
});
//D delete
router.delete('/:id', async (req, res) => {
    await Candidato.findByIdAndRemove(req.params.id);
    res.json({status: 'Candidato Eliminado'});
});

module.exports = router;