import db from "@/db";
import kgDB from "@/kgDB";
import { action, makeObservable, observable } from "mobx";

class Store {
    choosen=[]
    kgData = kgDB
    ruData = db
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
            minusStoryRu:action
            
        });
    }

    get checkDb(){
        return [...this.kgData, ...this.ruData].filter((item)=>{
            return item.post.qty>0 || item.stories.qty>0
        }  )
    }
    get total(){
        return this.kgData.reduce((prev,cure)=>{
            return prev+((cure.post.price*cure.post.qty)+(cure.stories.price*cure.stories.qty))
        },0)
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