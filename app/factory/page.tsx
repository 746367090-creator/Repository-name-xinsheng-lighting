import { getGallery, getPage } from "@/lib/queries";
import SectionHead from "@/components/SectionHead";
import GalleryCarousel from "@/components/GalleryCarousel";
import RichContent from "@/components/RichContent";

export const metadata = { title: "Factory" };

function youtubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    let id = "";
    if (url.hostname === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    if (url.hostname.includes("youtube.com")) {
      id = url.searchParams.get("v") || (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/") ? url.pathname.split("/")[2] : "");
    }
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
  } catch {
    return "";
  }
}

export default async function FactoryPage() {
  const [page, gallery] = await Promise.all([getPage("factory"), getGallery("factory")]);
  const defaults = [
    ["Factory Overview", "Production, R&D and warehousing space supporting lighting development and mass production."],
    ["Incoming Quality Control", "Materials and key components are checked before production."],
    ["Finished Product Control", "Function, appearance, electrical safety and packaging checks are completed before shipment."],
    ["Product Development", "Our team supports structure, optics, electronics, samples and production engineering."],
    ["Additional Services", "Logistics, compliance, Amazon FBA preparation, warehousing and mixed-container support."],
  ];
  const saved = Array.isArray(page?.content?.sections) ? page.content.sections as any[] : [];
  const blocks = defaults.map((item, index) => [saved[index]?.title || item[0], saved[index]?.body || item[1]]);
  const externalVideo = typeof page?.content?.video_url === "string" ? page.content.video_url.trim() : "";
  const embedVideo = youtubeEmbedUrl(externalVideo);
  const uploadedMedia = page?.media?.find(item => item.type === "video") || page?.media?.[0];

  return <>
    <section className="section"><div className="container">
      <SectionHead kicker={page?.eyebrow} title={(page?.heading || "Inside Our Factory").replace(/ Factory$/, " ")} accent="Factory" description={page?.body}/>
      {externalVideo ? <div className="media-panel">
        {embedVideo ? <iframe src={embedVideo} title="Xinshern factory video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{width:"100%",height:"100%",border:0}}/> : <video src={externalVideo} controls playsInline/>}
      </div> : uploadedMedia ? <div className="media-panel">{uploadedMedia.type === "video" ? <video src={uploadedMedia.url} controls playsInline/> : <img src={uploadedMedia.url} alt="Xinshern factory"/>}</div> : null}
    </div></section>
    <div className="section-divider"/>
    <section className="section"><div className="container">{blocks.map((block, index) => <div className="split" key={String(block[0])} style={{marginBottom:80}}><div className={index % 2 ? "copy order-last" : "copy"}><div className="kicker">0{index + 1}</div><h2>{block[0]}</h2><RichContent html={String(block[1])} className="factory-rich-content"/></div><div className="media-panel factory-square">{gallery[index] ? (gallery[index].media_type === "video" ? <video src={gallery[index].media_url} controls/> : <img src={gallery[index].media_url} alt={gallery[index].title}/>) : <div className="light-orb"/>}</div></div>)}</div></section>
    <section className="section section-divider"><div className="container"><SectionHead title="Factory" accent="Gallery"/><GalleryCarousel items={gallery}/></div></section>
  </>;
}
