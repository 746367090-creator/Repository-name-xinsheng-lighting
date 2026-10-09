"use client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import { aboutCards, aboutDefaults } from "@/lib/about";
import type { AboutActionState } from "@/app/admin/actions";
import type { MediaItem, SitePage } from "@/lib/types";
function Save({busy}:{busy:boolean}){const {pending}=useFormStatus();return <button className="btn-primary" disabled={pending||busy}>{pending?"Saving…":"Save About Us / 保存公司介绍"}</button>}
export default function AboutPageForm({page,action}:{page:SitePage;action:(state:AboutActionState,form:FormData)=>Promise<AboutActionState>}){
  const [state,formAction]=useFormState(action,{});
  const [media,setMedia]=useState<MediaItem[]>((page.media||[]).slice(0,8));
  const [busy,setBusy]=useState(false),[message,setMessage]=useState("");
  const content=page.content||{};
  const text=(key:string)=>String(content[key]||aboutDefaults[key]||"");
  async function upload(files:FileList|null){
    if(!files?.length||busy)return;const selected=Array.from(files).slice(0,8-media.length);
    if(!selected.length){setMessage("最多8张图片，请先移除一张再上传。");return;}
    const client=createClient();if(!client){setMessage("Supabase is not connected.");return;}
    setBusy(true);setMessage("");const completed:MediaItem[]=[];const errors:string[]=[];
    try{for(const file of selected){if(!file.type.startsWith("image/")||file.size>10*1024*1024){errors.push(`${file.name}: 请使用10MB以内图片`);continue;}const ext=file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g,"")||"jpg";const path=`pages/about/${crypto.randomUUID()}.${ext}`;const {error}=await client.storage.from("media").upload(path,file,{contentType:file.type,upsert:false});if(error){errors.push(`${file.name}: ${error.message}`);continue;}const {data}=client.storage.from("media").getPublicUrl(path);completed.push({type:"image",url:data.publicUrl,alt:""});}setMedia(current=>[...current,...completed].slice(0,8));setMessage([completed.length?`${completed.length}张已上传，点击保存后生效。`:"",...errors].filter(Boolean).join("\n"));}catch{setMessage("上传中断，请重试。已完成的图片可保存。");setMedia(current=>[...current,...completed].slice(0,8));}finally{setBusy(false);}
  }
  function move(index:number,direction:number){setMedia(current=>{const next=[...current],target=index+direction;if(target<0||target>=next.length)return current;[next[index],next[target]]=[next[target],next[index]];return next;})}
  return <form className="admin-form" action={formAction} onSubmit={event=>{if(busy)event.preventDefault()}}>
    {state.error&&<p className="form-error" role="alert">{state.error}</p>}
    <label>Admin title / 后台名称<input name="title" defaultValue={page.title}/></label>
    <label>Eyebrow / 小标题<input name="eyebrow" defaultValue={page.eyebrow}/></label>
    <label>Main heading / 主标题<input name="heading" defaultValue={page.heading} required/></label>
    <label>Opening introduction / 首段介绍<textarea name="body" rows={5} defaultValue={page.body}/></label>
    <h3>Four text cards / 四个框框文字</h3>
    {aboutCards.map(([title,body],i)=><div className="admin-form-grid" key={i}><label>Card {i+1} title / 标题<input name={`about_card_title_${i+1}`} defaultValue={String(content[`about_card_title_${i+1}`]||title)}/></label><label>Card {i+1} description / 介绍<textarea name={`about_card_body_${i+1}`} defaultValue={String(content[`about_card_body_${i+1}`]||body)}/></label></div>)}
    <h3>Company introduction / 公司详细介绍</h3><label>Section heading / 标题<input name="about_intro_title" defaultValue={text("about_intro_title")}/></label><label>Company text / 公司介绍（支持分段换行）<textarea name="about_intro_body" rows={10} defaultValue={text("about_intro_body")}/></label>
    <h3>Company photo carousel / 公司图片轮播（最多8张）</h3>
    <p className="hint">上传真实且可公开的公司图片。按顺序自动轮播，可调整顺序、填写图片说明或移除，保存后生效。已有视频可保留；新上传仅接受图片。</p>
    <input type="hidden" name="about_media" value={JSON.stringify(media)}/>
    <label>Upload photos / 多图上传<input type="file" accept="image/*" multiple disabled={busy||media.length>=8} onChange={event=>{void upload(event.target.files);event.target.value=""}}/></label>
    {message&&<p className="hint about-text" role="status">{message}</p>}{busy&&<p role="status">图片上传中，请等待完成再保存。</p>}
    <div className="admin-media-grid">{media.map((item,i)=><div className="admin-media" key={item.url}>{item.type==="video"?<video src={item.url} controls/>:<img src={item.url} alt={item.alt||`Photo ${i+1}`}/>}<div><label>Photo {i+1} caption / 图片说明<input value={item.alt||""} disabled={busy} onChange={event=>setMedia(current=>current.map((m,n)=>n===i?{...m,alt:event.target.value}:m))}/></label><div className="about-media-buttons"><button type="button" disabled={busy||i===0} onClick={()=>move(i,-1)}>↑ 前移</button><button type="button" disabled={busy||i===media.length-1} onClick={()=>move(i,1)}>↓ 后移</button><button type="button" className="danger" disabled={busy} onClick={()=>setMedia(current=>current.filter((_,n)=>n!==i))}>Remove / 移除</button></div></div></div>)}</div>
    <h3>Customer visits / 客户访问板块</h3>
    <label>Section title<input name="about_gallery_title" defaultValue={text("about_gallery_title")}/></label><label>Description<textarea name="about_gallery_body" defaultValue={text("about_gallery_body")}/></label>
    <label className="check"><input type="checkbox" name="about_gallery_authorized" defaultChecked={content.about_gallery_authorized===true}/> 客户照片已获公开授权，展示此板块</label><p className="hint">客户照片在 资料与素材 → 客户照片与Logo 管理。</p>
    <label className="check"><input type="checkbox" name="published" defaultChecked={page.published}/> Published / 发布</label><Save busy={busy}/>
  </form>;
}
