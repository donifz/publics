import db from "@/db";
import kgDB from "@/kgDB";
import { action, makeObservable, observable } from "mobx";

class Store {
    choosen=[]
    kgData = kgDB
    ruData = db
    searchKg = ""
    searchRu = ""
    package = null
    form = {
        tel:"",
        title: "",
        text:"",
        file:null,
        message_id:""    
    }
    corousel = [
        {
            id:"1",
            file:null,
            progress:null
        },
        {
            id:"2",
            file:null,
            progress:null
        },
        {
            id:"3",
            file:null,
            progress:null
        },
        {
            id:"4",
            file:null,
            progress:null
        },
        {
            id:"5",
            file:null,
            progress:null
        },
    ]
    constructor() {
        makeObservable(this, {
            choosen:observable,
            kgData:observable,
            ruData:observable,
            addPost:action,
            minusPost:action,
            addStory:action,
            minusStory:action,
            addPostRu:action,
            minusPostRu:action,
            addStoryRu:action,
            minusStoryRu:action,
            searchKg:observable,
            searchRu:observable,
            moreSubscribersAction:action,
            corousel:observable,
            form:observable,
        });
    }

    get checkDb(){
        return [...this.kgData, ...this.ruData].filter((item)=>{
            return item.post.qty>0 || item.stories.qty>0
        }  )
    }
    get total(){
        return [...this.kgData, ...this.ruData].reduce((prev,cure)=>{
            return prev+((cure.post.price*cure.post.qty)+(cure.stories.price*cure.stories.qty))
        },0)
    }
    get searchedKg (){
        return this.kgData.filter((item)=>{
            return item.name.toLowerCase().includes(this.searchKg.toLowerCase())
        })||[]
    }
    get searchedRu (){
        return this.ruData.filter((item)=>{
            return item.name.toLowerCase().includes(this.searchRu.toLowerCase())
        })||[]
    }
    get moreSubscribers (){
        return this.kgData.sort((a,b) =>{
            if (a.followersNumber < b.followersNumber) {
                return 1;
              }
              if (a.followersNumber > b.followersNumber) {
                return -1;
              }
              // a должно быть равным b
              return 0;
        })
        
    }
    get moreSubscribers (){
        return this.kgData.sort((a,b) =>{
            return b.followersNumber - a.followersNumber
        })
        
    }
    get lessSubscribers (){
        return this.kgData.sort((a,b) =>{
            return b.followersNumber - a.followersNumber
        })
        
    }
    get morePriceRu (){
        return this.searchedRu.sort((a,b) =>{
            if ((a.post.price+a.stories.price) < (b.post.price+b.stories.price)) {
                return 1;
              }
              if ((b.post.price+b.stories.price) < (a.post.price+a.stories.price)){
                return -1;
              }
              // a должно быть равным b
              return 0;
        })
        
    }
    get lessPriceRu (){
        return this.searchedRu.sort((a,b) =>{
            if ((a.post.price+a.stories.price) < (b.post.price+b.stories.price)) {
                return -1;
              }
              if ((b.post.price+b.stories.price) < (a.post.price+a.stories.price)){
                return 1;
              }
              // a должно быть равным b
              return 0;
        })
        
    }
   
    get subscribersMoreRu (){
        return this.searchedRu.sort((a,b) =>{
            if (a.followersNumber < b.followersNumber) {
                return 1;
              }
              if (a.followersNumber > b.followersNumber) {
                return -1;
              }
              // a должно быть равным b
              return 0;
        })
        
    }
    resetPublics(){
        this.ruData =  this.searchedRu.map(item=>{
            return {...item, post:{...item.post, qty: 0}, stories:{...item.stories, qty: 0}}
        } )
    }

    moreSubscribersAction(type){
        if(type === "less"){
            this.kgData = this.lessSubscribers
        }else{
            this.kgData = this.moreSubscribers

        }
    }
    moreSubscribersActionRu(type){
        if(type === "subs"){
            this.ruData = this.subscribersMoreRu
            return
        }
        if(type === "more"){
            this.ruData = this.morePriceRu
            return
        }
        if(type === "less"){
            this.ruData = this.lessPriceRu
            return

        }
    }
    
    searchRu(name){
        this.ruData =  this.kgData.filter((item)=>{
            return item.name == name
        })
        
    }
    addPost(name){
        console.log(this.checkDb);
        const found = this.kgData.map((item)=> {
            if(item.name === name){
                return {...item, post: {...item.post, qty: item.post.qty+1}}
            }
            return item
        })
       this.kgData = found
    }
    minusPost(name){
        const found = this.kgData.map((item)=> {
            if(item.name === name){
                if(item.post.qty<1){
                    return item
                }
                return {...item, post: {...item.post, qty: item.post.qty-1}}
            }
            return item
        })
       this.kgData = found
    }
    addStory(name){
        const found = this.kgData.map((item)=> {
            if(item.name === name){
                return {...item, stories: {...item.stories, qty: item.stories.qty+1}}
            }
            return item
        })
       this.kgData = found
    }
    minusStory(name){
        const found = this.kgData.map((item)=> {
            if(item.name === name){
                if(item.stories.qty<1){
                    return item
                }
                return {...item, stories: {...item.stories, qty: item.stories.qty-1}}
            }
            return item
        })
       this.kgData = found
    }
    
    //------------------------ruPublics-----------
    get totalRu(){
        return this.ruData.reduce((prev,cure)=>{
            return prev+((cure.post.price*cure.post.qty)+(cure.stories.price*cure.stories.qty))
        },0)
    }
    addPostRu(name){
        const found = this.ruData.map((item)=> {
            if(item.name === name){
                return {...item, post: {...item.post, qty: item.post.qty+1}}
            }
            return item
        })
       this.ruData = found
    }
    minusPostRu(name){
        const found = this.ruData.map((item)=> {
            if(item.name === name){
                if(item.post.qty<1){
                    return item
                }
                return {...item, post: {...item.post, qty: item.post.qty-1}}
            }
            return item
        })
       this.ruData = found
    }
    addStoryRu(name){
        const found = this.ruData.map((item)=> {
            if(item.name === name){
                return {...item, stories: {...item.stories, qty: item.stories.qty+1}}
            }
            return item
        })
       this.ruData = found
    }
    minusStoryRu(name){
        const found = this.ruData.map((item)=> {
            if(item.name === name){
                if(item.stories.qty<1){
                    return item
                }
                return {...item, stories: {...item.stories, qty: item.stories.qty-1}}
            }
            return item
        })
       this.ruData = found
    }


}

export default new Store;