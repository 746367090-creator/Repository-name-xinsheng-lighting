import Link from "next/link";
import { getNews } from "@/lib/queries";
import { deleteNews } from "../actions";

export default async function AdminNews(){
  const posts=await getNews(undefined,true);
  return <>
    <div className="admin-actions"><div><h1>News</h1><p>Publish company news, product updates and industry articles.</p></div><Link className="btn-primary" href="/admin/news/new">Add News</Link></div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Thumbnail / 缩略图</th><th>Title</th><th>Category</th><th>SEO / AI</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{posts.map(p=><tr key={p.id}><td>{p.cover_url?<img className="admin-list-thumb" src={p.cover_url} alt={p.title}/>:<span className="no-image">No image</span>}</td><td>{p.title}</td><td>{p.category}</td><td><span className={p.seo?.title&&p.seo?.description?"status-ok":"status-missing"}>{p.seo?.title&&p.seo?.description?"SEO ✓":"SEO —"}</span> · <span className={p.ai_summary?"status-ok":"status-missing"}>{p.ai_summary?"AI ✓":"AI —"}</span></td><td>{p.published_at.slice(0,10)}</td><td>{p.status}</td><td><Link className="accent" href={`/admin/news/${p.id}`}>Edit</Link>{!p.id.startsWith("n")&&<form action={deleteNews.bind(null,p.id)} style={{display:"inline",marginLeft:15}}><button className="danger">Delete</button></form>}</td></tr>)}</tbody></table></div>
  </>;
}
