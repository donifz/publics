import Layout from "@/Layout";
import Image from "next/image";
import searchImg from "../icons/search.svg";
import down from "../icons/arrow.svg";
import activeBtn from "../icons/activeBtn.png";
import db from "../db";
import Store from "@/store/cart";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

// interface IMenu {
//     name:string,
//     followers: string,
//     followers_number: number,
//     img: string,
//     service: any[]
// }

const RuPublics = observer(() => {
  const router = useRouter();
  return (
    <Layout>
      <button
        onClick={() => router.push("/")}
        className=" text-white text-xs h-[30px] mb-2 justify-center rounded-[5px] flex items-center relative px-4"
      >
        Назад
        {/* {router.pathname === "/ruPublics" &&<Image className='absolute right-[45%] -bottom-4' src={activeBtn} />} */}
      </button>
      <div className="pt-[63px] md:w-[480px] mx-auto relative">
        {/* <h1 className='font-extrabold text-white  text-xl text-center mb-[39px] z-10 relative'>INSTAGRAM ПАБЛИКИ</h1> */}
        <div className="flex justify-around lg:justify-center lg:gap-36 top-10 left-0 w-full z-0 fixed">
          {/* <div style={{background:"linear-gradient(180deg, #6110B2 0%, #9445D3 100%)"}} 
                    className="w-[93px] h-[93px] rounded-full"></div> */}
          <div
            className="w-[247px] h-[247px] rounded-full"
            style={{ background: "linear-gradient(180deg, #6110B2 0%, #9445D3 100%)" }}
          ></div>
        </div>
        <div
          style={{
            background:
              "radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(179, 121, 223, 0.2) 0%, rgba(204, 88, 84, 0.016) 77.08%, rgba(179, 121, 223, 0.2) 100%)",
          }}
          className="h-full rounded-[10px] mt-[69px] relative px-[13px] backdrop-blur-2xl"
        >
          <div className="relative"></div>

          <div className="flex gap-[17px] -top-7 relative z-10 w-full">
            <button className="bg-purple text-white text-xs w-full h-[55px] justify-center rounded-[5px] flex items-center relative">
              Выберите из списка
            </button>
            {/* <button className='bg-purple text-white text-xs w-full h-[55px] justify-center rounded-[5px] flex items-center relative' >Готовые пакеты
                    {router.pathname === "/ruPackages" &&<Image className='absolute right-[45%] -bottom-4' src={activeBtn}/>}
                    </button> */}
          </div>

          <div className="relative w-full min-h-full mb-[22px]">
            <input
              type="text"
              placeholder="Поиск"
              onChange={(e) => {
                Store.searchRu = e.target.value;
              }}
              value={Store.searchRu}
              className="border-[.5px]  border-stroke rounded-[5px] h-[49px] w-full bg-transparent pr-[40px] pl-2 text-white"
            />
            <Image src={searchImg} alt="search" className="absolute right-3 top-2.5 " />
          </div>
          <div className="flex justify-center items-center gap-1 text-white mb-[21px]">
            <p>Фильтр:</p>
            <div className="group relative px-[19px] py-[6px] flex flex-col gap-1 items-center border-[.5px] border-stroke rounded-[5px]">
              <div className="flex">
                <p className="flex items-center">Количество подписчиков</p>
                <Image src={down} alt="down" className=" flex items-end pt-2" />
              </div>
              <div className="group-hover:block hidden w-[250px] absolute -bottom-[90px] rounded-[5px] text-[15px]  px-5 py-2.5 bg-[#181416] text-white">
                <p onClick={() => Store.moreSubscribersActionRu("subs")}>Количество подписчиков</p>
                <p onClick={() => Store.moreSubscribersActionRu("more")}>Цена по возрастанию</p>
                <p onClick={() => Store.moreSubscribersActionRu("less")}>Цена по убыванию</p>
              </div>
            </div>
          </div>
          <menu className="mt-42px flex flex-col gap-3.5">
            {Store.searchedRu.map((item) => {
              return (
                <label key={item.name} className="flex flex-col border-[.5px] border-stroke rounded-[16px] px-3 py-3">
                  <div className="flex gap-3">
                    {/* <input type="checkbox" name="" id="" /> */}
                    <div className="flex gap-4 items-center">
                      <Image
                        src={item.img}
                        width="103"
                        height="103"
                        className="min-w-[103px] max-h-[103px]"
                        alt={item.name}
                      />
                      <div className="flex flex-col">
                        <p className="text-white font-bold text-xl">{item.name}</p>
                        <p className="text-white font-normal text-[15px]">{item.followers}</p>
                        {/* {item?.service?.map(serv=>{
                                            return (<p className='text-white font-normal text-[15px]' key={serv}>{serv}</p>)
                                        })} */}
                        <div className="flex gap-2.5 mt-2 flex-wrap">
                          <div>
                            <div className="pl-3 pt-2 flex border-[.5px] border-stroke  rounded-[5px]">
                              <div>
                                <p className="text-white text-[15px] font-normal">{item.post.name}</p>
                                <p className="text-white text-[15px] font-normal">{item.post.price}с</p>
                              </div>
                              <div className="rounded-full w-[25px] h-[25px] border-[.5px] border-stroke  text-white text-sm flex justify-center items-center mx-[5px]">
                                {item.post.qty}
                              </div>
                            </div>
                            <div className="flex justify-around mt-2">
                              <button
                                className="rounded-full w-[25px] h-[25px] border-[.5px] border-stroke  text-white text-sm flex justify-center items-center "
                                onClick={() => Store.addPostRu(item.name)}
                              >
                                +
                              </button>
                              <button
                                className="rounded-full w-[25px] h-[25px] border-[.5px] border-stroke  text-white text-sm flex justify-center items-center "
                                onClick={() => Store.minusPostRu(item.name)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="pl-3 pt-2 flex border-[.5px] border-stroke  rounded-[5px]">
                              <div>
                                <p className="text-white text-[15px] font-normal">{item.stories.name}</p>
                                <p className="text-white text-[15px] font-normal">{item.stories.price}с</p>
                              </div>
                              <div className="rounded-full w-[25px] h-[25px] border-[.5px] border-stroke  text-white text-sm flex justify-center items-center mx-[5px]">
                                {item.stories.qty}
                              </div>
                            </div>
                            <div className="flex justify-around mt-2">
                              <button
                                className="rounded-full w-[25px] h-[25px] border-[.5px] border-stroke text-white text-sm flex justify-center items-center "
                                onClick={() => Store.addStoryRu(item.name)}
                              >
                                +
                              </button>
                              <button
                                className="rounded-full w-[25px] h-[25px] border-[.5px] border-stroke  text-white text-sm flex justify-center items-center "
                                onClick={() => Store.minusStoryRu(item.name)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Image className="mt-[25px] flex justify-center w-full" src={lineMd} alt="line"/> */}
                </label>
              );
            })}
          </menu>
        </div>
        <div className="flex justify-center pb-24 pt-5">
          {/* <button style={{background:"linear-gradient(90.3deg, #9C3FE4 0.16%, #C65647 101.62%)"}} className='w-[314px]  h-[50px] rounded-[5px] text-white' 
                onClick={()=>{
                    if(Store.total === 0){
                        return
                    }
                    router.push('/infoForm')
                }}>Дальше</button> */}
        </div>
        <div className="w-full flex flex-col justify-center fixed bottom-3 md:w-[480px]">
          <div className="flex flex-col items-center justify-center pb-4 pt-5">
            <div
              style={{ background: "linear-gradient(180deg, #334764 0%, #1A1518 100%)" }}
              className="w-[314px] h-[50px] border-[.5px] border-stroke  rounded-[5px] text-white flex gap-4 items-center justify-center"
            >
              <p>Итог:</p>
              <p className="text-[25px] ">{Store.total}</p>
            </div>
            <button
              style={{ background: "linear-gradient(90.3deg, #9C3FE4 0.16%, #C65647 101.62%)" }}
              className="w-[314px] mt-2 h-[50px] rounded-[5px] text-white"
              onClick={() => {
                if (Store.total === 0) {
                  return;
                }
                router.push("/infoForm");
              }}
            >
              Дальше
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default RuPublics;
