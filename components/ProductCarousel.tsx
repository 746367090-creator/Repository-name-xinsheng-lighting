"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductCarousel({items}:{items:any[]}) {

  const products = items.slice(0,8);
  const [index,setIndex] = useState(0);
  const [pause,setPause] = useState(false);

  useEffect(()=>{
    if(products.length <= 4 || pause) return;

    const timer = setInterval(()=>{
      setIndex(prev => (prev + 1) % products.length);
    },3000);

    return ()=>clearInterval(timer);
  },[products.length,pause]);


  if(!products.length) return null;


  return (
    <div 
      className="product-carousel-wrapper"
      onMouseEnter={()=>setPause(true)}
      onMouseLeave={()=>setPause(false)}
    >

      <button
        className="product-carousel-btn prev"
        onClick={()=>setIndex(prev => (prev - 1 + products.length) % products.length)}
      >
        ←
      </button>


      <div className="product-carousel-window">

        <div
          className="product-carousel-track"
          style={{
            transform:`translateX(-${index * 25}%)`
          }}
        >

          {products.map((product:any)=>{

            const image =
              product.media?.find((m:any)=>m.type==="image");

            return (

              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="product-carousel-card"
              >

                {image &&
                  <img
                    src={image.url}
                    alt={image.alt || product.name}
                  />
                }

                <small>
                  {product.category}
                </small>

                <h3>
                  {product.name}
                </h3>

                <span>
                  View product →
                </span>

              </Link>

            )

          })}

        </div>

      </div>


      <button
        className="product-carousel-btn next"
        onClick={()=>setIndex(prev => (prev + 1) % products.length)}
      >
        →
      </button>


    </div>
  );
}
