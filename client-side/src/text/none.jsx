import Status from '../components/Status';
import './Input.css'

import { useEffect, useState, useReducer } from "react"


export default function Input() {

    const getTodaysDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]
    }

    const [formData, setFormData] = useState(
        { company: "", position: "", status: "", date: getTodaysDate(), note: "" }
    )

    const [applications, setApplications] = useState([]); // where i store the inputted data from formData
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {  // saving applications to storage
        try {
            if (applications.length > 0) {
                localStorage.setItem("applications", JSON.stringify(applications))
            }

        } catch (error) {
            console.error("Error saving applications to storage.")
        }

    }, [applications])

    useEffect(() => {
        try {
            const savedApplications = localStorage.getItem("applications")
            if (savedApplications !== "undefined" && "null") {
                setApplications(JSON.parse(savedApplications))
            }
        } catch (error) {
            console.error("Error loading applications from local storage")

        }
    }, [])

    useEffect(() => {
        if (applications.length > 0) {
            localStorage.setItem("applications", JSON.stringify(applications));
        }
    }, [applications]);


    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleAddApplication = () => {

        if (!formData.company || !formData.position || !formData.status || !formData.date || !formData.note) {
            alert("Please fill out all fields");
            return;
        }

        const newApplication = {
            id: Date.now(),
            ...formData
        }

        setApplications(prevApplications => [...prevApplications, newApplication]);

        setFormData(
            { company: "", position: "", status: "", date: getTodaysDate(), note: "" }
        );

        setShowSuccess(true)

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000); // 3000ms = 3 seconds
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
                    <Status applications={applications} />
                </div>
                <div className='flex w-full h-full '>
                    <form className="formContainer " onSubmit={(e) => e.preventDefault()}  >
                        <label className="text-[10px]"> Company Name</label>
                        <input type="text" placeholder="Company Name" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} />
                        <input type="text" placeholder="Position" value={formData.position} onChange={(e) => handleInputChange("position", e.target.value)} />
                        <input type="date" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} />

                        <select value={formData.status} onChange={(e) => handleInputChange("status", e.target.value)} className='border border-black mb-4 p-1 round-lg'>
                            <option hidden>Status</option>
                            {statusOptions.map((status) => (
                                <option key={status} value={status}> {status} </option>
                            ))}
                        </select>

                        <textarea placeholder="Note" value={formData.note} onChange={(e) => handleInputChange("note", e.target.value)} />
                        <button type="button" onClick={handleAddApplication} className={`bg-green-100 hover:bg-green-200`}>
                            Add Application
                            {showSuccess && (
                            <div className="success-message animate-fade-in-out">
                                ✅ New application added successfully!
                            </div>
                        )}
                        </button>
                    </form>
                </div>
            </div>
            

        </>
    )
}