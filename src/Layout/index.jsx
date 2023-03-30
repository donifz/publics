import Image from "next/image"
import objects from "../icons/Objects.png";
const Layout = ({children}) => {
  return (
    <div className='bg-background min-h-screen w-full relative pb-8  '>
          <div className="absolute right-0 top-0"> <Image src={objects} alt="object"/></div>
          <div style={{background:"radial-gradient(50% 50% at 50% 50%, #B379DF 0%, rgba(54, 0, 96, 0) 100%)", }} 
              className="absolute -left-1/2 -top-[220px] w-[397px] h-[397px] opacity-50">
          </div>
                {children}
          </div>
  )
}

export default Layout
          