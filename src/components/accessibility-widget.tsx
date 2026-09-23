"use client";
import { Accessibility, Eye, Link2, RotateCcw, Text, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

type A11yState = { large:boolean; contrast:boolean; links:boolean; motion:boolean };
const initial:A11yState = { large:false, contrast:false, links:false, motion:false };

export function AccessibilityWidget() {
  const [open,setOpen]=useState(false);
  const [state,setState]=useState<A11yState>(initial);

  useEffect(()=>{
    const raw=localStorage.getItem("alpha-a11y");
    if(raw) {
      try { const parsed={...initial,...JSON.parse(raw)}; requestAnimationFrame(() => setState(parsed)); } catch {}
    }
  },[]);

  useEffect(()=>{
    const root=document.documentElement;
    root.dataset.a11yLarge=String(state.large);
    root.dataset.a11yContrast=String(state.contrast);
    root.dataset.a11yLinks=String(state.links);
    root.dataset.a11yMotion=String(state.motion);
    localStorage.setItem("alpha-a11y",JSON.stringify(state));
  },[state]);

  const flip=(key:keyof A11yState)=>setState(s=>({...s,[key]:!s[key]}));
  return <div className="accessibility">
    {open ? <div className="accessibility-menu" role="dialog" aria-label="תפריט נגישות">
      <h3>התאמות נגישות</h3>
      <button className="btn btn-ghost" onClick={()=>flip("large")}><Text size={16}/>טקסט גדול</button>
      <button className="btn btn-ghost" onClick={()=>flip("contrast")}><Eye size={16}/>ניגודיות גבוהה</button>
      <button className="btn btn-ghost" onClick={()=>flip("links")}><Link2 size={16}/>הדגשת קישורים</button>
      <button className="btn btn-ghost" onClick={()=>flip("motion")}><Wand2 size={16}/>הפחתת תנועה</button>
      <button className="btn btn-ghost" onClick={()=>setState(initial)}><RotateCcw size={16}/>איפוס</button>
    </div>:null}
    <button className="btn btn-brand icon-btn" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="פתיחת תפריט נגישות"><Accessibility size={20}/></button>
  </div>;
}
