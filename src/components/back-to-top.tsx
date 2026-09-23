"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible,setVisible]=useState(false);

  useEffect(()=>{
    const onScroll=()=>setVisible(window.scrollY>700);
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  return (
    <button
      className={"back-to-top" + (visible ? " visible" : "")}
      onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
      aria-label="חזרה לראש העמוד"
    >
      <ArrowUp size={18}/>
    </button>
  );
}
