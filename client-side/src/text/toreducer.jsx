import Status from '../components/Status';
import './Input.css'

import { useEffect, useReducer, useState} from "react"

const getTodaysDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]
}

const initialState = {
    formData: {
        company: "",
        position: "",
        status: "",
        date: getTodaysDate(),
        note: "",
    },
    applications: []
}


function applicationReducer(state, action) {
    switch (action.type) {
        case 'SET_INPUT_FIELD':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value
                }
            }
        case 'RESET_FORM':
            return {
                ...state,
                formData: {
                    company: "",
                    position: "",
                    status: "",
                    date: getTodaysDate(),
                    note: ""
                }
            }
        case 'SET_ADD_APPLICATIONS':
            const {company, position, status, date, note} = state.formData;

            if (!company || !position || !status || !date || !note) {
                alert ("Please fill out all fields")
                return state
            }
            
            //pag ka add 

            const newApplication = {
                id: Date.now(),
                ...state.formData
            }

            return {
                ...state,
                applications: [...state.applications, newApplication]
            }
        default:
            return state
    }

}

export default function Input() {
    const [state, dispatch] = useReducer(applicationReducer, initialState )
    const [showSuccess, setShowSuccess] = useState(false)

    const handleInputChange = (field, value) => {
        dispatch({type: 'SET_INPUT_FIELD', field, value })
    }

    const handleAddApplication = () => {
        dispatch({type: 'SET_ADD_APPLICATIONS'})
        dispatch({type: 'RESET_FORM'})

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    }
    


    const statusOptions = [
        "Applied",
        "HR Interview",
        "Technical Interview",
        "Final Interview",
        "Preparing",
        "Reject"
    ]


    return (
        <>
            <div className="flex w-full h-full gap-5" >
                <div className='flex w-1/3 justify-start shadow-md'>
                    <Status applications={state.applications} />
                </div>
                <div className='flex w-full h-full '>
                    <form className="formContainer " onSubmit={(e) => e.preventDefault()}  >
                        <label className="text-[10px]"> Company Name</label>
                        <input type="text" placeholder="Company Name" value={state.formData.company} onChange={(e) => handleInputChange("company", e.target.value)} />
                        <input type="text" placeholder="Position" value={state.formData.position} onChange={(e) => handleInputChange("position", e.target.value)} />
                        <input type="date" value={state.formData.date} onChange={(e) => handleInputChange("date", e.target.value)} />

                        <select value={state.formData.status} onChange={(e) => handleInputChange("status", e.target.value)} className='border border-black mb-4 p-1 round-lg'>
                            <option hidden>Status</option>
                            {statusOptions.map((status) => (
                                <option key={status} value={status}> {status} </option>
                            ))}
                        </select>

                        <textarea placeholder="Note" value={state.formData.note} onChange={(e) => handleInputChange("note", e.target.value)} />
                        <button type="button" onClick={handleAddApplication} className={`bg-green-100 hover:bg-green-200`}>
                            Add Application
                            {
                                showSuccess && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 animate-fade-in-out mt-2">
                                        ✅ New application added successfully!
                                    </div>
                                )
                            }
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}