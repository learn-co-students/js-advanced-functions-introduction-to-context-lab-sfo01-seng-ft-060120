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

    let dateSplit = date.split(' ')
    let timeIn = {
        type: "TimeIn",
        date: dateSplit[0],
        hour: parseInt(dateSplit[1])
    }
    employee.timeInEvents.push(timeIn)

    return employee
}

const createTimeOutEvent = (employee, date) => {
    let dateSplit = date.split(' ')
    let timeOut = {
        type: "TimeOut",
        date: dateSplit[0],
        hour: parseInt(dateSplit[1])
    }
    employee.timeOutEvents.push(timeOut)

    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    
    let timeIn = employee.timeInEvents.find(event => event.date === date).hour
    let timeOut = employee.timeOutEvents.find(event => event.date === date).hour

    if (timeIn && timeOut) {
        return (timeOut - timeIn) / 100
    }
    else {
        return null
    }
    
}

const wagesEarnedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find(event => event.date === date).hour
    let timeOut = employee.timeOutEvents.find(event => event.date === date).hour

    let hoursWorked = (timeOut - timeIn) / 100
    return hoursWorked * employee.payPerHour
}

const allWagesFor = (employee) => {
    let totalWages = employee.timeInEvents.reduce(function(total, event){
        let dayWage = wagesEarnedOnDate(employee, event.date)
        return dayWage + total
    }, 0)
    return totalWages
}

const calculatePayroll = (employees) => {
    let payrollTotal = employees.reduce(function(total, employee){
        return allWagesFor(employee) + total
    }, 0)
    return payrollTotal
}

const findEmployeeByFirstName = (employees, name) => {
    return employees.find(employee => {
        employee.firstName === name
        return employee
    })
}