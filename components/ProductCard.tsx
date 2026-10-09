import Link from "next/link";
import type { Product } from "@/lib/types";
export default function ProductCard({ product }: { product: Product }) {
  const images = (product.media || []).filter(item => item.type === "image" && item.url), cover = images[0] || product.media?.[0], hover = images[1];
  const target = encodeURIComponent(product.slug || product.model || product.id);
  const inquiry = encodeURIComponent([product.model, product.name].filter(Boolean).join(" — "));
  return <article className="card product-card"><Link href={`/products/${target}`}><div className={`product-visual ${hover ? "has-hover-image" : ""}`}>{cover?.url ? (cover.type === "video" ? <video src={cover.url} muted playsInline preload="metadata"/> : <img className="product-cover-image" src={cover.url} alt={cover.alt || product.name} loading="lazy"/>) : <div className="mini-orb"/>}{hover && <img className="product-hover-image" src={hover.url} alt={hover.alt || `${product.name} alternate view`} loading="lazy"/>}</div></Link><div className="product-info">{product.model && <span className="product-model">{product.model}</span>}<Link href={`/products/${target}`}><h3>{product.name}</h3></Link><p>{product.short_description}</p><div className="card-bottom"><Link href={`/products/${target}`}>View Details →</Link><Link href={`/contact?product=${inquiry}`}><strong>Get a Quote</strong></Link></div></div></article>;
}
