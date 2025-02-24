const express = require('express');
const doctorRouter = express.Router();
const doctorController = require('../controllers/doctorController');
const doctorAuth = require('../middlewares/doctorAuth')

doctorRouter.get('/list', doctorController.doctorsList);

doctorRouter.post('/login',doctorController.docLogin);

doctorRouter.get('/appointments',doctorAuth,doctorController.appointmentsDoctor);

doctorRouter.post('/complete-appointment',doctorAuth,doctorController.appointmentCompleted);

doctorRouter.post('/cancel-appointment',doctorAuth,doctorController.appointmentCancelled);

doctorRouter.get('/dashboard',doctorAuth,doctorController.doctorDashboard);

doctorRouter.get('/profile',doctorAuth,doctorController.doctorProfile);

doctorRouter.post('/update-profile',doctorAuth,doctorController.updateProfile);

module.exports = doctorRouter;
