const validator = require('validator');
const bcrypt = require('bcrypt');
const { v2: cloudinary } = require('cloudinary');
const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');




//API for adding doctors

async function addDoctor(req, res) {
    try {
        const {name, email, password, fees, speciality, degree, experience, about, address} = req.body;
        const imageFile = req.file;

        // validate or checking required flieds
        if(!name || !email || !password || !fees || !speciality || !degree || ! experience || !about || !address ) {
            return res.status(400).json({success:false , message:'All feilds are required or missing details.'})
        }

        //validate email format
        if(!validator.isEmail(email)) {
            return res.status(400).json({success:false , message:'Please enter a valid email.'})
        }

        //validating strond password
        if(password.length < 8) {
            return res.status(400).json({success:false , message:'Please enter a strong password.'})
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const uploadImage = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = uploadImage.secure_url;

        const  newDoctor = new Doctor ({
            name,
            email,
            password:hashedPassword,
            image:imageUrl,
            speciality,
            degree,
            about,
            experience,
            fees,
            address:JSON.parse(address),
            date:Date.now()
            

        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json({ success:true,message:'Doctor added successfully.',savedDoctor });


    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}

//API for admin login

async function loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
  
      // Log received request payload for debugging
      console.log('Request received:', { email, password });
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
  
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email + password, process.env.JWT_SECRET);
        console.log('Generated token:', token); // Log the generated token
        res.status(200).json({ success: true, message: 'Admin login successful', token });
      } else {
        res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }


  //API to get all doctors list for admin panel
  async function allDoctors(req, res) {
    try {
      const doctors = await Doctor.find({}).select('-password')
      res.status(200).json({ success:true, doctors})
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
      
      
    }
    
  }

  // API to get all appointments list

  async function appointmentsAdmin(req, res) {
    try {
      const appointments = await Appointment.find({})
      res.json({success:true, appointments})
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }


  //API for appointment cancellation

  async function appointmentCancellation(req, res) {
    try {
        const { appointmentId } = req.body
        
        const appointmentData = await Appointment.findById(appointmentId)

        

        await Appointment.findByIdAndUpdate(appointmentId, {cancelled:true} )

        //realising doctor slot

        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await Doctor.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await Doctor.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:'Appointment cancelled successfully'})
    } catch (error) {
        console.log(error);  
        res.json({success:false,  message: error.message });
    }
 }
  
 // API to get admin dashboard data for adminpanel

 async function adminDashboard(req, res) {
  try {

    const doctors = await Doctor.find({})
    const users = await User.find({})
    const appointments = await Appointment.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }

    res.json({success:true, dashData})
    
  } catch (error) {
    console.log(error);  
    res.json({success:false,  message: error.message });
  }
  
 }
   



 
module.exports = {
    addDoctor,
    loginAdmin,
    allDoctors,
    appointmentsAdmin,
    appointmentCancellation,
    adminDashboard,
}






// async function loginAdmin(req ,res) {
//     try {
        
//          const { email,password } = req.body

//          if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {

//             const token = jwt.sign(email+password,process.env.JWT_SECRET)
//             res.status(200).json({ message:"Admin login successfull", token}) 
//          } else {
//             res.status(400).json({ message: "Invalid admin password"})
//          }

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
    
// }