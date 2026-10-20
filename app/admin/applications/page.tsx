import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getContentEntries } from "@/lib/queries";
import type { GalleryItem } from "@/lib/types";

const seoStatus = (seo?:Record<string,string>, ai?:string) => <><span className={seo?.title&&seo?.description?"status-ok":"status-missing"}>{seo?.title&&seo?.description?"SEO ✓":"SEO —"}</span> · <span className={ai?"status-ok":"status-missing"}>{ai?"AI ✓":"AI —"}</span></>;

export default async function ApplicationAdmin({searchParams}:{searchParams:{category?:string}}) {
  const category=["case","guides","scenes"].includes(searchParams.category || "")?searchParams.category!:"case";
  const entries=category!=="scenes"?await getContentEntries(category==="case"?"case":"solution",true):[];
  const client=createClient();
  const result=category==="scenes"&&client?await client.from("site_media").select("*").eq("collection","scene").order("sort_order"):{data:[]};
  const scenes=(result.data||[]) as GalleryItem[];
  const add=category==="scenes"?"/admin/applications/scenes/new":`/admin/library/new?type=${category==="case"?"case":"solution"}`;
  return <>
    <div className="admin-actions"><div><h1>Applications / 应用内容管理</h1><p>Case、Solution、Scenes 分开管理。图片和文字保存并发布后显示到对应分类。</p></div><Link href={add} className="btn-primary">Add / 新增</Link></div>
    <nav className="application-categories" aria-label="Admin application categories">{[["case","Case"],["guides","Solution"],["scenes","Scenes"]].map(([key,label])=><Link key={key} href={`/admin/applications?category=${key}`} className={category===key?"active":""}>{label}</Link>)}</nav>
    <p><Link className="accent" href="/admin/content?page=applications">Edit page heading / 编辑页面标题 →</Link></p>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Thumbnail / 缩略图</th><th>Title / 标题</th>{category!=="scenes"&&<th>SEO / AI</th>}<th>Status</th><th>Actions</th></tr></thead><tbody>
      {category==="scenes"?scenes.map(scene=><tr key={scene.id}><td>{scene.media_type==="video"?<video className="admin-list-thumb" src={scene.media_url} controls/>:<img className="admin-list-thumb" src={scene.media_url} alt={scene.title}/>}</td><td>{scene.title}<p>{scene.caption}</p></td><td>{scene.published?"Published":"Draft"}</td><td><Link className="accent" href={`/admin/applications/scenes/${scene.id}`}>Edit / 编辑</Link></td></tr>):entries.map(entry=><tr key={entry.id}><td>{entry.cover_url?<img className="admin-list-thumb" src={entry.cover_url} alt={entry.title}/>:<span className="no-image">No image</span>}</td><td>{entry.title}<p>{entry.excerpt}</p></td><td>{seoStatus(entry.seo,entry.ai_summary)}</td><td>{entry.status}</td><td><Link className="accent" href={`/admin/library/${entry.id}`}>Edit / 编辑</Link>{entry.status==="published"&&<Link href={`${category==="case"?"/applications/cases":"/solutions"}/${entry.slug}`} target="_blank" rel="noreferrer" style={{marginLeft:12}}>View ↗</Link>}</td></tr>)}
    </tbody></table></div>
    {!(entries.length||scenes.length)&&<div className="empty">此分类暂无内容，点击 Add 新增。</div>}
  </>;
}
