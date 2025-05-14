const getTodaysDate = () => {
    const now = new Date(); // get todays date
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60000); // adjust for timezone offset
    return localTime.toISOString().slice(0, 16); // returns "YYYY-MM-DDTHH:mm"
} // formats in the current date

export const initialState = {
    formData: {
        company: "",
        position: "",
        status: "",
        date: getTodaysDate(),
        note: "",
        isArchived: false,
    },
    applications: [],
    isDeleteModalOpen: false,
    deleteTargetId: null,
}

export function applicationReducer(state, action) {
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
                    note: "",
                    isArchive: false     
                }
            }
        case 'SET_ADD_APPLICATIONS':
            const {company, position, status, date, note} = action.data;
            if (!company || !position || !status || !date || !note) {
                alert ("Please fill out all fieldsxxxx")
                return state
            }
            //pag ka add 
            const newApplication = {
                id: Date.now(),
                ...action.data
            }
            return {
                ...state,
                applications: [...state.applications, newApplication]
            }
        case 'LOAD_APPLICATIONS':
            return {
                ...state,
                applications: action.data || [] // loads even without data in it
            }
        case 'OPEN_DELETE_MODAL':
            return {
                    ...state,
                    isDeleteModalOpen: true,
                    deleteTargetId: action.id
                }
        case 'CLOSE_DELETE_MODAL':
            return{
                ...state,
                isDeleteModalOpen: false,
                deleteTargetId: null,
            }
        case 'DELETE_APPLICATION':
            const updatedApplications = state.applications.filter((app) => app._id !== action.id)
            return {
                ...state,
                applications: updatedApplications,
                isDeleteModalOpen: false,
                deleteTargetId: null,
            }
        case 'ARCHIVE_APPLICATION':
            const archiveApplications = state.applications.map((app) => app._id === action.data._id ? { ...app, isArchived: true } : app )
            return {
                ...state,
                applications: archiveApplications
            }
        case 'UNARCHIVE_APPLICATION':
            const unarchiveApplications = state.applications.map((app) => app._id === action.data._id ? { ...app, isArchived: false } : app )
            return {
                ...state,
                applications: unarchiveApplications
            }

        default:
            return state
    }

}

// const getTodaysDate = () => {
//     const now = new Date(); // get todays date
//     const offset = now.getTimezoneOffset();
//     const localDate = new Date(now.getTime() - offset * 60 * 1000)
//     return localDate.toISOString().slice(0, 16)
// }