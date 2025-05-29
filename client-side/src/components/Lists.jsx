import { useEffect, useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { formatDateTimeDisplay } from '../utils/dateFormatter'


export default function Lists() {
    const {state, showSuccess, successMessage, archiveApplication} = useContext(ApplicationContext)
    const { applications } = state

    // const [editId, setEditId] = useState(null);
    // const [editFormData, setEditFormData] = useState({
    //     company: "",
    //     position: "",
    //     date: "",
    //     status: "",
    //     note: ""
    // });


    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleArchive = async (id) => {
        try {
            await archiveApplication(id)
        } catch (error) {
            console.error("Error archiving applications:", error)
        } 
    }

    const handleEditClick = (app) => {
        setEditId(app._id);
        setEditFormData({
            company: app.company,
            position: app.position,
            date: app.date.slice(0, 10), // ISO date format
            status: app.status,
            note: app.note
        });
    };

    //     const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditFormData((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleSaveClick = async (id) => {
    //     try {
    //         await updateApplication(id, editFormData);
    //         setEditId(null); // Exit edit mode
    //     } catch (error) {
    //         console.error("Error updating application:", error);
    //     }
    // };

    // const handleCancelClick = () => {
    //     setEditId(null); // Exit edit mode without saving
    // };


    // const updatedStatusApplication = [
    //     "Applied",
    //     "HR Interview",
    //     "Technical Interview",
    //     "Final Interview",
    //     "Preparing",
    //     "Rejected",
    //     "Hired",
    //     "Waiting"]

    const tableHead = [ "Company Name", "Position", "Date", "Status", "Note", "Action"]
    const allApplications = applications.filter((app) => !app.isArchived)


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Job Applications</h2>
            
                <div className="overflow-y-auto h-100">
                    <table className="w-full">
                        <thead className="bg-green-300 sticky top-0 z-10">
                            <tr>
                                {tableHead.map((head, index) => (
                                    <th key={index} className="px-4 py-2 text-left">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        
                        <tbody>
                            {allApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">No applications found.</td>
                                </tr>
                            ) : (
                                applications
                                    .filter((app) => !app.isArchived)
                                    .reverse()
                                    .map((app, index) => (
                                        <tr key={app._id} className="odd:bg-green-50 odd:hover:bg-green-200 even:bg-green-100 even:hover:bg-green-200">
                                            <td className="px-4 py-2">{index + 1}. {toTitleCase(app.company)}</td>
                                            <td className="px-4 py-2">{toTitleCase(app.position)}</td>
                                            <td className="px-4 py-2">{formatDateTimeDisplay(app.date)}</td>
                                            <td className="px-4 py-2">{app.status}</td>
                                            <td className="px-4 py-2">
                                                <div className="note-content">
                                                    {app.note}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <button className="archivedButton" onClick={() => handleArchive(app._id)}>archive</button>
                                                {/* <button onClick={() => handleEditClick(app)}>edit</button> */}
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                    {showSuccess && (
                        <div className="success-message animate-fade-in-out">
                            {successMessage}
                        </div>
                    )}
                </div>
        </div>
    );
}
