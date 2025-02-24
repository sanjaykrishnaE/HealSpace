const mongoose = require('mongoose');


const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true, 
    },
    degree: {
        type: String,
        required:true
    },
    experience: {
        type: String,
        required:true
    },
    about: {
        type: String,
        required:true
    },
    fees: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default:true,
    },
    address: {
        type: Object,
        required: true,
    },
    
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true
    },
    slots_booked: {
        type: Object,
        default:{}
    }
},{minimize:false});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
