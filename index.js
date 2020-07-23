// Your code here
const createEmployeeRecord = (array) => {
    return Object.assign({}, {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    })
}

const createEmployeeRecords = (array) => {
    const arrayOfEmployees = []
    for (const employee of array) {
        arrayOfEmployees.push(createEmployeeRecord(employee))
    }
    return arrayOfEmployees
}

const createTimeInEvent = (employee, date) => {
    let dateSplit = date.split(' ')
    let timeIn = Object.assign({}, {
        type: 'TimeIn',
        hour: parseInt(dateSplit[1], 10),
        date: dateSplit[0]
    })
    employee.timeInEvents.push(timeIn)
    return employee
}

const createTimeOutEvent = (employee, date) => {
    let dateSplit = date.split(' ')
    let timeOut = Object.assign({}, {
        type: 'TimeOut',
        hour: parseInt(dateSplit[1], 10),
        date: dateSplit[0]
    })
    employee.timeOutEvents.push(timeOut)
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find( e => e.date === date)
    let timeOut = employee.timeOutEvents.find( e => e.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (employee, date) => {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
} 

const allWagesFor = (employee) => {
    let dates = []
    employee.timeInEvents.map( event => dates.push(event.date) )
    let totalWages = 0
    dates.map( date => totalWages += wagesEarnedOnDate(employee, date))
    return totalWages
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    for (let employee of srcArray) {
        if (employee.firstName === firstName) {
            return employee
        }
    }
}

const calculatePayroll = (records) => {
    let totalWages = 0
    for (let employee of records) {
        totalWages += allWagesFor(employee)
    }
    return totalWages
}