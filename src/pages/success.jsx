import Layout from '@/Layout'
import Image from 'next/image';
import arrow from "../icons/arrowCircle.svg";
import success from "../icons/success.svg";
import line from "../icons/line.svg";
import { observer } from 'mobx-react-lite';


const InfoForm = observer(() => {



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
      <h1 className="text-3xl font-extrabold text-white text-center mt-[37px]">Поздравляем</h1>
      <div className='flex justify-center'>
        <Image src={success} alt="success" width={120}/>

      </div>
      {/* {success&&<div className='rounded-lg mt-2 pt-3 border-[.5px] text-white text-center bg-green-600 border-stroke w-full h-[59px] px-[13px]'>Успешно отправлен</div>} */}
    </div>
</Layout>
  )
})

export default InfoForm