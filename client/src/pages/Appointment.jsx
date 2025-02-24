import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Footer from '../components/Footer'


function Appointment() {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const navigate = useNavigate()

    const [docInfo, setDocInfo] = useState(null)
    const [docSlot, setDocSlot] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        console.log(docInfo);  // Updated line

        setDocInfo(docInfo)
    }


    const getAvailableSlots = async () => {
        setDocSlot([])

        //getting current date

        const today = new Date()

        for (let i = 0; i < 7; i++) {
            //getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            //setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)


            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    //add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }




                //increment time by 30 minutes

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlot(prev => ([...prev, timeSlots]))
        }

    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment')
            return navigate('/login')
        }

        try {
            const date = docSlot[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year

            console.log(slotDate);

            const { data } = await axios.post(backendUrl + '/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]); // Only run when docInfo changes

    useEffect(() => {
        console.log(docSlot);
    }, [docSlot]);


    return docInfo && (
      <>
        <div className='p-10'>
            {/* doctor details */}
            <div className='flex flex-col sm:flex-row gap-6 bg-lightblue rounded-lg shadow-md p-6 sm:p-8'>
                {/* Doctor Image */}
                <div className='w-full sm:w-72 flex-shrink-0'>
                    <img
                        className='w-full h-64 sm:h-80 bg-white object-cover rounded-lg'
                        src={docInfo.image}
                        alt={docInfo.name}
                    />                 </div>
                {/* Doctor Information */}
                <div className='flex-1'>
                    {/* Doctor Name and Credentials */}
                    <p className='text-2xl font-bold text-gray-900'>{docInfo.name}</p>
                    <div className='flex items-center gap-2 text-sm text-gray-600 mt-2'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <span className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full'>
                            {docInfo.experience}  experience
                        </span>
                    </div>

                    {/* Doctor About Section */}
                    <div className='mt-6'>
                        <p className='text-lg font-semibold text-gray-900'>About</p>
                        <p className='text-sm text-gray-600 mt-2'>{docInfo.about}</p>
                    </div>

                    {/* Appointment Fee */}
                    <p className='text-gray-700 font-medium mt-6'>
                        Appointment Fee:{" "}
                        <span className=''>{currencySymbol}{docInfo.fees}</span>
                    </p>
                    {/* Address */}
                    <p className='text-gray-700 font-medium mt-6'>Address: </p>
                    <p className='text-sm text-gray-600 mt-2'>{docInfo.address.line1}
                        <br/>{docInfo.address.line2}
                    </p>
                </div>
            </div>


            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {
                        docSlot.length && docSlot.map((item, index) => (
                            <div onClick={() => setSlotIndex(index)} className={`flex flex-col items-center justify-center min-w-20 p-4 rounded-lg cursor-pointer transition-all duration-200  ${slotIndex === index ? 'bg-blue-300 text-white' : 'border border-gray-200'}`} key={index}>
                                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>

                            </div>

                        ))
                    }
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {
                        docSlot.length && docSlot[slotIndex].map((item, index) => (
                            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-300 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                                {item.time.toLowerCase()}
                            </p>

                        ))
                    }

                </div>

                <button
  onClick={bookAppointment}
  className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-lg my-6 hover:bg-blue-600 transition-colors duration-200'
>
  Book Appointment
</button>



            </div>


            
        </div>
        <Footer />
        </>
        
    )
}

export default Appointment





















//    <div className='p-10'>
//             {/* doctor details */}
//             <div className='flex flex-col sm:flex-row gap-4'>
//                 <div>
//                     <img className='bg-blue-200 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt='' />
//                 </div>

//                 <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-3 sm:m-0 mt-[-80px] sm:mt-0'>
//                     {/* doc info */}
//                     <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//                         {docInfo.name}
//                     </p>
//                     <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//                         <p>{docInfo.degree} - {docInfo.speciality} </p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//                     </div>

//                     {/* doctor About */}
//                     <div className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//                         <p>About</p>
//                         <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//                     </div>
//                     <p className='text-gray-500 font-medium mt-4'>
//                         Appointment Fee :<span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//                     </p>
//                 </div>
//             </div>

//             {/* booking slots */}
//             <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//                 <p>Booking Slots</p>
//                 <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//                     {
//                         docSlot.length && docSlot.map((item, index) => (
//                             <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-300 text-white' : 'border border-gray-200'}`} key={index}>
//                                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                                 <p>{item[0] && item[0].datetime.getDate()}</p>

//                             </div>

//                         ))
//                     }
//                 </div>

//                 <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//                     {
//                         docSlot.length && docSlot[slotIndex].map((item, index) => (
//                             <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-300 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
//                                 {item.time.toLowerCase()}
//                             </p>

//                         ))
//                     }

//                 </div>

//                 <button onClick={bookAppointment} className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Appoinment</button>



//             </div>



// </div>











// <div className='p-6 sm:p-10 bg-gray-50'>
//             {/* Doctor Details Section */}
//             <div className='flex flex-col sm:flex-row gap-6 bg-white rounded-lg shadow-md p-6 sm:p-8'>
//                 {/* Doctor Image */}
//                 <div className='w-full sm:w-72 flex-shrink-0'>
//                     <img
//                         className='w-full h-64 sm:h-80 object-cover rounded-lg'
//                         src={docInfo.image}
//                         alt={docInfo.name}
//                     />
//                 </div>

//                 {/* Doctor Information */}
//                 <div className='flex-1'>
//                     {/* Doctor Name and Credentials */}
//                     <p className='text-2xl font-bold text-gray-900'>{docInfo.name}</p>
//                     <div className='flex items-center gap-2 text-sm text-gray-600 mt-2'>
//                         <p>{docInfo.degree} - {docInfo.speciality}</p>
//                         <span className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full'>
//                             {docInfo.experience} years experience
//                         </span>
//                     </div>

//                     {/* Doctor About Section */}
//                     <div className='mt-6'>
//                         <p className='text-lg font-semibold text-gray-900'>About</p>
//                         <p className='text-sm text-gray-600 mt-2'>{docInfo.about}</p>
//                     </div>

//                     {/* Appointment Fee */}
//                     <p className='text-gray-700 font-medium mt-6'>
//                         Appointment Fee:{" "}
//                         <span className='text-blue-600'>{currencySymbol}{docInfo.fees}</span>
//                     </p>
//                 </div>
//             </div>

//             {/* Booking Slots Section */}
//             <div className='mt-8 bg-white rounded-lg shadow-md p-6 sm:p-8'>
//                 <p className='text-xl font-semibold text-gray-900'>Booking Slots</p>

//                 {/* Date Selection */}
//                 <div className='flex gap-3 overflow-x-auto mt-4 pb-2'>
//                     {docSlot.length > 0 &&
//                         docSlot.map((item, index) => (
//                             <div
//                                 onClick={() => setSlotIndex(index)}
//                                 className={`flex flex-col items-center justify-center min-w-20 p-4 rounded-lg cursor-pointer transition-all duration-200 ${slotIndex === index
//                                         ? "bg-blue-600 text-white"
//                                         : "bg-gray-50 hover:bg-gray-100"
//                                     }`}
//                                 key={index}
//                             >
//                                 <p className='text-sm font-medium'>
//                                     {item[0] && daysOfWeek[item[0].datetime.getDay()]}
//                                 </p>
//                                 <p className='text-lg font-bold'>
//                                     {item[0] && item[0].datetime.getDate()}
//                                 </p>
//                             </div>
//                         ))}
//                 </div>

//                 {/* Time Selection */}
//                 <div className='flex gap-3 overflow-x-auto mt-6 pb-2'>
//                     {docSlot.length > 0 &&
//                         docSlot[slotIndex].map((item, index) => (
//                             <p
//                                 onClick={() => setSlotTime(item.time)}
//                                 className={`text-sm px-5 py-2 rounded-full cursor-pointer transition-all duration-200 ${item.time === slotTime
//                                         ? "bg-blue-600 text-white"
//                                         : "bg-gray-50 hover:bg-gray-100 text-gray-700"
//                                     }`}
//                                 key={index}
//                             >
//                                 {item.time.toLowerCase()}
//                             </p>
//                         ))}
//                 </div>

//                 {/* Book Appointment Button */}
//                 <button
//                     onClick={bookAppointment}
//                     className='w-full sm:w-auto bg-blue-500 text-white text-sm font-medium px-8 py-3 rounded-full mt-8 hover:bg-blue-600 transition-all duration-200'
//                 >
//                     Book Appointment
//                 </button>
//             </div>
//         </div>
