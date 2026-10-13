"use client";

import {useState} from "react";
import {createClient} from "@/lib/supabase/client";

export default function WhyImageUploader({
 index,
 value=""
}:{
 index:number;
 value?:string;
}){

 const [url,setUrl]=useState(value);
 const [loading,setLoading]=useState(false);

 async function upload(file:File){

  const client=createClient();
  if(!client) return;

  setLoading(true);

  const ext=file.name.split(".").pop() || "jpg";

  const path=`why/${crypto.randomUUID()}.${ext}`;

  const {error}=await client.storage
   .from("media")
   .upload(path,file,{
    contentType:file.type,
    upsert:false
   });

  if(error){
    setLoading(false);
    return;
  }

  const {data}=client.storage
   .from("media")
   .getPublicUrl(path);

  setUrl(data.publicUrl);

  setLoading(false);
 }


 return (
  <div>

   <label>
    Card {index} Image
    <input
     type="file"
     accept="image/*"
     onChange={e=>{
      const file=e.target.files?.[0];
      if(file) upload(file);
     }}
    />
   </label>


   <input
    type="hidden"
    name={`why_image_${index}`}
    value={url}
   />


   {loading && <p>Uploading...</p>}

   {url &&
    <img
     src={url}
     style={{
      width:"180px",
      height:"100px",
      objectFit:"cover",
      borderRadius:"12px"
     }}
    />
   }

  </div>
 );

}
