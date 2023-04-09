import Layout from '@/Layout'
import Image from 'next/image';
import arrow from "../icons/arrowCircle.svg";
import line from "../icons/line.svg";
import download from "../icons/download.svg";
import Loading from "../icons/loader.svg";
import { useState } from 'react';
import axios from 'axios';
import Store from '@/store/cart';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";
import { ProgressBar } from '@/components/ProgressBar';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { corousel } from '@/readyPakckages';
import { ST } from 'next/dist/shared/lib/utils';


const InfoForm = observer(() => {
    const router = useRouter()
    const [progress, setProgress] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [videoLink, setVideoLink] = useState(false)
    const TOKEN = "5882906599:AAEAPrWd6JA8uIBzHodgFrJyHlqaeXXZ_cw"
    const CHAT_ID = "-1001968275556"
    const URL_API_MESSAGE = `https://api.telegram.org/bot${TOKEN}/sendMessage`
    const URL_API_DOCUMENT = `https://api.telegram.org/bot${TOKEN}/sendDocument`
    const URL_API_Video = `https://api.telegram.org/bot${TOKEN}/sendVideo`
    // const uploader = createTelegraphUploader();
    
    // const [responseBody, setResponseBody] = useState({second:"",main:""})
    const inputChangeHandler = (event ) => {
        const {name, value} = event.target
        // setResponseBody({...responseBody, [name]: value})
        Store.form ={...Store.form, [name]: value}
        
        console.log(Store.form);
      }


    const handlePhoto = async (event) =>{
        // setUpload(event.target.files[0])
        Store.form = {...Store.form, file: event.target.files[0]}
        console.log(Store.form);
        // const telegraphUrl = await uploadByBuffer(event.target.files[0], 'image/png')
        //   console.log(telegraphUrl);
    }
    const uploadFile = async (result) =>{
        let type = Store.form.file.type==="image/jpeg"?{url:URL_API_DOCUMENT, name:"document"}:{url:URL_API_Video, name:"video"}
        const formData = new FormData();
        formData.append('chat_id',CHAT_ID);
        formData.append(type.name,Store.form.file);
        formData.append('reply_to_message_id',result.message_id);
        formData.append('caption',Store.form.title);

        await axios.post(type.url,formData, {
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
        setSuccess(true);
    }
    const corouselFiles = async (result, item) =>{
        let type = item.file.type==="image/jpeg"?{url:URL_API_DOCUMENT, name:"document"}:{url:URL_API_Video, name:"video"}
        const formData = new FormData();
        formData.append('chat_id',CHAT_ID);
        formData.append(type.name, item.file);
        formData.append('reply_to_message_id',result.message_id);
        formData.append('caption',`Карусель #${item.id}` );

        await axios.post(type.url,formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
              const {loaded, total} = progressEvent;
              let percent = Math.floor( (loaded * 100) / total )
              console.log( `${loaded}kb of ${total}kb | ${percent}%` );
      
              // if( percent < 100 ){
              //   log
                // setProgress(percent)
                Store.corousel.find(cor => cor.id === item.id).progress = percent
              // }
            }

        } )
        setSuccess(true);
    }

    const corouselFireUpload =  (item) =>{
      return new Promise((resolve, reject) =>{
        const imageRef = ref(storage, `images/${item.file.name+v4()}`)
       const uploadFire = uploadBytesResumable(imageRef, item.file)
       uploadFire.on('state_changed', 
       (snapshot) => {
         // Observe state change events such as progress, pause, and resume
         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         Store.corousel.find(cor => cor.id === item.id).progress = progress
         switch (snapshot.state) {
           case 'paused':
             console.log('Upload is paused');
             break;
           case 'running':
             console.log('Upload is running');
             break;
         }
       }, 
       (error) => {
         // Handle unsuccessful uploads
       }, 
       () => {
         // Handle successful uploads on complete
         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
         return getDownloadURL(uploadFire.snapshot.ref).then((downloadURL) =>{
          resolve(downloadURL)
         } );
       }
     );
     })
      
    }

    const fireUpload =  () =>{
      return new Promise((resolve, reject) =>{
        const imageRef = ref(storage, `images/${Store.form.file.name+v4()}`)
       const uploadFire = uploadBytesResumable(imageRef, Store.form.file)
       uploadFire.on('state_changed', 
       (snapshot) => {
         // Observe state change events such as progress, pause, and resume
         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         setProgress(progress)
         switch (snapshot.state) {
           case 'paused':
             console.log('Upload is paused');
             break;
           case 'running':
             console.log('Upload is running');
             break;
         }
       }, 
       (error) => {
         // Handle unsuccessful uploads
       }, 
       () => {
         // Handle successful uploads on complete
         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
         return getDownloadURL(uploadFire.snapshot.ref).then((downloadURL) =>{
          resolve(downloadURL)
         } );
       }
     );
     })
      
    }

    const corouselMap = async (item, result) =>{
      if(!item.file) return
      if(item.file.size>49000000){
       const bigFile = await corouselFireUpload(item)
        let message = ""
            message += `Карусель #${item.id}\n ${bigFile}\n`


         await axios.post(URL_API_MESSAGE, {
            chat_id:CHAT_ID,
            parse_mode:'html',
            reply_to_message_id:result.message_id,
            text:message
        })
      }else{
        await corouselFiles(result,item)
      }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        let bigFile = ""

        if(Store.form.file.size >49000000){
          
          bigFile = await fireUpload()
          console.log(bigFile);
        }
        let message = ""
            message += `<b>Заголовок: ${Store.form.title}</b>\n`
            message += `<b>Текст: ${Store.form.text}</b>\n`
            message += `<b>Ссылка на видео: ${bigFile}</b>\n`
            message += `----------------------------\n`
        Store.checkDb.forEach((item)=>{
            message += `<b>Канал: ${item.name}</b>\n`
            message += `${item.post.qty !==0?`<b>Пост: ${item.post.qty}</b>  `:""}${item.stories.qty !==0?`<b>Сторис: ${item.stories.qty}</b>`:""}\n`
            message += `----------------------------\n`
        })

        const sendTg = await axios.post(URL_API_MESSAGE, {
            chat_id:CHAT_ID,
            parse_mode:'html',
            text:message
        })
        if(sendTg.data.ok){
          console.log("seuccess");
                  Store.form.message_id = sendTg.data.result.message_id
                  if(Store.form.file.size <49000000){
                    await uploadFile(sendTg.data.result)
                    await Promise.all([...Store.corousel.map(item=>corouselMap(item,sendTg.data.result) )])
                  }
                await router.push('/payment')
              }
              setLoading(false)

    }
    const handleCorousel = (e) =>{
      Store.corousel = Store.corousel.map(item=>{
        if(e.target.name === item.id){
          return {...item, file:e.target.files[0]}
        }
        return item
      }) 
    }

console.log(Store.corousel);

  return (
    <Layout>
    <div className="w-full flex justify-center ">
      {/* <Image className="mt-[52px]" src={logo}/> */}
    </div>
    
    <div style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(179, 121, 223, 0.2) 0%, rgba(204, 88, 84, 0.016) 77.08%, rgba(179, 121, 223, 0.2) 100%)",backdropFilter: "blur(40px)"}} 
    className=" pb-5 rounded-[10px] mt-[55px] relative px-[32px] ">
      <div className="relative w-full flex justify-center ">
        <Image className="absolute 0" src={line}/>
        <Image className="absolute -top-7" src={arrow}/>
      </div>
      <p className="text-xl font-extrabold text-white text-center mt-[37px]">Информация</p>
      <form className='text-white flex flex-col gap-5' onSubmit={handleSubmit}>
        <label >
          <p>Заголовок</p>  
            <input onChange={inputChangeHandler} name='title' type="text" style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
            placeholder='Напишите примерный заголовок'
            className='rounded-lg mt-2 border-[.5px] border-stroke w-full h-[59px] px-[13px]'
            />
        </label>
        <label >
          <p>Текст под пост</p>  
            <textarea onChange={inputChangeHandler} name="text" style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
            placeholder='Напишите примерный заголовок'
            className='rounded-lg mt-2 pt-3 border-[.5px] border-stroke w-full h-[59px] px-[13px]'
            />
        </label>
        <label className='text-white' >
          <p>Фотография или видео в формате 16x9 обложка</p>
          <div className='rounded-lg mt-2 pt-3 border-[.5px] flex justify-center items-center flex-col border-stroke w-full px-[13px] h-[157px]' style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }}>
            {!Store.form.file&&<div className='flex flex-col items-center'>
              <Image src={download} alt="download"/>
                <p className='text-stroke'>Загрузите фото или видео</p>
              </div>}
              {Store.form.file&&<p className='tex-white break-all'>{Store.form.file.name}</p>} 
            </div>  
            <input required name='fileInput' type="file" onChange={handlePhoto} style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
            placeholder='Напишите примерный заголовок'
            className='rounded-lg mt-2 pt-3 border-[.5px] border-stroke w-full  px-[13px] hidden'
            />
        </label>
          {progress&&<ProgressBar progressPercentage={progress}/>}
        <p>Фотография или видео в формате 1x1 (карусель)</p>
        <div className='flex gap-4 overflow-x-scroll'>
          {Store.corousel.map(item=>{
            return (
            <label key={item.id} className='text-white py-3' >
              <div className=' rounded-lg mt-2 pt-3 border-[.5px] flex justify-center items-center flex-col border-stroke w-[100px] px-[13px] h-[100px]' style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }}>
                {item.file&&<p className='tex-white break-all'>{item.file.name}</p>} 
                </div> 
                <input  name={item.id} type="file" onChange={handleCorousel} style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
                placeholder='Напишите примерный заголовок'
                className='rounded-lg mt-2 pt-3 border-[.5px] border-stroke w-full  px-[13px] hidden'
                />
                {item.progress&&<ProgressBar progressPercentage={item.progress} height='h-[5px] overflow-hidden mt-[5px]'/>}
            </label>
            )
          })}
        </div>
        <div className='flex justify-center pb-12 pt-5'>
                <button style={{background:"linear-gradient(90.3deg, #9C3FE4 0.16%, #C65647 101.62%)"}} className='w-[314px]  h-[50px] rounded-[5px] text-white flex justify-center items-center gap-2'>Дальше {loading&&<Image width={24} src={Loading} alt='load' />}</button>

            </div>
      </form>
      {/* {success&&<div className='rounded-lg mt-2 pt-3 border-[.5px] text-white text-center bg-green-600 border-stroke w-full h-[59px] px-[13px]'>Успешно отправлен</div>} */}
    </div>
</Layout>
  )
})

export default InfoForm