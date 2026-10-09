import Link from "next/link";
import { getContentEntries, getGallery } from "@/lib/queries";
import ContentGrid from "@/components/ContentGrid";
import SmartVideo from "@/components/SmartVideo";
import SectionHead from "@/components/SectionHead";
import ProjectCTA from "@/components/ProjectCTA";
export const metadata = { title: "Lighting Applications & Cases", description: "Explore lighting scenes and published project cases for home, seasonal, outdoor and event applications.", alternates:{canonical:"/applications"} };
export default async function Applications() {
  const [scenes, cases, solutions] = await Promise.all([getGallery("scene"), getContentEntries("case"), getContentEntries("solution")]);
  return <><section className="section"><div className="container"><SectionHead kicker="Applications & Cases" title="Lighting for the way" accent="people live" description="Explore product ideas in context, then discuss the requirements for your market."/>{scenes.length ? <div className="scene-page-grid">{scenes.map(scene => <article className="scene-card scene-card-large" key={scene.id}>{scene.media_type === "video" ? <SmartVideo src={scene.media_url} title={scene.title}/> : <img src={scene.media_url} alt={scene.title} loading="lazy"/>}<div className="scene-overlay"><h2>{scene.title}</h2><p>{scene.caption}</p></div></article>)}</div> : <div className="buyer-paths">{["Home & Ambient", "Seasonal & Gift", "Outdoor & Events"].map(title => <Link href="/products" className="card" key={title}><h2>{title}</h2><span className="text-link">Explore the product range →</span></Link>)}</div>}</div></section>{cases.length > 0 && <section className="section architecture-soft"><div className="container"><SectionHead title="Project" accent="Cases"/><ContentGrid items={cases} base="/resources"/></div></section>}{solutions.length > 0 && <section className="section"><div className="container"><SectionHead title="Application" accent="Guides"/><ContentGrid items={solutions} base="/solutions"/></div></section>}<ProjectCTA/></>;
}
