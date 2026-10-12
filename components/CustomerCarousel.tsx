"use client";

import { useEffect, useState } from "react";

export default function CustomerCarousel({items}:{items:any[]}){

  const [index,setIndex]=useState(0);

  useEffect(()=>{
    if(items.length<2) return;

    const timer=setInterval(()=>{
      setIndex(i=>(i+1)%items.length);
    },4000);

    return ()=>clearInterval(timer);

  },[items.length]);


  if(!items.length) return null;


  const item=items[index];


  return (
    <section className="customer-carousel">

      <div className="customer-carousel-head">
        <div className="kicker">
          Customer Visits
        </div>

        <h2>
          Trusted Cooperation With Global Buyers
        </h2>

        <p>
          Meet our customers and partners visiting XINSHERN to discuss LED lighting products and cooperation opportunities.
        </p>
      </div>


      <div className="customer-carousel-image">

        <img
          src={item.media_url}
          alt={item.title || "Customer visit"}
        />

        <div className="customer-carousel-caption">
          <h3>{item.title}</h3>
          {item.caption &&
          <p>{item.caption}</p>}
        </div>

      </div>


      <div className="customer-dots">
        {items.map((_,i)=>
          <button
          key={i}
          onClick={()=>setIndex(i)}
          className={i===index?"active":""}
          />
        )}
      </div>

    </section>
  );
}
