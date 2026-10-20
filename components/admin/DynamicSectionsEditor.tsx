"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import type { GalleryItem } from "@/lib/types";

type Section = {
  title:string;
  body:string;
  media?:GalleryItem;
};

export default function DynamicSectionsEditor({
  initial,
  media=[]
}:{
  initial:Section[];
  media?:GalleryItem[];
}){

  const [sections,setSections]=useState<Section[]>(
    (initial.length ? initial : [{title:"",body:""}]).map((item,index)=>({...item,media:media[index]}))
  );

  function update(index:number,key:keyof Section,value:string){
    setSections(items =>
      items.map((item,i)=>
        i===index ? {...item,[key]:value}:item
      )
    );
  }

  function add(){
    setSections([
      ...sections,
      {title:"",body:""}
    ]);
  }

  function remove(index:number){
    setSections(
      sections.filter((_,i)=>i!==index)
    );
  }

  return (
    <div>
      {sections.map((section,index)=>(
        <div className="factory-section-editor" key={section.media?.id || index}>
          <div className="factory-section-media">
            {section.media ? (section.media.media_type === "video" ? <video src={section.media.media_url} controls/> : <img src={section.media.media_url} alt={section.title || `Factory section ${index+1}`}/>) : <div className="admin-thumb-placeholder">No image</div>}
            <input type="hidden" name={`factory_media_id_${index+1}`} value={section.media?.id || ""}/>
            <label>Replace image/video
              <input type="file" name={`factory_section_media_${index+1}`} accept="image/*,video/*"/>
            </label>
            {section.media && <label className="delete-media-check"><input type="checkbox" name={`delete_factory_media_${index+1}`}/> Delete current media</label>}
          </div>
          <div className="factory-section-copy">

          <label>
            Section {index+1} Title
            <input
              name={`section_title_${index+1}`}
              value={section.title}
              onChange={e=>update(index,"title",e.target.value)}
            />
          </label>

          <RichTextEditor
            name={`section_body_${index+1}`}
            label={`Section ${index+1} Description`}
            defaultValue={section.body}
          />

          <button
            type="button"
            className="btn-secondary"
            onClick={()=>remove(index)}
          >
            Delete Section
          </button>

          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn-primary"
        onClick={add}
      >
        + Add Factory Section
      </button>
    </div>
  );
}
