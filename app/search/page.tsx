import type {Metadata} from "next";
import Link from "next/link";
import ProductSearchForm from "@/components/ProductSearchForm";
import SectionHead from "@/components/SectionHead";
import {getProducts} from "@/lib/queries";

export const metadata:Metadata={
  title:"Decorative LED Lighting Product Search",
  description:"Search XINSHERN decorative LED lighting products by product name, model, category, application and specification.",
  alternates:{canonical:"/search"}
};

function searchable(product:any){
  return [product.name,product.model,product.category,product.subcategory,product.short_description,product.description,product.ai_summary,...(product.features||[]),...(product.applications||[]),...(product.customization||[]),...(product.specifications||[]).flatMap((item:any)=>[item.label,item.value])].filter(Boolean).join(" ").toLowerCase();
}

export default async function ProductSearch({searchParams}:{searchParams:{q?:string}}){
  const query=String(searchParams.q||"").trim().slice(0,120);
  const products=await getProducts();
  const terms=query.toLowerCase().split(/\s+/).filter(Boolean);
  const results=query?products.filter(product=>{const text=searchable(product);return terms.every(term=>text.includes(term))}):products.slice(0,12);
  return <main className="section product-search-page"><div className="container">
    <SectionHead kicker="XINSHERN Product Finder" title="Decorative LED Lighting Product Search" description="Search by product name, model, category, lighting effect, application or specification. If you cannot find an exact match, send us your requirements for an OEM/ODM recommendation."/>
    <ProductSearchForm initialQuery={query} resultCount={results.length}/>
    <div className="product-search-summary">{query?<><strong>{results.length}</strong> results for “{query}”</>:<>Popular and recently published products</>}</div>
    {results.length?<div className="product-search-results">{results.map(product=>{
      const image=product.media?.find((item:any)=>item.type==="image")?.url;
      return <Link className="product-search-result card" href={`/products/${encodeURIComponent(product.slug)}`} key={product.id}>
        <div className="product-search-result-image">{image?<img src={image} alt={product.name}/>:<span>No image</span>}</div>
        <div><small>{product.category}{product.model?` · ${product.model}`:""}</small><h2>{product.name}</h2><p>{product.short_description}</p><span className="text-link">View product →</span></div>
      </Link>;
    })}</div>:<div className="product-search-empty"><h2>No exact product found</h2><p>Send the model, photo, specification, target market and estimated quantity. Our team will check existing products and customization options.</p><Link className="btn-primary" href={`/contact?product=${encodeURIComponent(query)}&type=Product%20Search%20Request`}>Submit Your Requirements</Link></div>}
  </div></main>;
}
