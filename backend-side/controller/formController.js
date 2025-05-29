import Form from "../models/Form.js"

const getAllApplication = async (req, res) => {
    try {
        const allApplications = await Form.find({})
        res.status(200).json(allApplications)
    } catch (error) {
        console.error('Error fetching all application',error)
        res.status(500).json({
            message: 'Error retrieving applications',
            error: error.message
        })
    }
}

const inputApplication = async (req, res) => {
    const {company, position, status, date, note} = req.body
    try {
        const newForm = new Form({
            company,
            position,
            status,
            date,
            note
        })
        const savedForm = await newForm.save();
        res.status(201).json(savedForm)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error in adding an application'
        })
        
    }
}

// delete application permanently
const deleteApplication = async (req, res) => {
    try {
        const application = await Form.findByIdAndDelete(req.params.id);

        if (!application) {
            return res.status(404).send('Application not found');
        }

        res.send('Application deleted permanently');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the application');
    }
}

// archiving like soft deletion
const archiveApplication = async (req, res) => {
    try {
        const application = await Form.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true })
        res.status(200).json(application)
    } catch (error) {
        console.error('Error archiving application:', error)
        res.status(500).send('Failed to archive')
    }
}

//unarchive 
const unarchiveApplication = async (req, res) => {
    try {
        const application = await Form.findByIdAndUpdate(req.params.id, { isArchived: false }, { new: true })
        res.status(200).json(application)
    } catch (error) {
        console.error('Error unarchiving application', error)
        res.status(500).send('Failed to unarchive')
    }
}

const editApplication = async (req, res) => {
    try {
        const application = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) {
            return res.status(404).send('Application not found');
        }
        res.status(200).json(application);

    } catch (error) {
        console.error('Error editing application', error)
        res.status(500).send('Failed to edit')
        
    }
}
export {getAllApplication, inputApplication, deleteApplication, archiveApplication, unarchiveApplication, editApplication}

// {new: true } -  return the updated document instead of the new one