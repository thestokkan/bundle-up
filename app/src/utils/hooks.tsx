import React, {useEffect, useState} from "react";
import {Item} from "../components/Search/Search";

export function useOutsideAlerter(ref:React.MutableRefObject<HTMLElement | null>,callback:()=>void) {
    useEffect(() => {
        /**
         * do something if clicked on outside of element
         */
        function handleClickOutside(event:MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
                
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


export const useDebounceValue=(value:string, time=100)=>{
    const [debouceValue, setDebounceValue]=useState(value)
    useEffect(()=>{
        const timeout=setTimeout(()=>{
            setDebounceValue(value)
        },time)

        return ()=>{
            clearTimeout(timeout)
        }

    },[value,time])
    return debouceValue
}