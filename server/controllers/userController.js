
require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
const validator = require('validator');
const { v2: cloudinary } = require('cloudinary');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const razorpay = require('razorpay');


async function signupUser  (req ,res) {
    try {
        const {name, email, password} =  req.body;

        if(!name || !email || !password) {
            return res.status(400).json({success:false , message:'Missing details'})
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json({success:false , message:'Enter a valid email'})
        }

        if(password.length < 8) {
            return res.status(400).json({success:false , message:'Enter a strong password'})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new User(userData)

        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success: true, token})

        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: error.message })
    }
    
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Account does not exist...' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
             res.status(200).json({ success: true, message: 'Login successful...', token });
        } else {
             res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);  
         res.status(500).json({success:false, message: error.message });
    }
}


//api for getting user profile data






async function getUserProfile(req, res) {
    try {
        const { userId } = req.body;
        const userData = await User.findById(userId).select('-password');

        // if (!userData) {
        //     return res.status(404).json({ success: false, message: "User not found" });
        // }

        res.status(200).json({ success: true, userData });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//API to update user profile

async function updateProfile(req, res) {
    try {
        const {userId, name, address, phone, dob, gender} = req.body
        const imageFile = req.file

        if (!name ||  !phone || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }
        await User.findByIdAndUpdate(userId, { name,address: JSON.parse(address),phone,dob,gender})

        if (imageFile) {
            //upload img to cloudnary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await User.findByIdAndUpdate(userId,{image:imageURL})
        }
        res.status(200).json({success:true, message:'profile updated'})
    } catch (error) {
        console.log(error);  
        return res.status(500).json({ message: error.message });
    }
    
}

//api to book appointment

async function bookAppointment(req, res) {
    try {
        const {userId , docId, slotDate, slotTime} = req.body

        const docData = await Doctor.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({success:false, message:'Doctor is not available'})
        }

        let slots_booked = docData.slots_booked

        //checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false, message:'slot is not available'})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        }

        const newAppointment = new Appointment(appointmentData)  
        await newAppointment.save()

        //save new slot data in docData
        await Doctor.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true ,message:'Appointment booked'})

    } catch (error) {
        console.log(error);  
        return res.json({success:false,  message: error.message });
    }
}

//api to get user appointments for client (my-appointment page)

 async function listUserAppointments(req, res) {
    try {
        const {userId} = req.body
        const appointments = await Appointment.find({userId})

        res.json({success:true, appointments})

    } catch (error) {
        console.log(error);  
        res.json({success:false,  message: error.message });
    }
    
 }

 // API to cancel appointment

 async function cancelAppointment(req, res) {
    try {
        const {userId, appointmentId} = req.body
        
        const appointmentData = await Appointment.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false,message:'Unauthorized action'})
        }

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



 const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
 })

 //Api to make online payment (razorpay)

 async function razorpayPayment(req, res) {

    try {
        const { appointmentId } = req.body
        const appointmentData = await Appointment.findById(appointmentId)
    
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({success:false, message:' appointment cancelled or invalid '})
        }
        
        // creating options for razorpay payment gateway
    
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }
    
        // creation of an order
    
        const order = await razorpayInstance.orders.create(options)
        res.json({success:true, order })
        
    } catch (error) {
        console.log(error);  
        res.json({success:false,  message: error.message });
    }
 }


 //API to verify razorpay payment 

 async function verifyRazorpay(req, res) {
    try {
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        

        if (orderInfo.status === 'paid') {
            await Appointment.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true, message: 'payment successful '})
        } else {
            res.json({success:false, message: 'payment failed '})
        }
        
    } catch (error) {
        console.log(error);  
        res.json({success:false,  message: error.message });
    }
 }


module.exports = {
    signupUser,
    loginUser,
    getUserProfile,
    updateProfile,
    bookAppointment,
    listUserAppointments,
    cancelAppointment,
    razorpayPayment,
    verifyRazorpay,
}







  // if (userData) {
        //     const passwordMatch = await bcrypt.compare(password,userData.password)
        //     if (passwordMatch) {
        //         const token = jwt.sign(
        //             { userId:userData._id, email:userData.email },process.env.JWT_SECRET,
        //             // 'secret key',
        //             { expiresIn: '1h' }
                    
        //         )
        //         res.status(200).json({success:true, message: 'Login successful...', token });
        //     } else {
        //         res.status(400).json({success:false, message: 'Invalid password...' });
        //     }
        // } else {
        //     res.status(400).json({success:false, message: 'Account does not exist...' });
        // }