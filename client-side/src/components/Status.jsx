export default function Status({applications}) {


    const activeApplications = applications 
    ? applications.filter(app => !app.isArchived) : [] // default = false

    const statusCounts = activeApplications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {});

    const statuses = [
        "Applied",
        "HR Interview",
        "Technical Interview",
        "Final Interview",
        "Preparing",
        "Rejected",
        "Hired",
        "Waiting",
    ];

    // enum: ['Applied', 'HR Interview', 'Technical Interview','Final Interview', 'Preparing', 'Rejected',  'Hired', ]

    return(
        <>
        <div className="w-full h-full bg-white flex flex-col">
            <div className="flex justify-center ">
                <p>Status</p>
            </div>
            <div className="p-5 ">
                {statuses.map((status) => (
                    <div key={status}>
                        {statusCounts[status] || 0} {status}
                        {/* checks if that specific status is meron, if wla 0 */}
                    </div>
                ))}
            
            </div>
        </div>
        
        </>
    )
}