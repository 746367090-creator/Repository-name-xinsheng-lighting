"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
  deleteAction: (id: string) => Promise<void>;
  orderAction: (id: string, form: FormData) => Promise<void>;
};

export default function ProductTable({ products, deleteAction, orderAction }: Props) {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => products.filter(product => `${product.model || ""} ${product.name} ${product.category}`.toLowerCase().includes(q.toLowerCase())),
    [products, q],
  );

  return <>
    <div className="admin-search">
      <input value={q} onChange={event => setQ(event.target.value)} placeholder="Search by model, product name or category…"/>
      <span>{rows.length} products</span>
    </div>
    <div className="admin-table-wrap"><table className="admin-table">
      <thead><tr><th>Order</th><th>Model</th><th>Main Image</th><th>Product Name</th><th>Category</th><th>Status</th><th>Media</th><th>Actions</th></tr></thead>
      <tbody>{rows.map(product => {
        const mainImage = product.media?.find(media => media.type === "image");
        return <tr key={product.id}>
          <td><form className="product-order-form" action={orderAction.bind(null, product.id)}>
            <input aria-label={`Sort order for ${product.name}`} type="number" name="sort_order" min="0" step="1" defaultValue={product.sort_order ?? 0}/>
            <button type="submit">Save</button>
          </form></td>
          <td><strong>{product.model || "—"}</strong></td>
          <td>{mainImage ? <img className="product-main-thumb" src={mainImage.url} alt={mainImage.alt || `${product.name} main image`}/> : <span className="no-image">No image</span>}</td>
          <td>{product.name}</td><td>{product.category}</td><td>{product.status}</td><td>{product.media?.length || 0}/8</td>
          <td><Link className="accent" href={`/admin/products/${product.id}`}>Edit</Link>{!product.id.startsWith("demo") ? <form action={deleteAction.bind(null, product.id)} style={{display:"inline",marginLeft:15}}><button className="danger">Delete</button></form> : null}</td>
        </tr>;
      })}</tbody>
    </table></div>
  </>;
}
