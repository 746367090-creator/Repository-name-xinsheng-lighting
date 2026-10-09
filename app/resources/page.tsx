import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import ContentGrid from "@/components/ContentGrid";
import { getContentEntries, getGallery } from "@/lib/queries";
export const metadata = {title:"Catalog & Buyer Resources",description:"Product catalogs, lighting guides, purchasing FAQs and company updates from XINSHERN.",alternates:{canonical:"/resources"}};
export default async function Resources() {
  const [all, catalog] = await Promise.all([getContentEntries(), getGallery("catalog")]);
  const rows = all.filter(x => ["article", "knowledge"].includes(x.type));
  return <section className="section"><div className="container"><SectionHead kicker="Buyer Resources" title="Make your next" accent="decision easier" description="Find product information and practical guidance for your sourcing project."/><div className="buyer-paths"><article className="card"><h2>Product Catalog</h2><p>Explore our range and discuss the products that fit your market.</p>{catalog.length ? catalog.map(item => <a className="text-link catalog-download" href={item.media_url} key={item.id} target="_blank" rel="noreferrer">{item.title || "Download catalog"} ↗</a>) : <Link href="/contact" className="text-link">Request the latest catalog →</Link>}</article><Link className="card" href="/faq"><h2>Purchasing FAQ</h2><p>Questions about sampling, customization, ordering and delivery.</p><span className="text-link">Browse questions →</span></Link><Link className="card" href="/news"><h2>News & Updates</h2><p>Product updates, company news and lighting insights.</p><span className="text-link">Read the latest →</span></Link></div>{rows.length > 0 && <div className="resource-articles"><SectionHead title="Product & sourcing" accent="Guides"/><ContentGrid items={rows} base="/resources"/></div>}</div></section>;
}
