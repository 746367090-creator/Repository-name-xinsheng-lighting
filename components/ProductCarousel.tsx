"use client";

import Link from "next/link";

export default function ProductCarousel({items}:{items:any[]}) {
  return (
    <div className="product-carousel">
      {items.slice(0,8).map((product:any)=> {
        const image=product.media?.find((m:any)=>m.type==="image");
        return (
          <Link key={product.id} href={`/products/${product.slug}`} className="product-carousel-card">
            {image && <img src={image.url} alt={image.alt || product.name}/>}
            <small>{product.category}</small>
            <h3>{product.name}</h3>
            <span>View product →</span>
          </Link>
        )
      })}
    </div>
  );
}
