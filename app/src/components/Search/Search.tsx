import React, { useRef } from 'react'

import {useEffect,useState} from "react";
import "./Search.css"
import {useDebouceValue,useOutsideAlerter} from "../../utils/hooks";
import {SearchItem} from "./index";


const fetchItems=async(search:string,setItem:React.Dispatch<React.SetStateAction<Item[]>>)=>{
    const res=await fetch(search)
    const data=await res.json()

    if(data.results){

        const newItems=data.results.slice(0,3).map((d:any)=>{
            return {id:d.id,name:d.name, country_code:d.country_code, admin1:d.admin1} as Item
        })
        setItem(newItems)

    }else{
        setItem([])

    }

};

export type Item={id:number,name:string,country_code?:string,admin1?:string}








const Search= ()=>{

    const [items, setItems] =useState<Item[]>([])
    const [query, setQuery]=useState("")
    const debouceQuery=useDebouceValue(query)
    const divRef =useRef(null)
    useOutsideAlerter(divRef,setItems)

    const keyEnter=(e :React.KeyboardEvent)=>{

        if(e.key=="Enter"){
            if(items.length>=1){
                setQuery(items[0].name)
                setItems([])

            }

        }

    }



  

    useEffect(()=>{

        fetchItems(`https://geocoding-api.open-meteo.com/v1/search?name=${debouceQuery}`,setItems)

    },[debouceQuery])


    return(
        <div className="wrapper" ref={divRef}>

        <input className="myInput" value={query}
               onChange={(e)=>setQuery(e.target.value)}
               onKeyDown={keyEnter}
               placeholder={"Location"}
        />
        <SearchItem items={items} setItems={setItems} setQuery={setQuery}/>
    </div>

    )

}



export default Search