import Link from "next/link";
import { getContentEntries, getGallery, getPage } from "@/lib/queries";
import ContentGrid from "@/components/ContentGrid";
import SmartVideo from "@/components/SmartVideo";
import SectionHead from "@/components/SectionHead";
import ProjectCTA from "@/components/ProjectCTA";
export const metadata = {title:"Lighting Applications & Cases",description:"Explore lighting project cases, application guides and scenes.",alternates:{canonical:"/applications"}};
const categories = [["case","Case"],["guides","Application Guides"],["scenes","Scenes"]];
export default async function Applications({searchParams}:{searchParams:{category?:string}}) {
  const category = categories.some(([key])=>key===searchParams.category) ? searchParams.category! : "case";
  const [page, entries, scenes] = await Promise.all([getPage("applications"), category !== "scenes" ? getContentEntries(category === "case" ? "case" : "solution") : Promise.resolve([]),category === "scenes" ? getGallery("scene") : Promise.resolve([])]);
  return <><section className="section"><div className="container"><SectionHead kicker={page?.eyebrow || "Applications & Cases"} title={page?.heading && page.heading !== "Lighting for the way people live" ? page.heading : "Lighting for the way"} accent={!page?.heading || page.heading === "Lighting for the way people live" ? "people live" : undefined} description={page?.body || "Explore product ideas in context, then discuss the requirements for your market."}/>
    <nav className="application-categories" aria-label="Application categories">{categories.map(([key,label])=><Link href={`/applications?category=${key}`} className={category===key?"active":""} aria-current={category===key?"page":undefined} key={key} scroll={false}>{label}</Link>)}</nav>
    <section className="application-results" aria-label={categories.find(([key])=>key===category)?.[1]}>
      {category === "scenes" ? (scenes.length ? <div className="scene-page-grid">{scenes.map(scene=><article className="scene-card scene-card-large" key={scene.id}>{scene.media_type==="video" ? <SmartVideo src={scene.media_url} title={scene.title}/> : <img src={scene.media_url} alt={scene.title} loading="lazy"/>}<div className="scene-overlay"><h2>{scene.title}</h2><p>{scene.caption}</p></div></article>)}</div> : <div className="empty-detail">Lighting scenes will appear here as they are published. <Link href="/contact" className="text-link">Discuss your application →</Link></div>) : (entries.length ? <ContentGrid items={entries} base={category==="case"?"/applications/cases":"/solutions"}/> : <div className="empty-detail">{category==="case"?"Project cases":"Application guides"} will appear here as they are published. <Link href="/contact" className="text-link">Discuss your project →</Link></div>)}
    </section></div></section><ProjectCTA/></>;
}
