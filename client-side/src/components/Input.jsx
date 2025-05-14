import Status from './Status';
import { ACTION_TYPES } from '../action-types/actionTypes';
import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';


export default function Input() {

    const {state, dispatch, showSuccess, successMessage, addApplicationToDb} = useContext(ApplicationContext)
    const { applications, formData } = state

    const handleInputChange = (field, value) => {
        dispatch({type: ACTION_TYPES.SET_INPUT_FIELD, field, value })
    }

    const handleAddApplication = () => {
        const prevLength = applications.length;

        if (applications.length === prevLength){
            addApplicationToDb (formData)
        }
    }


    const statusOptions = [ // options in form
        "Applied",
        "HR Interview",
        "Technical Interview",
        "Final Interview",
        "Preparing",
        "Rejected",
        "Hired",
        "Waiting"
    ]


    return (
        <>
            <div className="flex w-full h-full gap-5" >
                <div className='flex w-1/3 justify-start shadow-md'>
                    <Status applications={applications}  />
                </div>
                <div className='flex w-full h-full '>
                    <form className="formContainer " onSubmit={(e) => e.preventDefault()}  >
                        <label className="text-[10px]"> Company Name</label>
                        <input type="text" placeholder="Company Name" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} />
                        <input type="text" placeholder="Position" value={formData.position} onChange={(e) => handleInputChange("position", e.target.value)} />

                        <input type="datetime-local" value={state.formData.date} onChange={(e) => handleInputChange("date", e.target.value)} />

                        <select value={formData.status} onChange={(e) => handleInputChange("status", e.target.value)} className='border border-black mb-4 p-1 round-lg'>
                            <option hidden>Status</option>

                            {statusOptions.map((status) => (
                                <option key={status} value={status}> {status} </option>
                            ))}
                        </select>

                        <textarea placeholder="Note" value={formData.note} onChange={(e) => handleInputChange("note", e.target.value)} />
                        <button type="button" onClick={handleAddApplication} className={`bg-green-100 hover:bg-green-200`}>
                            Add Application
                        </button>
                        {
                            showSuccess && (
                                <div className="success-message animate-fade-in-out">
                                    {successMessage}
                                </div>
                            )}
                    </form>
                </div>
            </div>

        </>
    )
}