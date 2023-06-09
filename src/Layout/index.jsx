import Image from "next/image"
import objects from "../icons/Objects.png";
const Layout = ({children}) => {
  return (
    <div className='bg-background min-h-screen w-full relative pb-8  '>
          <div className="fixed right-0 top-0"> <Image src={objects} alt="object"/></div>
          <div style={{background:"radial-gradient(50% 50% at 50% 50%, #B379DF 0%, rgba(54, 0, 96, 0) 100%)", }} 
              className="fixed -left-1/2 -top-[220px] w-[397px] h-[397px] opacity-50">
          </div>
            <div className="md:w-[480px] mx-auto">
                  {children}
            </div>
          </div>
  )
}

export default Layout
          