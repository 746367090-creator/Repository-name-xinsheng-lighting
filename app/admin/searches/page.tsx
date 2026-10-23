import {createClient} from "@/lib/supabase/server";

export default async function SearchAnalytics(){
  const client=createClient();
  const {data}=client?await client.from("search_queries").select("*").order("created_at",{ascending:false}).limit(500):{data:[]};
  const rows=data||[];
  const counts=new Map<string,{query:string,count:number,last:string;zero:number}>();
  for(const row of rows as any[]){const key=String(row.query).toLowerCase();const current=counts.get(key)||{query:row.query,count:0,last:row.created_at,zero:0};current.count+=1;if(Number(row.result_count)===0)current.zero+=1;counts.set(key,current)}
  const popular=[...counts.values()].sort((a,b)=>b.count-a.count).slice(0,50);
  return <><div className="admin-actions"><div><h1>Product Search Analytics</h1><p>查看客户搜索的产品、型号和没有结果的关键词，用于补充产品和开发内容。</p></div></div>
    {popular.length?<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Search keyword</th><th>Searches</th><th>Zero-result searches</th><th>Latest</th></tr></thead><tbody>{popular.map(row=><tr key={row.query.toLowerCase()}><td><strong>{row.query}</strong></td><td>{row.count}</td><td>{row.zero}</td><td>{new Date(row.last).toLocaleString()}</td></tr>)}</tbody></table></div>:<div className="empty">No product searches recorded yet.</div>}
  </>;
}
