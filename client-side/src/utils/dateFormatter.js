export const formatDateTimeDisplay = (datetimeString) => {
    const date = new Date(datetimeString);

    const options = {
        month: 'short',    // "May"
        day: '2-digit',    // "05"
        year: 'numeric',   // "2025"
        hour: 'numeric',   // "10"
        minute: '2-digit', // "00"
        hour12: true       // "PM"
    };

    return date.toLocaleString('en-US', options).replace(',', ''); // remove comma
};
