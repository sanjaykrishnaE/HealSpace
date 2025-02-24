import { createContext } from "react";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = 'Rs. '

  

    const calculateAge =  (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0]+ " " +  months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const value = {
        calculateAge,
        slotDateFormat,
        currency,
        
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider






















  // const calculateAge = (dob) => {
    //     const today = new Date();
    //     const birthDate = new Date(dob);
      
    //     // Check if the date of birth is valid
    //     if (isNaN(birthDate.getTime())) {
    //       return 'Invalid Date'; // Return a fallback value if the date is invalid
    //     }
      
    //     let age = today.getFullYear() - birthDate.getFullYear();
      
    //     // Check if the birthday has occurred this year
    //     const monthDifference = today.getMonth() - birthDate.getMonth();
    //     const dayDifference = today.getDate() - birthDate.getDate();
      
    //     if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    //       age--; // Subtract 1 from age if the birthday hasn't occurred yet this year
    //     }
      
    //     return age;
    //   };