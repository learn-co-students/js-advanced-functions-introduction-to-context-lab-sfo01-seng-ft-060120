// Your code here

const createEmployeeRecord = (arr) => {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [ ],
        timeOutEvents: [ ]
    }
    return record
}

const createEmployeeRecords = (arr) => {
    return arr.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employee, date) => {
    // let dateObj = new Date(date)
    // console.log(dateObj)

    let dateSplit = date.split(' ')

    // let timeIn = new TimeIn(dateSplit[0], dateSplit[1])

    let TimeIn = {
        date: dateSplit[0],
        hour: parseInt(dateSplit[1])
    }

    employee.timeInEvents.push(TimeIn)

    console.log(employee.timeInEvents)

    console.log(employee.timeInEvents[0].type)


    return employee.timeInEvents
}

// class TimeIn {
//     constructor(date, hour) {
//       this.date = date;
//       this.hour = hour;
//     }
// }