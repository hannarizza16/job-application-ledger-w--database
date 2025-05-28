import { useReducer, createContext, useEffect, useState } from "react"
import { applicationReducer, initialState } from "../reducers/applicationReducer"
import { ACTION_TYPES } from "../action-types/actionTypes"
import axios from 'axios'

export const ApplicationContext = createContext()

export function ApplicationProvider({ children }) {
    const [state, dispatch] = useReducer(applicationReducer, initialState)
    const [successMessage, setSuccessMessage] = useState('')

    const [showSuccess, setShowSuccess] = useState(false)

// to fetch data from the backend api when component first mounts
useEffect(() => {
    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:8000/input/all')
            console.log("Fetched applications:", response.data); //Check this

            dispatch({
                type: ACTION_TYPES.LOAD_APPLICATIONS,
                data: response.data
            })
            
        } catch (error) {
            console.error("Error fetching applications from database", error)
        }
    }
    fetchApplications();
}, [])

    const addApplicationToDb = async (formData) => {
        try {
            const response = await axios.post('http://localhost:8000/input/create', formData)
            dispatch({
                type: ACTION_TYPES.SET_ADD_APPLICATIONS,
                data: response.data
            })

            dispatch({type: ACTION_TYPES.RESET_FORM})
            setSuccessMessage("✅ New application added successfully!")
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1000);
        } catch (error) {
            console.error("Error adding application to database", error)
        }
    }

    const archiveApplication = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/input/archive/${id}`);

            dispatch({
                type: ACTION_TYPES.ARCHIVE_APPLICATION,
                data: response.data,
            });

            setSuccessMessage("Archived application successfully!");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1000);
        } catch (error) {
            console.error("Error archiving applications: ", error);
        }
    };

    const unarchiveApplication = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/input/unarchive/${id}`)
            dispatch({
                type: ACTION_TYPES.UNARCHIVE_APPLICATION,
                data: response.data
            })
        setSuccessMessage("Unarchived application successfully!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);
        } catch (error) {
            console.error("Error archiving applications: ", error)
        }
    }

    const deleteApplicationToDb = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/input/${id}`)
            dispatch({
                type: ACTION_TYPES.DELETE_APPLICATION,
                data: id
            })
            
        } catch (error) {
            console.error('Error deleting application from database', error)
            
        }
    }


    return (
        <ApplicationContext.Provider 
        value={{ 
            state, 
            dispatch, 
            showSuccess, 
            setShowSuccess, 
            addApplicationToDb, 
            deleteApplicationToDb,
            archiveApplication,
            unarchiveApplication,
            successMessage
            }}>

            {children}
        </ApplicationContext.Provider>
    )
}