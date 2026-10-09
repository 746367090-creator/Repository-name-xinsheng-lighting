import Link from "next/link";
import { Suspense } from "react";
import { getPage, getGallery } from "@/lib/queries";
import RichContent from "@/components/RichContent";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";
import type { QA } from "@/lib/types";
export const metadata = {title:"OEM & ODM Lighting Manufacturer for Global Brands",description:"Lighting product development, customization, manufacturing, quality assurance and project support for global brands, importers and retailers.",alternates:{canonical:"/oem-odm"}};
const blocks = [
  ["Product Development", "Discuss your concept, product design, functions and sample requirements. Our team reviews feasibility and defines the development scope, including any work that needs specialist partners."],
  ["Customization Options", "Explore product appearance, colors, lighting effects, controls, materials, branding and packaging. Available options depend on the product and project requirements."],
  ["Manufacturing Capabilities", "Review production, assembly, packing and inspection requirements with our team. Ask about the facilities and processes relevant to your product before confirming your order."],
  ["Quality Assurance", "Agree material checks, in-process inspection, finished-product testing and sampling criteria. Discuss the test reports required for your target market."],
  ["OEM Project Workflow", "Project brief → feasibility review → quotation → sample development → sample approval → production → inspection and shipment. Confirm scope and milestones with our team."],
  ["MOQ & Lead Time", "MOQ, sampling costs and production lead time are confirmed for each project. Design complexity, materials, testing, packaging and order quantity affect the quotation and schedule."],
];
const defaultFAQs: QA[] = [
  {question:"What should I send to start an OEM project?",answer:"Share product references, your target market, required functions, estimated order quantity, branding and packaging needs, and your launch timeline."},
  {question:"Can I request a sample before production?",answer:"Discuss your sample requirements with our team. Sample scope, cost and timing are confirmed before development begins."},
  {question:"How are MOQ and lead time determined?",answer:"Our team reviews product design, materials, customization, testing and order quantity before confirming MOQ and the schedule."},
];
export default async function OEM() {
  const [page, factory] = await Promise.all([getPage("oem-odm"), getGallery("factory")]);
  const content = page?.content || {};
  const saved = Array.isArray(content.sections) ? content.sections as {title?:string;body?:string}[] : [];
  const images = (page?.media || []).filter(item=>item.type==="image");
  const fallback = factory.find(item=>item.media_type==="image");
  const hero = images[0]?.url || fallback?.media_url;
  const heading = !page?.heading || page.heading === "Lighting products shaped around your brand" ? "OEM & ODM Lighting Manufacturer for Global Brands" : page.heading;
  const tags = String(content.oem_tags || "Custom Product Development,Private Label,Custom Packaging,Quality Control").split(",").map(s=>s.trim()).filter(Boolean);
  const faqs = Array.isArray(content.oem_faqs) && content.oem_faqs.length ? content.oem_faqs as QA[] : defaultFAQs;
  return <><section className="section"><div className="container oem-editorial">
    {hero ? <img src={hero} alt={images[0]?.alt || "XINSHERN lighting development and manufacturing"} className="oem-hero-image"/> : <div className="oem-image-placeholder">Product development · Manufacturing · Customization</div>}
    <div className="kicker">{page?.eyebrow || "OEM & ODM Services"}</div><h1>{heading}</h1><p className="oem-intro">{page?.body || "From concept to mass production, XINSHERN helps brands, importers and retailers develop customized lighting products with tailored designs, packaging and manufacturing support."}</p>
    <div className="tags oem-tags">{tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div>
    <div className="oem-project-panel"><h2>{String(content.oem_project_title || "Start Your OEM Project")}</h2><p>{String(content.oem_project_body || "Tell us what you want to develop, your target market and estimated order quantity. Our team will review your requirements and discuss the next steps.")}</p><div className="hero-actions"><Link href="/contact?type=OEM%20%2F%20ODM%20Request" className="btn-primary">{String(content.oem_button_label || "Request an OEM Quote")}</Link><a href="#oem-inquiry" className="btn-secondary">Discuss Your Project</a></div></div>
    <div className="oem-content-sections">{blocks.map(([title,body],i)=><section className="oem-content-block" key={title}><div className="kicker">0{i+1}</div><h2>{saved[i]?.title || title}</h2><RichContent html={saved[i]?.body || body}/>{images[i+1] && <img src={images[i+1].url} alt={images[i+1].alt || saved[i]?.title || title} className="oem-block-image" loading="lazy"/>}</section>)}</div>
    <section className="oem-content-block"><div className="kicker">Questions before you start</div><h2>OEM / ODM FAQ</h2><FAQAccordion items={faqs}/></section>
    <section id="oem-inquiry" className="oem-content-block"><div className="kicker">Your project brief</div><h2>Discuss Your OEM Project</h2><Suspense fallback={<p>Loading inquiry form…</p>}><ContactForm defaultInquiryType="OEM / ODM Request"/></Suspense></section>
  </div></section></>;
}
