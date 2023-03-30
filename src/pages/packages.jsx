import Layout from '@/Layout'
import Image from 'next/image';
import lineMd from "../icons/line-md.svg";
import db from "../db";

// interface IMenu {
//     name:string,
//     followers: string,
//     followers_number: number,
//     img: string,
//     service: any[]
// }

const Packages = () => {
    console.log(db);
  return (
    <Layout>
        <div className='pt-[63px]'>
            <h1 className='font-extrabold text-white  text-xl text-center mb-[39px]'>Русскоязычные паблики <br /> инстаграм</h1>
            <div className='flex justify-around  absolute top-36 left-0  w-full'>
                    <div style={{background:"linear-gradient(180deg, #6110B2 0%, #9445D3 100%)"}} 
                    className="w-[93px] h-[93px] rounded-full"></div>
                    <div className="w-[93px] h-[93px] rounded-full" style={{background:"linear-gradient(180deg, #6110B2 0%, #9445D3 100%)"}}></div>
                </div>
            <div style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(179, 121, 223, 0.2) 0%, rgba(204, 88, 84, 0.016) 77.08%, rgba(179, 121, 223, 0.2) 100%)",backdropFilter: "blur(40px)"}} 
          className="h-full rounded-[10px] mt-[69px] relative px-[32px]">
            <div className='relative'>
            
            </div>
                
                <div className='flex gap-[17px] -top-7 relative z-10 w-full'>
                    <button className='bg-purple text-white text-xs w-full h-[55px] justify-center rounded-[5px] flex items-center '>Выберите из списка</button>
                    <button className='bg-purple text-white text-xs w-full h-[55px] justify-center rounded-[5px] flex items-center'>Готовые пакеты</button>
                </div>
                <h1 className='text-[32px] font-extrabold mt-[35px] text-white text-center'>Мега Хайп</h1>
          </div>
            
        </div>
        
    </Layout>
  )
}

export default Packages