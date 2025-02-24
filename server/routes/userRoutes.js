const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const upload = require('../middlewares/uploadImage');


userRouter.post('/signup',userController.signupUser);

userRouter.post('/login',userController.loginUser);

userRouter.get('/get-profile',userAuth ,userController.getUserProfile);

userRouter.post('/update-profile',upload.single('image'),userAuth,userController.updateProfile)


userRouter.post('/book-appointment',userAuth,userController.bookAppointment)

userRouter.get('/appointments',userAuth,userController.listUserAppointments)

userRouter.post('/cancel-appointment',userAuth,userController.cancelAppointment)

userRouter.post('/razorpay-payment',userAuth,userController.razorpayPayment);

userRouter.post('/verifyRazorpay',userAuth,userController.verifyRazorpay);

module.exports = userRouter;