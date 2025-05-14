import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { ACTION_TYPES } from "../action-types/actionTypes";
import { formatDateTimeDisplay } from '../utils/dateFormatter'

export default function Archive() {
    const { state, dispatch, showSuccess, successMessage, deleteApplicationToDb, unarchiveApplication} = useContext(ApplicationContext)
    const { applications, deleteTargetId } = state

    // handles the input data and switch the first letter into capital
    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleDelete = (id) => {
        dispatch({ type: ACTION_TYPES.OPEN_DELETE_MODAL, id })
    }   

    const handleConfirmDelete = () => {
        try {
            deleteApplicationToDb(deleteTargetId)
            handleCloseModal()
        } catch (error) {
            console.error('Error in deleting application', error)
        }
    }

    const handleCloseModal = () => {
        dispatch({ type: ACTION_TYPES.CLOSE_DELETE_MODAL })
    }

    const handleUnarchive = async (id) => {
        try {
            await unarchiveApplication(id)
        } catch (error) {
            console.error('Error unarchiving application:', error)
        }
    }

    const tableHead = [
        "Company Name",
        "Position",
        "Date",
        "Status",
        "Note",
        "Action"
    ]

    const archivedApplications = applications.filter((app) => app.isArchived)

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Archived Applications</h2>
                <div className="overflow-y-auto h-100" >
                    <table className="w-full overflow-y-auto">
                        <thead className="bg-green-300 sticky top-0 z-10">
                            <tr>
                                {tableHead.map((head, index) => (
                                    <th key={index} className="px-4 py-2 text-left">{head}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {(!archivedApplications || archivedApplications.length === 0) ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">No archived applications yet.</td>
                                    </tr>
                                ) : (
                            archivedApplications
                            .filter((app) => app.isArchived)
                            .reverse()
                            .map((app, index) => (
                                <tr key={app._id} className="odd:bg-green-50 odd:hover:bg-green-200 even:bg-green-100 even:hover:bg-green-200">
                                    <td className="px-4 py-2">{index+1}. {toTitleCase(app.company)}</td>
                                    <td className="px-4 py-2">{toTitleCase(app.position)}</td>
                                    <td className="px-4 py-2">{formatDateTimeDisplay(app.date)}</td>
                                    <td className="px-4 py-2">{app.status}</td>
                                    <td className="px-4 py-2">
                                        <div className="note-content">
                                            {app.note}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="deleteButton" onClick={() => handleDelete(app._id)}>delete</button>
                                        <button className="unarchivedButton" onClick={() => handleUnarchive(app._id)}>unarchive</button>
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

                    {state.isDeleteModalOpen && (
                        <div className="modal-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}> 
                            <div className="modal-box">
                                <p className="modal-message">Are you sure you want to delete this application?</p>
                                <div className="modal-actions">
                                    <button onClick={handleConfirmDelete} className="btn-danger">
                                        Yes, Delete
                                    </button>
                                    <button onClick={handleCloseModal} className="btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
}
