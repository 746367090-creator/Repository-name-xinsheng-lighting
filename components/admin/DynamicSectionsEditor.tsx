"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

type Section = {
  title:string;
  body:string;
};

export default function DynamicSectionsEditor({
  initial
}:{
  initial:Section[];
}){

  const [sections,setSections]=useState<Section[]>(
    initial.length ? initial : [{title:"",body:""}]
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
        <div className="admin-form-grid" key={index}>

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
