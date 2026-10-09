import { getGallery, getPage } from "@/lib/queries";
import GalleryCarousel from "@/components/GalleryCarousel";
import AboutCarousel from "@/components/AboutCarousel";
import SectionHead from "@/components/SectionHead";
import { aboutCards, aboutDefaults } from "@/lib/about";
export const metadata={title:"About Us",alternates:{canonical:"/about"}};
export const revalidate=60;
export default async function About(){
  const [page,media]=await Promise.all([getPage("about"),getGallery("customer")]);
  const content=page?.content||{};
  const text=(key:string)=>String(content[key]||aboutDefaults[key]||"");
  return <>
    <section className="section"><div className="container split"><div className="copy"><div className="kicker">{page?.eyebrow}</div><h1>{page?.heading||"About XINSHERN"}</h1><p className="about-text">{page?.body}</p><div className="metric-row">{aboutCards.map(([title,body],i)=><div className="metric" key={i}><strong>{String(content[`about_card_title_${i+1}`]||title)}</strong><span className="about-text">{String(content[`about_card_body_${i+1}`]||body)}</span></div>)}</div></div><AboutCarousel items={page?.media||[]}/></div></section>
    <section className="section architecture-soft"><div className="container about-company-intro"><SectionHead kicker="Our company" title={text("about_intro_title")}/><div className="about-text about-company-body">{text("about_intro_body")}</div></div></section>
    {content.about_gallery_authorized===true&&media.length>0&&<section className="section"><div className="container"><SectionHead title={text("about_gallery_title")} description={text("about_gallery_body")}/><GalleryCarousel items={media}/></div></section>}
  </>;
}
