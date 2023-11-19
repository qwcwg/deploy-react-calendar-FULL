import { useDateState } from './state';

export const MonthChangeButton = () => {
  const { increaseMonth, decreaseMonth } = useDateState()
  return(
    <div>
      <button onClick={decreaseMonth}>{"<"}</button>
      <button onClick={increaseMonth}>{">"}</button>
    </div>

  )
}