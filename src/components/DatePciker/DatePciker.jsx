import DateTimePicker from 'react-datetime-picker';
const DatePciker = ({setTime,time}) => {
  return (<div className={` border-[0.5px] rounded-lg`} style={{background:" radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)"}}>
      <DateTimePicker className={`px-2 border-transparent h-[59px] w-full [&>__wrapper]:border-none`} style={{borderColor:"transparent"}} onChange={setTime} value={time} />
  </div>
  )
}

export default DatePciker