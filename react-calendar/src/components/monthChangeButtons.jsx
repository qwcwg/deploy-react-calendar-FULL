import { useDateState } from './state';

export const MonthChangeButton = () => {
  const { increaseMonth, decreaseMonth } = useDateState()
  return(
    <div>
      <button className='month-change-button' onClick={decreaseMonth}>{"  <  "}</button>
      <button className='month-change-button' onClick={increaseMonth}>{"  >  "}</button>
    </div>

  )
}