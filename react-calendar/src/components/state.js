import { create } from 'zustand'
const date = new Date()
const yearNum = date.getFullYear()
const monthNum = date.getMonth() + 1
const dayNum = date.getDate()
const fullDateString = `${yearNum}-${monthNum}-${dayNum}`

const todayYearNum = date.getFullYear() // for today date(should not be change)
const todayMonthNum = date.getMonth() + 1
const todayDateNum = date.getDate()
const todayDateString =`${todayYearNum}-${todayMonthNum}-${todayDateNum}`

export const toTwoDigit = (month) => {
  month = month.toString()
  if (month.toString().length == 1) {
    month = `0${month}`
  }
  return month
}
const monthIncrease = (monthNumber) => {
  if (1 <= monthNumber <= 12) {
    monthNumber += 1
  } 
  if (monthNumber === 13) {  // if month is 12, month increase to 1
    monthNumber = 1 
  } 
  return monthNumber
}
const monthDecrease = (monthNumber) => {
  if (1 < monthNumber <= 12) {
    monthNumber -= 1
  } 
  if (monthNumber === 0) {  // if month is 1, month decrease to 12
    monthNumber = 12
  } 
  return monthNumber
}
const yearIncrease = (monthNumber, yearNumber) => {
  // if (1 <= monthNumber <= 12) {

  // } 
  if (monthNumber === 12) {  // if month is 12, year increase too
    yearNumber += 1
  } 
  return yearNumber
}
const yearDecrease = (monthNumber, yearNumber) => {
  // if (1 < monthNumber <= 12) {

  // } 
  if (monthNumber === 1) {  // if month is 1, year decrease too
    yearNumber -= 1
  } 
  return yearNumber
}

export const useDateState = create((set) => {
  return {
    dateObject: fullDateString,
    yearNum: yearNum,
    monthNum: monthNum,
    twoDigitMonth: toTwoDigit(monthNum),
    twoDigitBeforeMonth: toTwoDigit(monthNum - 1),
    twoDigitAfterMonth: toTwoDigit(monthNum + 1),
    increaseMonth: () => set((state) => ({monthNum: monthIncrease(state.monthNum), yearNum: yearIncrease(state.monthNum, state.yearNum), twoDigitMonth: toTwoDigit(monthIncrease(state.monthNum)) })),   
    decreaseMonth: () => set((state) => ({monthNum: monthDecrease(state.monthNum), yearNum: yearDecrease(state.monthNum, state.yearNum), twoDigitMonth: toTwoDigit(monthDecrease(state.monthNum)) })),

  }
})



// export const useDateState = create((set) => {
//   return {
//     dateObject: fullDateString,
//     yearNum: yearNum,
//     monthNum: monthNum,
//     increaseMonth: () => set((state) => ({monthNum: state.monthNum + 1})),   
//     decreaseMonth: () => set((state) => ({monthNum: state.monthNum - 1})),

//   }
// })

// const monthIncrease = (monthNumber, yearNumber) => {
//   if (1 <= monthNumber < 12) {
//     monthNumber = monthNumber + 1
//   } else if (monthNumber == 12) {  // if month is 12, year increase too
//     monthNumber = 1 
//     yearNumber = yearNumber + 1
//   } 
//   return [monthNumber, yearNumber]
// }
// const monthDecrease = (monthNumber, yearNumber) => {
//   if (1 < monthNumber <= 12) {
//     monthNumber = monthNumber - 1
//   } else if (monthNumber == 1) {  // if month is 1, year decrease too
//     monthNumber = 12
//     yearNumber = yearNumber - 1
//   } 
//   return [monthNumber, yearNumber]
// }
// const [increasedMonth, increasedYear] = monthIncrease(monthNum, yearNum)
// const [decreasedMonth, decreasedYear] = monthDecrease(monthNum, yearNum)