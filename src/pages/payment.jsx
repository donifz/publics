import Layout from '@/Layout'
import Image from 'next/image';
import arrow from "../icons/arrowCircle.svg";
import line from "../icons/line.svg";
import { payments } from '@/readyPakckages';
import lineMd from "../icons/line-md.svg";
import download from "../icons/download.svg";
import Store from "../store/cart";
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import axios from 'axios';
import dynamic from "next/dynamic";
import { toBase64 } from '@/utils';
import successIcon from "../icons/success.svg";
import { useRouter } from 'next/router';
// import DateTimePicker from 'react-datetime-picker';
const DateTimePicker = dynamic(
    () => import('../components/DatePciker/DatePciker'),
    { ssr: false }
)

const TOKEN = "5882906599:AAEAPrWd6JA8uIBzHodgFrJyHlqaeXXZ_cw"
const CHAT_ID = "-1001968275556"
const URL_API_MESSAGE = `https://api.telegram.org/bot${TOKEN}/sendMessage`
const URL_API_DOCUMENT = `https://api.telegram.org/bot${TOKEN}/sendDocument`
const URL_API_Video = `https://api.telegram.org/bot${TOKEN}/sendVideo`

const Payment = observer(() => {
    const [check, setCheck] = useState()
    const [progress, setProgress] = useState(null)
    const [defaultTime, setDefaultTime] = useState(false)
    const [time, setTime] = useState(new Date())
    const [preview, setPreview] = useState(null)

    const router = useRouter()

    const handlePhoto = async (event) =>{
        setCheck(event.target.files[0])
        setPreview( await toBase64(event.target.files[0]))
    }
    
    useEffect(()=>{
      if(Store.total === 0){
        router.push("/instaPublics")
      }
    },[Store.total])
    const uploadCheck = async()=>{
      if(Store.total === 0) return
        const date = `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()} ${time.getHours()}:${(""+time.getMinutes()).length ===1?"0"+time.getMinutes():time.getMinutes()}`
        // let type = check.file.type==="image/jpeg"?{url:URL_API_DOCUMENT, name:"document"}:{url:URL_API_Video, name:"video"}
        const formData = new FormData();
        formData.append('chat_id',CHAT_ID);
        formData.append("document",check);
        formData.append('reply_to_message_id',Store.form.message_id);
        formData.append('caption',`Заголовок: ${Store.form.title} \nВремя: ${!defaultTime?"30 минут":date} \nИтого: ${Store.total} сом`);

        await axios.post(URL_API_DOCUMENT,formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
              const {loaded, total} = progressEvent;
              let percent = Math.floor( (loaded * 100) / total )
              console.log( `${loaded}kb of ${total}kb | ${percent}%` );
      
              // if( percent < 100 ){
              //   log
                setProgress(percent)
              // }
            }

        } )
        router.push('/success')
        
        // setSuccess(true);
    }

  return (
    <Layout>
    <div className="w-full flex justify-center ">
      {/* <Image className="mt-[52px]" src={logo}/> */}
    </div>
    
    <div style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(179, 121, 223, 0.2) 0%, rgba(204, 88, 84, 0.016) 77.08%, rgba(179, 121, 223, 0.2) 100%)",backdropFilter: "blur(40px)"}} 
    className=" pb-5 rounded-[10px] mt-[55px] relative px-[32px] ">
      <div className="relative w-full flex justify-center ">
        <Image className="absolute 0" src={line} alt='line'/>
        <Image className="absolute -top-7" src={arrow} alt='arrow'/>
      </div>
      <p className="text-xl font-extrabold text-white text-center my-[37px]">Время и дата запуска</p>
      {defaultTime&&<DateTimePicker time={time} setTime={setTime}/>}
      {!defaultTime&&<div>
        <p className='text-center text-white'>Срочный запуск</p>
        <p className=' text-center font-black text-red-700'>20-30 минут</p>
      </div>}
        {!defaultTime?<p onClick={()=> setDefaultTime(true)} className='text-center text-xs mt-3 text-gray-400'>Выбрать время</p>:<p onClick={()=> setDefaultTime(false)} className='text-center text-xs mt-3 text-gray-400'>Срочный запуск</p>}
      <div className='flex flex-col text-white items-center mt-5'>
      <Image className=" flex justify-center w-full mb-2" src={lineMd} alt='line-md'/>
        <p className='font-extrabold'>Способ оплаты</p>
      <ul className=' flex flex-col gap-2 items-start  mt-2'>
            {payments.map(item=>{
                return (

                    <li key={item.name} className='flex items-center gap-2'><Image src={item.img} width={24} height={24} alt={item.name}/> <p className='text-sm'>{item.transaction}</p></li>
                )

                
            })}
        </ul>
      </div>
      <label className='flex justify-center my-4'>
      <div className='rounded-lg mt-2  relative z-10 overflow-hidden border-[.5px] flex justify-center items-center flex-col border-stroke w-[200px] px-[13px] h-[77px]' style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }}>
                   { !preview&& <div className='flex flex-col items-center'> <Image src={download} alt="download" width={36}/>
                    <p className='text-stroke text-sm'>Загрузите чек</p></div>}
                {preview&&<div className='text-white text-center'><Image src={successIcon} width={40} alt='check'/> Чек</div> }
                </div>
                <input  name='fileInput' type="file" onChange={handlePhoto} style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
            placeholder='Напишите примерный заголовок'
            className='rounded-lg mt-2 pt-3 border-[.5px] border-stroke w-full  px-[13px] hidden'
            />
      </label>
        {progress&&<ProgressBar progressPercentage={progress}/>}
      <div className='w-full h-[62px] border-[0.5px] border-white rounded-[5px] flex flex-col text-white justify-center text-center mt-3.5'>
                        <p>Счет на оплату</p>
                        <p>{Store.total} сом</p>
      </div>
      
    </div>
    <div className='flex justify-center pb-12 pt-5'>
                <button onClick={uploadCheck} style={{background:"linear-gradient(90.3deg, #9C3FE4 0.16%, #C65647 101.62%)"}} className='w-[314px]  h-[50px] rounded-[5px] text-white'>Дальше</button>

            </div>
</Layout>
  )
})

export default Payment