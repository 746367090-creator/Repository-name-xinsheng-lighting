"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export default function GuideCoverEditor({ existing = "", existingType = "image", onBusy }: {existing?:string;existingType?:"image"|"video";onBusy:(busy:boolean)=>void}) {
  const [cover, setCover] = useState(existing);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function upload(file?:File) {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {setMessage("请选择10MB以内的图片 / Choose an image under 10MB.");return;}
    setBusy(true);onBusy(true);setMessage("上传中… / Uploading…");
    try {
      const client = createClient();
      const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
      const path = `guides/${crypto.randomUUID()}.${extension}`;
      const {error} = await client.storage.from("media").upload(path, file, {contentType:file.type,upsert:false});
      if (error) throw error;
      const {data} = client.storage.from("media").getPublicUrl(path);
      setCover(data.publicUrl);setMessage("图片已上传，点击 Save Content 发布 / Click Save Content to publish.");
    } catch(error) {setMessage(error instanceof Error ? error.message : "图片上传失败，请重试 / Upload failed. Try again.");}
    finally {setBusy(false);onBusy(false);}
  }
  return <div><h3>Cover Image / 封面图片</h3><input type="hidden" name="existing_cover" value={existing}/><input type="hidden" name="uploaded_cover_url" value={cover !== existing ? cover : ""}/><input type="hidden" name="remove_cover" value={cover ? "" : "on"}/>{cover && <div style={{maxWidth:600,marginBottom:16}}>{cover===existing && existingType==="video" ? <video src={cover} controls style={{width:"100%"}}/> : <img src={cover} alt="Cover preview" style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",borderRadius:12}}/>}<button type="button" className="danger" disabled={busy} onClick={() => {setCover("");setMessage("保存后移除封面 / Save to remove the cover.");}}>Remove cover / 移除封面</button></div>}<label>Upload / Replace 上传或更换<input type="file" accept="image/*" disabled={busy} onChange={event => {void upload(event.target.files?.[0]);event.target.value="";}}/></label><p role="status" aria-live="polite" className="hint">{message || "封面用于资源列表和文章详情页 / Shown on the guide card and detail page."}</p></div>;
}
