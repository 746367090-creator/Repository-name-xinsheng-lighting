"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import GuideCoverEditor from "./GuideCoverEditor";
import type { GalleryItem } from "@/lib/types";
function Save({busy}:{busy:boolean}){const{pending}=useFormStatus();return <button className="btn-primary" disabled={busy||pending}>{busy?"图片上传中…":pending?"保存中…":"Save Scene / 保存场景"}</button>}
export default function SceneForm({scene,action}:{scene?:GalleryItem;action:(form:FormData)=>void}){const[busy,setBusy]=useState(false);return <form className="admin-form" action={action} onSubmit={event=>{if(busy)event.preventDefault()}}>{scene && <input type="hidden" name="id" value={scene.id}/>}<label>Title / 标题<input name="title" defaultValue={scene?.title} required/></label><label>Description / 说明<textarea name="caption" defaultValue={scene?.caption}/></label><label>Sort order / 排序<input name="sort_order" type="number" defaultValue={scene?.sort_order || 0}/></label><GuideCoverEditor existing={scene?.media_url} existingType={scene?.media_type==="video"?"video":"image"} onBusy={setBusy}/><label className="check"><input type="checkbox" name="published" defaultChecked={scene?scene.published:true}/>Published / 发布</label><Save busy={busy}/></form>}
