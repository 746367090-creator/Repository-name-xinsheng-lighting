import type { QA } from "./types";

function decode(value:string){
  return value.replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
}

/** Convert legacy rich-text rows such as <div>Question | Answer</div> into FAQ data. */
export function parseLegacyFAQ(value:unknown):QA[]{
  if(typeof value!=="string"||!value.trim())return[];
  const lines=decode(value)
    .replace(/<\s*br\s*\/?\s*>/gi,"\n")
    .replace(/<\/(?:div|p|blockquote|li|h[1-6])>/gi,"\n")
    .replace(/<[^>]*>/g," ")
    .split(/\n+/)
    .map(line=>line.replace(/\s+/g," ").trim())
    .filter(Boolean);
  return lines.flatMap(line=>{
    const separator=line.indexOf("|");
    if(separator<1)return[];
    const question=line.slice(0,separator).trim();
    const answer=line.slice(separator+1).trim();
    return question&&answer?[{question,answer}]:[];
  });
}

export function pageFAQs(content:Record<string,unknown>|undefined,legacyBody?:string):QA[]{
  const saved=content?.page_faqs;
  if(Array.isArray(saved))return saved.filter((item):item is QA=>Boolean(item&&typeof item==="object"&&typeof (item as QA).question==="string"&&typeof (item as QA).answer==="string"));
  return parseLegacyFAQ(legacyBody);
}
