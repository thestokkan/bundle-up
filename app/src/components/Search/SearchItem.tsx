import React from "react";

import {Item} from "./Search";



const SearchItem=({items,setQuery,setItems}:{items:Array<Item>,
    setQuery:React.Dispatch<React.SetStateAction<string>>,
    setItems:React.Dispatch<React.SetStateAction<Item[]>>})=>{

    const select =(item:Item)=>{

        return ()=>{
            setQuery(item.name)
            setItems([])


        }
    }


    return(
        <div className='wrapper'>
            {items.map(p=>{
                const item=<div className='myInputAddon' onClick={select(p)}>
                    <img src={`svgs/${p.country_code}.svg`} height="24" title={p.country_code}/>
                    <p><b>{p.name}</b> &nbsp;{p.admin1}</p>

                </div>

                return item
            })}

        </div>



    )



}

export default SearchItem