import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentEntry } from "@/lib/queries";
import RichContent from "@/components/RichContent";
import FAQAccordion from "@/components/FAQAccordion";
export async function generateMetadata({params}:{params:{slug:string}}){const entry=await getContentEntry(params.slug);if(!entry || entry.type!=="case")return{title:"Case not found"};return{title:entry.seo?.title||entry.title,description:entry.seo?.description||entry.excerpt,alternates:{canonical:`/applications/cases/${entry.slug}`}}}
export default async function CaseDetail({params}:{params:{slug:string}}){const entry=await getContentEntry(params.slug);if(!entry || entry.type!=="case")notFound();return <article className="section"><div className="container content-prose"><Link href="/applications?category=case" className="text-link">← All Cases</Link>{entry.cover_url && <img className="article-cover" src={entry.cover_url} alt={entry.title}/>}<div className="kicker">{entry.category || "Project Case"}</div><h1>{entry.title}</h1><p className="lead">{entry.excerpt}</p><RichContent html={entry.content}/>{entry.faqs?.length ? <FAQAccordion items={entry.faqs}/> : null}<Link href={`/contact?application=${encodeURIComponent(entry.title)}`} className="btn-primary">Discuss a Similar Project</Link></div></article>}
