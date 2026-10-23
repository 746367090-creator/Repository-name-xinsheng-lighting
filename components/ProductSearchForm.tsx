"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductSearchForm({initialQuery="",resultCount}:{initialQuery?:string;resultCount?:number}){
  const [query,setQuery]=useState(initialQuery);
  const router=useRouter();
  const recorded=useRef(false);

  useEffect(()=>{
    if(!initialQuery||recorded.current)return;
    recorded.current=true;
    void fetch("/api/search-queries",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({query:initialQuery,result_count:resultCount})
    }).catch(()=>undefined);
  },[initialQuery,resultCount]);

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const value=query.trim().slice(0,120);
    if(!value)return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return <form className="public-product-search" onSubmit={submit} role="search">
    <label htmlFor="product-search">Search products, models, categories or applications</label>
    <div className="public-product-search-row">
      <input id="product-search" name="q" value={query} onChange={event=>setQuery(event.target.value)} placeholder="e.g. galaxy projector, ambient lamp, CLED-018" maxLength={120}/>
      <button className="btn-primary" type="submit">Search Products</button>
    </div>
  </form>;
}
