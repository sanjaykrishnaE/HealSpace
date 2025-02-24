const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../middlewares/uploadImage');
const authAdmin = require('../middlewares/adminAuth');
const doctorController = require('../controllers/doctorController')

adminRouter.post('/add-doctor',upload.single('image'),adminController.addDoctor);

adminRouter.post('/login',adminController.loginAdmin);

adminRouter.post('/all-doctors',adminController.allDoctors);

adminRouter.post('/change-availability',doctorController.changeAvailability);

adminRouter.get('/appointments',authAdmin,adminController.appointmentsAdmin);

adminRouter.post('/cancel-appointment',authAdmin,adminController.appointmentCancellation);

adminRouter.get('/dashboard',authAdmin,adminController.adminDashboard);

module.exports = adminRouter;