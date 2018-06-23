const mongoose = require('mongoose');
const { Schema } = mongoose;

const CandidatosSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: Number, required: true },
    fecha: { type: String, required: true },
    bloqueo: { type: String, required: true }
});

module.exports = mongoose.model('Candidatos', CandidatosSchema);