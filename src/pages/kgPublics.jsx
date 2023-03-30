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

const KgPublics = () => {
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
                <menu className='mt-42px flex flex-col gap-3.5'>
                    {db.map(item=>{
                        return (
                            <label key={item.name}  className="flex flex-col">
                            <div className='flex gap-3'>
                                {/* <input type="checkbox" name="" id="" /> */}
                                <div className='flex gap-4 items-center'>
                                    <Image src={item.img} width="103" height="103" className='min-w-[103px] max-h-[103px]' alt={item.name}/>
                                    <div className='flex flex-col'>
                                        <p className='text-white font-bold text-xl'>{item.name}</p>
                                        <p className='text-white font-normal text-[15px]'>{item.followers}</p>
                                        {item?.service?.map(serv=>{
                                            return (<p className='text-white font-normal text-[15px]' key={serv}>{serv}</p>)
                                        })}
                                    </div>
                                </div>
                            </div>
                                <Image className="mt-[25px] flex justify-center w-full" src={lineMd} alt="line"/>
                            </label>
                        )
                    })}
                </menu>
          </div>
            
        </div>
        
    </Layout>
  )
}

export default KgPublics