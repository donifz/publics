import Layout from '@/Layout'
import Image from 'next/image'
import { useRouter } from 'next/router';
import activeBtn from "../icons/activeBtn.png";
import {megaAsman} from "../readyPakckages";
import lineMd from "../icons/line-md.svg";
import graf from "../icons/graf.png";

const KgReadyPackage = () => {
    const router = useRouter()
  return (
    <Layout>
        <div className='pt-[63px] relative'>
            <h1 className='font-extrabold text-white  text-xl text-center mb-[39px]'>Кыргызскоязычные паблики <br /> инстаграм</h1>
            <div className='flex justify-around  absolute top-36 left-0  w-full'>
                    <div style={{background:"linear-gradient(180deg, #6110B2 0%, #9445D3 100%)"}} 
                    className="w-[93px] h-[93px] rounded-full"></div>
                    <div className="w-[93px] h-[93px] rounded-full" style={{background:"linear-gradient(180deg, #6110B2 0%, #9445D3 100%)"}}></div>
                </div>
            <div style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(179, 121, 223, 0.2) 0%, rgba(204, 88, 84, 0.016) 77.08%, rgba(179, 121, 223, 0.2) 100%)",backdropFilter: "blur(40px)"}} 
          className="h-full rounded-[10px] mt-[69px] relative px-[13px]">
            <div className='relative'>
            
            </div>
                
                <div className='flex gap-[17px] -top-7 relative z-10 w-full'>
                    <button className='bg-purple text-white text-xs w-full h-[55px] justify-center rounded-[5px] flex items-center relative' onClick={()=>router.push('/kgPublics')}>Выберите из списка 
                       
                    </button>
                    <button className='bg-purple text-white text-xs w-full h-[55px] justify-center rounded-[5px] flex items-center relative' >Готовые пакеты
                    {router.pathname === "/kgReadyPackage" &&<Image className='absolute right-[45%] -bottom-4' src={activeBtn}/>}
                    </button>
                    

                </div>
                <h1 className='font-extrabold text-white text-[35px] text-center'>{megaAsman.name}</h1>
                    <Image className="mt-[33px] mb-[49px] flex justify-center w-full" src={lineMd}/>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex gap-[57px]'>
                            <div className='w-[123px] h-[60px] pt-3 bg-[#D9D9D9] rounded-[5px] relative text-center flex justify-center'>
                                <p className='w-[81px] h-[19px] border-[#D9D9D9] border rounded-[5px] absolute -top-2 bg-[#1F171C] text-white text-[12px] font-medium text-center flex items-center justify-center'>Охват</p>
                                <p className='font-semibold'>{megaAsman.followers}</p> 
                            </div>
                            <div className='w-[123px] h-[60px] pt-3 bg-[#D9D9D9] rounded-[5px] relative text-center flex justify-center'>
                                <p className='w-[81px] h-[19px] border-[#D9D9D9] border rounded-[5px] absolute -top-2 bg-[#1F171C] text-white text-[12px] font-medium text-center flex items-center justify-center'>Количество</p>
                                <p className='font-semibold'>{megaAsman.publics}</p> 
                            </div>
                        </div>
                        <div className='h-[49px] -m-1 w-[181px] border-r-2 border-l-2 border-b-2 rounded-[5px]'></div>
                        <p className='text-center text-white text-[15px] mt-2'>Стоимость</p>
                        <p className='text-center text-white text-[20px] '>{megaAsman.price}</p>
                    </div>
                    <div className='flex justify-center pb-12 pt-5'>
                <button style={{background:"linear-gradient(90.3deg, #9C3FE4 0.16%, #C65647 101.62%)"}} className='w-[314px]  h-[50px] rounded-[5px] text-white'>Выбрать</button>

            </div>
          </div>
         
          
        </div>
        
    </Layout>
  )
}

export default KgReadyPackage