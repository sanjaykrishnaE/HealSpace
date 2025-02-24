
const Doctor = require("../models/doctorModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointmentModel')



async function changeAvailability(req, res) {
    try {
        
        const {docId} = req.body

        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId,{available: !docData.available})
        res.status(200).json({success:true, message:'Availability changed'})



    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
    
}

async function doctorsList(req, res) {
    try {
        const doctors = await Doctor.find({}).select(['-email','-password'])
        res.status(200).json({success:true, doctors})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
    
}


//  API- doctor login

async function docLogin(req, res) {
    try {
        const {email, password} = req.body

        const doctor = await Doctor.findOne({email})
        
        if (!doctor) {
            return res.json({success:false, message:'invalid email '})
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password)
        if (passwordMatch) {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success:false, message:'invalid password '})
        }
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

// API for getting appointments (doctor panel)

async function appointmentsDoctor(req, res) {
    try {
        const {docId} = req.body
        const appointments = await Appointment.find({ docId })

        res.json({success:true, appointments})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

// api for  completed appointment


async function appointmentCompleted(req, res) {
    try {
        const { docId, appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, {isCompleted:true})
            return res.json({success:true, message:'appointment completed '})
        } else {
            return res.json({success:false, message:'appointment failed '})
        }
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

// api for  completed appointment

async function appointmentCancelled(req, res) {
    try {
        const { docId, appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, {cancelled:true})
            return res.json({success:true, message:'appointment cancelled '})
        } else {
            return res.json({success:false, message:'Cancellation failed '})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


// API for doctor Dashboard 


async function doctorDashboard(req, res) {
    try {
        const { docId } = req.body
        const appointments = await Appointment.find({docId})

        let earnings = 0

        appointments.map((item)=>{
             if (item.isCompleted || item.payment){
                 earnings += item.amount
             }
        })

        let patients = []

        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


//API for doctor profile

async function doctorProfile(req, res) {
   try {
    const {docId} = req.body
    const profileData = await Doctor.findById(docId).select('-password')

    res.json({success:true, profileData})
   } catch (error) {
    res.json({success:false, message:error.message})
   } 
}

// API for doctor profile update

async function updateProfile(req, res) {
    try {
        const {docId, fees, address, available} = req.body

        await Doctor.findByIdAndUpdate(docId, {fees, address, available})

        res.json({success:true, message:'Profile updated successfully'})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


module.exports = {
    changeAvailability,
    doctorsList,
    docLogin,
    appointmentsDoctor,
    appointmentCompleted,
    appointmentCancelled,
    doctorDashboard,
    doctorProfile,
    updateProfile,
    

}






// const Doctor = require('../models/doctorModel');

// async function addDoctor(req, res) {
//     try {
//         const { name, email, password, fees, speciality, degree, experience, about, address} = req.body;
        
//         const newDoctor = new Doctor({
//             name: name,
//             speciality: speciality,
//             degree: degree,
//             experience: experience,
//             about: about,
//             fees: fees,
//             address: JSON.parse(address), // Ensure address is parsed correctly if submitted as JSON string
//             image: req.file ? req.file.path : null // Handle case where image might not be provided
//         });
        
//         const savedDoctor = await newDoctor.save();
//         res.status(201).json({ message: "Doctor added successfully", savedDoctor });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// module.exports = {
//     addDoctor,
// };
