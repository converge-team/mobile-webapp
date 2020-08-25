
function parseDate(d) {
    let date = new Date(d);
    let currentDate = new Date();
    let prefix = '', sub = '';
    const dayDiff = 86400000

    let dateArray = date.toString().split(' ');

    let dateDiff = currentDate - date;
    
    if(dateDiff < dayDiff) {
        if(currentDate.getDate() - date.getDate() === 1) {
            prefix = 'yesterday at';
        } else {
            prefix = 'today at'
        }
    } else if(dateDiff >= dayDiff  && dateDiff < (dayDiff * 2)) {
        prefix = 'yesterday at'
    } else if(dateDiff >= (dayDiff * 2) && dateDiff < (dayDiff * 7)) {

        prefix = dateArray[0] + ' at'
        sub = `${dateArray[1]} ${dateArray[2]} ${dateArray[3]}` 
    } else if (dateDiff >= (dayDiff * 7)){

        prefix = dateArray[1] + ' ' + dateArray[2] + ' at';
        sub = `${dateArray[3]}`
    }

    const time = dateArray[4].substring(0, dateArray[4].lastIndexOf(':'));
    return ({
        prefixTime: `${prefix} ${time}`,
        minusTime: `${prefix.substring(0, prefix.lastIndexOf('a'))} ${sub ? sub : ''}`,
        hour: `${time}`
    })
}

export default parseDate;