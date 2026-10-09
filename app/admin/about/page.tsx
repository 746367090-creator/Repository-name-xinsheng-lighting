import { getPagesForAdmin } from "@/lib/queries";
import { fallbackPages } from "@/lib/fallback";
import AboutPageForm from "@/components/admin/AboutPageForm";
import { saveAboutPage } from "../actions";
export default async function AboutAdmin(){const pages=await getPagesForAdmin();const page=pages.find(item=>item.slug==="about")||fallbackPages.about;return <><div className="admin-actions"><div><h1>About Us / 公司介绍</h1><p>在这里统一编辑公司介绍、四个文字框和最多8张轮播图片。</p></div></div><AboutPageForm page={page} action={saveAboutPage}/></>}
