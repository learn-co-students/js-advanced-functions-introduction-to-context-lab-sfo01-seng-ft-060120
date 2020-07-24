const createEmployeeRecord = (employeeArray) => {
    const employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1], 
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = (employeesArray) => {
    let createEmployeesArray = employeesArray.map(
        employee => createEmployeeRecord(employee)
    )
    return createEmployeesArray
}

const createTimeInEvent = (employee, dateStamp) => {
    let splitDateStamp = dateStamp.split(' ')
    employee.timeInEvents[employee.timeInEvents.length] = {
        type: "TimeIn",
        date: splitDateStamp[0],
        hour: parseInt(splitDateStamp[1])
    }
    return employee
}

const createTimeOutEvent = (employee, dateStamp) => {
    let splitDateStamp = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: splitDateStamp[0],
        hour: parseInt(splitDateStamp[1])
    })
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    let inHour = employee.timeInEvents.find(function(event) {
        return event.date === date
    })
    let outHour = employee.timeOutEvents.find(function(event) {
        return event.date === date
    })
    return (outHour.hour - inHour.hour) / 100
}

const wagesEarnedOnDate = (employee, date) => {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    let payOwed = parseInt(hoursWorked) * parseInt(employee.payPerHour)
    return payOwed
}

const allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map(event => event.date)
    let wages = dates.map(date => wagesEarnedOnDate(employee, date))
    let totalPay = wages.reduce(function(a, b) {
        return a + b
    })
    return totalPay
}

const findEmployeeByFirstName = (employeesArray, firstName) => {
    let matchingEmployee = employeesArray.find(function(employee) {
        return employee.firstName === firstName
    })
    return matchingEmployee
}

const calculatePayroll = (employeesArray) => {
    let wages = employeesArray.map(employee => allWagesFor(employee))
    let totalPay = wages.reduce(function(a, b) {
        return a + b
    })
    return totalPay
}