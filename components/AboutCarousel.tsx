"use client";
import { useEffect, useState } from "react";
import type { MediaItem } from "@/lib/types";
export default function AboutCarousel({items}:{items:MediaItem[]}) {
  const slides=items.slice(0,8);
  const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[hovered,setHovered]=useState(false),[focused,setFocused]=useState(false);
  const current=slides.length?index%slides.length:0;
  useEffect(()=>{if(paused||hovered||focused||slides.length<2)return;const timer=setInterval(()=>setIndex(value=>(value+1)%slides.length),4500);return()=>clearInterval(timer)},[paused,hovered,focused,slides.length]);
  if(!slides.length)return <div className="about-photo-empty">XINSHERN · About Us</div>;
  return <div className="about-carousel" role="region" aria-roledescription="carousel" aria-label="Company photographs" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setFocused(false)}}>
    <div className="about-slide">{slides[current].type==="video"?<video key={slides[current].url} src={slides[current].url} controls playsInline preload="metadata"/>:<img src={slides[current].url} alt={slides[current].alt||`XINSHERN company photo ${current+1}`}/>}</div>
    {slides[current].alt&&<p className="about-photo-caption">{slides[current].alt}</p>}
    {slides.length>1&&<div className="about-carousel-controls"><button type="button" onClick={()=>setIndex((current-1+slides.length)%slides.length)} aria-label="Previous company photo">←</button><div className="about-photo-dots">{slides.map((slide,i)=><button type="button" key={`${slide.url}-${i}`} aria-label={`Show company photo ${i+1}`} aria-pressed={current===i} className={current===i?"active":""} onClick={()=>setIndex(i)}/>)}</div><button type="button" onClick={()=>setIndex((current+1)%slides.length)} aria-label="Next company photo">→</button><button type="button" onClick={()=>setPaused(value=>!value)} aria-label={paused?"Start automatic slideshow":"Pause automatic slideshow"}>{paused?"Play":"Pause"}</button></div>}
  </div>;
}
