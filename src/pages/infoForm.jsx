import Layout from '@/Layout'
import Image from 'next/image';
import arrow from "../icons/arrowCircle.svg";
import line from "../icons/line.svg";
import download from "../icons/download.svg";
import { useState } from 'react';
import axios from 'axios';
import Store from '@/store/cart';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";
import { ProgressBar } from '@/components/ProgressBar';


const InfoForm = () => {
    const [progress, setProgress] = useState(0)
    const [upload, setUpload] = useState()
    const [success, setSuccess] = useState(false)
    const [videoLink, setVideoLink] = useState(false)
    const TOKEN = "5882906599:AAEAPrWd6JA8uIBzHodgFrJyHlqaeXXZ_cw"
    const CHAT_ID = "-1001968275556"
    const URL_API_MESSAGE = `https://api.telegram.org/bot${TOKEN}/sendMessage`
    const URL_API_DOCUMENT = `https://api.telegram.org/bot${TOKEN}/sendDocument`
    const URL_API_Video = `https://api.telegram.org/bot${TOKEN}/sendVideo`
    // const uploader = createTelegraphUploader();
    
    const [responseBody, setResponseBody] = useState({second:"",main:""})
    const inputChangeHandler = (event ) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
       
    }


    const handlePhoto = async (event) =>{
        setUpload(event.target.files[0])
        console.log(event.target.files[0]);
        // const telegraphUrl = await uploadByBuffer(event.target.files[0], 'image/png')
        //   console.log(telegraphUrl);
    }
    const uploadFile = async (result) =>{
        let type = upload.type==="image/jpeg"?{url:URL_API_DOCUMENT, name:"document"}:{url:URL_API_Video, name:"video"}
        const formData = new FormData();
        formData.append('chat_id',CHAT_ID);
        formData.append(type.name,upload);
        formData.append('reply_to_message_id',result.message_id);
        formData.append('caption',responseBody.main);

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

  

    const fireUpload =  () =>{
      return new Promise((resolve, reject) =>{
        const imageRef = ref(storage, `images/${upload.name+v4()}`)
       const uploadFire = uploadBytesResumable(imageRef, upload)
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
      
      // const fileUrl = await getDownloadURL(imageRef)
      // console.log(fileUrl);
      // setVideoLink(()=>fileUrl)
      // return fileUrl
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        let bigFile = ""

        if(upload.size >49000000){
          
          bigFile = await fireUpload()
          console.log(bigFile);
        }
        let message = ""
            message += `<b>Заголовок: ${responseBody.main}</b>\n`
            message += `<b>Текст: ${responseBody.second}</b>\n`
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
                  if(upload.size <49000000){
                    await uploadFile(sendTg.data.result)
                  }
              }
        
        // .then((res)=>{
        //     if(res.data.ok){
        //         console.log("seuccess");
        //         if(upload.size <49000000){
        //           uploadFile(res.data.result)
        //         }
        //     }
        // })
        // .catch((e)=>{
        //     setFile({})
        // })
    }



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
            <input onChange={inputChangeHandler} name='main' type="text" style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
            placeholder='Напишите примерный заголовок'
            className='rounded-lg mt-2 border-[.5px] border-stroke w-full h-[59px] px-[13px]'
            />
        </label>
        <label >
          <p>Текст под пост</p>  
            <textarea onChange={inputChangeHandler} name="second" style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
            placeholder='Напишите примерный заголовок'
            className='rounded-lg mt-2 pt-3 border-[.5px] border-stroke w-full h-[59px] px-[13px]'
            />
        </label>
        <label className='text-white' >
          <p>Фотография или видео в формате 16x9 обложка</p>
          <div className='rounded-lg mt-2 pt-3 border-[.5px] flex justify-center items-center flex-col border-stroke w-full px-[13px] h-[157px]' style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }}>
            <Image src={download} alt="download"/>
                <p className='text-stroke'>Загрузите фото или видео</p>
            </div>  
            <input required name='fileInput' type="file" onChange={handlePhoto} style={{background:"radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0447917) 77.08%, rgba(255, 255, 255, 0) 100%)",backgroundBlendMode: "overlay, normal",backdropFilter: "blur(6.07811px)" }} 
            placeholder='Напишите примерный заголовок'
            className='rounded-lg mt-2 pt-3 border-[.5px] border-stroke w-full  px-[13px] hidden'
            />
        </label>
      {progress&&<ProgressBar progressPercentage={progress}/>}
        <div className='flex justify-center pb-12 pt-5'>
                <button style={{background:"linear-gradient(90.3deg, #9C3FE4 0.16%, #C65647 101.62%)"}} className='w-[314px]  h-[50px] rounded-[5px] text-white'>Дальше</button>

            </div>
      </form>
      {/* {success&&<div className='rounded-lg mt-2 pt-3 border-[.5px] text-white text-center bg-green-600 border-stroke w-full h-[59px] px-[13px]'>Успешно отправлен</div>} */}
    </div>
</Layout>
  )
}

export default InfoForm