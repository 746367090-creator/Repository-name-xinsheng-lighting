import { getIndexableUrls, INDEXNOW_KEY, siteOrigin } from "@/lib/indexing";
import { submitIndexNow } from "./actions";

export const dynamic = "force-dynamic";

export default async function IndexingPage({searchParams}:{searchParams:{status?:string;message?:string}}) {
  const urls = await getIndexableUrls();
  const base = siteOrigin();
  return <>
    <div className="admin-actions">
      <div><h1>搜索引擎收录</h1><p>管理 Google、Bing 等搜索引擎可抓取的网址，并主动通知支持 IndexNow 的搜索引擎。</p></div>
      <form action={submitIndexNow}><button className="btn-primary">一键提交全部网址</button></form>
    </div>
    {searchParams.message?<p className={searchParams.status==="success"?"indexing-success":"form-error"}>{searchParams.message}</p>:null}
    <div className="admin-grid indexing-stats">
      <div className="admin-stat"><span>可收录网址</span><strong>{urls.length}</strong></div>
      <div className="admin-stat"><span>Sitemap</span><a href={`${base}/sitemap.xml`} target="_blank" rel="noreferrer">查看 ↗</a></div>
      <div className="admin-stat"><span>Robots</span><a href={`${base}/robots.txt`} target="_blank" rel="noreferrer">查看 ↗</a></div>
      <div className="admin-stat"><span>AI 爬虫资料</span><a href={`${base}/llms.txt`} target="_blank" rel="noreferrer">查看 ↗</a></div>
    </div>
    <div className="admin-form indexing-help">
      <h2>使用方法</h2>
      <p>发布新产品、新闻或解决方案后，点击“一键提交全部网址”。这会通知 Bing、Microsoft Copilot 及其他支持 IndexNow 的搜索服务尽快重新抓取，但不能保证排名或立即收录。</p>
      <small>验证文件：{base}/{INDEXNOW_KEY}.txt</small>
    </div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>#</th><th>等待搜索引擎抓取的网址</th></tr></thead><tbody>{urls.map((url,index)=><tr key={url}><td>{index+1}</td><td><a href={url} target="_blank" rel="noreferrer">{url}</a></td></tr>)}</tbody></table></div>
  </>;
}
