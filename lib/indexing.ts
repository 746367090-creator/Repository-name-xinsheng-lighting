import { getContentEntries, getNews, getProducts } from "@/lib/queries";

export const INDEXNOW_KEY = "74fd2b3e6a4c4ca8a6e38acdd7475061";

export function siteOrigin() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.szxinshengtech.com").replace(/\/$/, "");
}

export async function getIndexableUrls() {
  const base = siteOrigin();
  const [products, news, content] = await Promise.all([
    getProducts(),
    getNews(),
    getContentEntries()
  ]);
  const paths = [
    "", "/about", "/oem-odm", "/applications", "/products", "/solutions",
    "/factory", "/faq", "/scenes", "/resources", "/news", "/contact",
    ...products.map(item => `/products/${encodeURIComponent(item.slug)}`),
    ...news.map(item => `/news/${encodeURIComponent(item.slug)}`),
    ...content.map(item => item.type === "case"
      ? `/applications/cases/${encodeURIComponent(item.slug)}`
      : `/${item.type === "solution" ? "solutions" : "resources"}/${encodeURIComponent(item.slug)}`)
  ];
  return [...new Set(paths.map(path => `${base}${path}`))];
}

export async function notifyIndexNow(urlList:string[]) {
  const base=siteOrigin(),host=new URL(base).host;
  const cleanUrls=[...new Set(urlList)].filter(url=>{try{return new URL(url).host===host}catch{return false}});
  if(!cleanUrls.length)return{ok:false,status:400};
  try{
    const response=await fetch("https://api.indexnow.org/indexnow",{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({host,key:INDEXNOW_KEY,keyLocation:`${base}/${INDEXNOW_KEY}.txt`,urlList:cleanUrls}),cache:"no-store",signal:AbortSignal.timeout(8000)});
    return{ok:response.ok,status:response.status};
  }catch{return{ok:false,status:0}}
}

export async function notifyPublicPaths(paths:string[]){const base=siteOrigin();return notifyIndexNow(paths.map(path=>`${base}${path.startsWith("/")?path:`/${path}`}`))}
