"use client";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
const groups=[
 {title:"产品管理",links:[["/admin/products","产品 / Products"],["/admin/categories","产品分类"]]},
 {title:"网站内容",links:[["/admin/content","网站页面 / Pages"],["/admin/about","公司介绍 / About Us"],["/admin/applications","应用与案例"],["/admin/guides","采购指南"],["/admin/news","新闻资讯"],["/admin/library","知识与FAQ"]]},
 {title:"资料与素材",links:[["/admin/media","图片与视频"],["/admin/catalog","产品目录 PDF"],["/admin/customers","客户照片与Logo"]]},
 {title:"客户业务",links:[["/admin/inquiries","询盘管理"],["/admin/quotes","报价管理"]]},
 {title:"系统设置",links:[["/admin/seo","SEO与公司资料"]]},
];
export default function AdminSidebar(){
 const path=usePathname(),router=useRouter();
 const matches=(href:string)=>path===href||path.startsWith(href+"/");
 async function logout(){await createClient().auth.signOut();router.push("/admin/login");router.refresh()}
 return <aside className="admin-sidebar"><div className="logo"><strong>XINSHERN</strong><small>CONTENT ADMIN</small></div><nav aria-label="后台导航"><Link className={path==="/admin"?"active":""} aria-current={path==="/admin"?"page":undefined} href="/admin">工作台 / Dashboard</Link>{groups.map(group=>{const active=group.links.some(([href])=>matches(href));return <details className="admin-nav-group" key={`${group.title}-${active}`} open={active}><summary>{group.title}</summary><div>{group.links.map(([href,label])=><Link className={matches(href)?"active":""} aria-current={matches(href)?"page":undefined} key={href} href={href}>{label}</Link>)}</div></details>})}</nav><div className="admin-sidebar-footer"><Link href="/" target="_blank" rel="noreferrer">查看网站 ↗</Link><button onClick={logout}>退出登录 / Sign Out</button></div></aside>;
}
