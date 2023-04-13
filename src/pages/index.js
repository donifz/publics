import Image from "next/image";
import objects from "../icons/Objects.png";
import logo from "../icons/logo_mike.svg";
import arrow from "../icons/arrowCircle.svg";
import line from "../icons/line.svg";
import lineMd from "../icons/line-md.svg";
import Link from "next/link";
import Layout from "@/Layout";

const menu = [
  {id:1,
  text:"INSTAGRAM ПАБЛИКИ",
  href:"/instaPublics",
  status:"active"
  },
  {id:2,
  text:"Инфлюенсеры",
  href:"/inluence",
  status:"soon"
  },
  {id:3,
  text:"СМИ",
  href:"/Smi",
  status:"soon"
  },
]

export default function Home() {
  return (
      <Layout>
          <div className="w-full flex justify-center ">
            <Image className="mt-[52px]" src={logo}/>
          </div>
          <p className=" text-white font-semibold text-[40px] text-center mt-[32px]">
          О вас узнают МИЛЛИОНЫ
          </p>
          <div style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(179, 121, 223, 0.2) 0%, rgba(204, 88, 84, 0.016) 77.08%, rgba(179, 121, 223, 0.2) 100%)",backdropFilter: "blur(40px)"}} 
          className="h-[540px] rounded-[10px] mt-[55px] relative px-[32px] ">
            <div className="relative w-full flex justify-center ">
              <Image className="absolute 0" src={line}/>
              <Image className="absolute -top-7" src={arrow}/>
            </div>
            <p className="text-xl font-extrabold text-white text-center mt-[37px]">Выберите платформу</p>
            <p className="font-normal text-[10px] text-white text-center">(можно выбрать несколько)</p>
            <Image className="mt-[33px] mb-[49px] flex justify-center w-full" src={lineMd}/>
            <menu className="w-full flex flex-col gap-5">
            {
              menu.map(item=>{
                return (
                    <li className="w-full h-[62px] border-[0.5px] border-white rounded-[5px] flex pl-[32px] " key={item.key}>
                      <Link className="w-full h-full text-xl font-normal text-white flex items-center" href={item.href}>{item.text}</Link>
                    </li>
                )
              })
            }
            </menu>
            <Image className="my-[49px] flex justify-center w-full" src={lineMd}/>
          </div>
      </Layout>
  )
}
