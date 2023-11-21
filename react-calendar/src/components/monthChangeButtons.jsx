import { useDateState } from './state';

export const MonthChangeButton = () => {
  const { increaseMonth, decreaseMonth } = useDateState()
  return(
    <div>
      <button className='month-change-button btn' onClick={decreaseMonth}>{"  <  "}</button>
      <button className='month-change-button btn' onClick={increaseMonth}>{"  >  "}</button>
    </div>

  )
}