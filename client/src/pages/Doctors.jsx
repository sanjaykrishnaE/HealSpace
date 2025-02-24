import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Footer from '../components/Footer'

function Doctors() {
    const { speciality } = useParams()

    const [filterDoc, setFilterDoc] = useState([])

    const [showFilter, setShowFilter] = useState(false)

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        console.log('Current speciality:', speciality);
        applyFilter()
    }, [doctors, speciality])


    return (
        <>

            <div className='pl-10 pr-10 pt-10'>
                <p className='text-gray-600'>Browse through specialist</p>
                <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                    <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-400 text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
                    <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                        <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
                        <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
                        <p onClick={() => speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Cardiologist" ? "bg-indigo-100 text-black" : ""}`}>Cardiologist</p>
                        <p onClick={() => speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""}`}>Pediatrician</p>
                        <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
                        <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
                    </div>
                    <div className='w-full grid grid-cols-auto gap-4 gap-y-6 ' >
                        {
                            filterDoc.map((item, index) => (
                                <div
                                    onClick={() => navigate(`/doctors/appointment/${item._id}`)}
                                    className='border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2'
                                    key={index}
                                >
                                    <img className='w-full h-60 object-cover bg-blue-50' src={item.image} alt={item.name} />
                                    <div className='p-4 '>
                                        <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                                            <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            <span>{item.available ? 'Available' : 'Unavailable'}</span>
                                        </div>
                                        <h2 className='text-xl font-semibold text-gray-900 mt-2'>{item.name}</h2>
                                        <p className='text-gray-600 text-sm mt-1'>{item.speciality}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Doctors