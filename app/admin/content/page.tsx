import Link from "next/link";
import PageForm from "@/components/admin/PageForm";
import { getPagesForAdmin } from "@/lib/queries";
import { fallbackPages } from "@/lib/fallback";
import { savePage } from "../actions";
const pages=[["home","首页"],["oem-odm","OEM / ODM"],["products","产品页"],["factory","工厂"],["applications","应用案例"],["resources","资源指南"],["faq","FAQ"],["contact","联系我们"],["news","新闻页"],["scenes","场景页"]];
export default async function Content({searchParams}:{searchParams:{page?:string}}){
 const slug=pages.some(([key])=>key===searchParams.page)?searchParams.page!:"home";
 const rows=await getPagesForAdmin();const page=rows.find(item=>item.slug===slug)||fallbackPages[slug]||{slug,title:slug,heading:slug,body:"",content:{},media:[],published:true};
 return <><div className="admin-actions"><div><h1>网站页面 / Website Pages</h1><p>选择一个页面编辑。公司介绍已移至独立 About Us 编辑页。</p></div><Link className="btn-secondary" href="/admin/about">编辑 About Us →</Link></div><nav className="admin-page-picker" aria-label="选择编辑页面">{pages.map(([key,label])=><Link href={`/admin/content?page=${key}`} className={key===slug?"active":""} aria-current={key===slug?"page":undefined} key={key}>{label}</Link>)}</nav><PageForm key={slug} page={page} action={savePage.bind(null,slug,page.media||[])}/></>;
}
