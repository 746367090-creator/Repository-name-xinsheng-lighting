import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";

export async function POST(request:Request){
  try{
    const body=await request.json();
    const query=String(body?.query||"").trim().replace(/\s+/g," ").slice(0,120);
    if(query.length<2)return NextResponse.json({ok:false},{status:400});
    const resultCount=Number.isFinite(Number(body?.result_count))?Math.max(0,Math.trunc(Number(body.result_count))):null;
    const client=createClient();
    if(client)await client.from("search_queries").insert({query,result_count:resultCount});
    return NextResponse.json({ok:true});
  }catch{
    return NextResponse.json({ok:false},{status:400});
  }
}
