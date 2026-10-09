import PageMediaUploader from "@/components/admin/PageMediaUploader";
import type { SitePage } from "@/lib/types";
import RichTextEditor from "@/components/admin/RichTextEditor";

const whyDefaults = [
  ["Product Development", "Design support, samples and production engineering around your brief."],
  ["Factory Direct", "An integrated team for manufacturing, inspection and dependable delivery."],
  ["Global Service", "Export documentation, logistics and Amazon FBA preparation for key markets."],
  ["Quality Assurance", "Defined incoming, in-process and finished-product quality checkpoints."],
];

export default function PageForm({ page, action }: { page: SitePage; action: (form: FormData) => void }) {
  const sections = Array.isArray(page.content?.sections) ? page.content.sections as any[] : [];
  const content = page.content || {};

  return <form id={`page-${page.slug}`} className="admin-form" action={action}>
    <h2>{page.title}</h2>
    <label>Admin Label / Page Title<input name="title" defaultValue={page.title}/></label>
    <label>Eyebrow Text<input name="eyebrow" defaultValue={page.eyebrow}/></label>
    <label>Main Heading<input name="heading" defaultValue={page.heading}/></label>
    <label>Main Description<textarea name="body" defaultValue={page.body}/></label>

    {page.slug === "home" && <>
      <h3>Homepage Buttons</h3>
      <div className="admin-form-grid">
        <label>Inquiry Button Label<input name="cta_label" defaultValue={String(content.cta_label || "Request a Quote")}/></label>
        <label>Inquiry Button Link<input name="cta_url" defaultValue={String(content.cta_url || "/contact")}/></label>
        <label>Catalog Button Label<input name="catalog_label" defaultValue={String(content.catalog_label || "Download Catalog")}/></label>
        <label>Catalog PDF URL<input name="catalog_url" defaultValue={String(content.catalog_url || "")}/></label>
      </div>

      <h3>Homepage Statistics</h3>
      <p className="hint">Use verified figures only. Leave a value empty to hide it; keep factory area consistent with the Factory page.</p>
      {[ ["14+", "Years Experience"], ["3,000", "Units / Day"], ["3,000m²", "Factory Area"], ["20+", "Markets Served"] ].map(([value, label], i) => <div className="admin-form-grid" key={i}>
        <label>Statistic {i + 1} Value<input name={`stat_value_${i + 1}`} defaultValue={String(content[`stat_value_${i + 1}`] || "")}/></label>
        <label>Statistic {i + 1} Label<input name={`stat_label_${i + 1}`} defaultValue={String(content[`stat_label_${i + 1}`] || label)}/></label>
      </div>)}

      <h3>Partner Brands Section</h3>
      <div className="admin-form-grid">
        <label>Small Heading<input name="partner_kicker" defaultValue={String(content.partner_kicker || "Trusted by")}/></label>
        <label>Black Title<input name="partner_title" defaultValue={String(content.partner_title || "Partner")}/></label>
        <label>Orange Title<input name="partner_accent" defaultValue={String(content.partner_accent || "Brands")}/></label>
        <label>Description<input name="partner_description" defaultValue={String(content.partner_description || "Selected customer and partner logos.")}/></label>
      </div>

      <h3>Why Partner With Us Section</h3>
      <div className="admin-form-grid">
        <label>Black Title<input name="why_title" defaultValue={String(content.why_title || "Why Partner")}/></label>
        <label>Orange Title<input name="why_accent" defaultValue={String(content.why_accent || "With Us")}/></label>
      </div>
      <label>Section Description<input name="why_description" defaultValue={String(content.why_description || "From prototype to mass production, we deliver reliable support at every stage")}/></label>
      {whyDefaults.map(([title, body], i) => <div className="admin-form-grid" key={title}>
        <label>Card {i + 1} Title<input name={`why_card_title_${i + 1}`} defaultValue={String(content[`why_card_title_${i + 1}`] || title)}/></label>
        <label>Card {i + 1} Description<textarea name={`why_card_body_${i + 1}`} defaultValue={String(content[`why_card_body_${i + 1}`] || body)}/></label>
      </div>)}
    </>}

    {page.slug === "factory" && <>
      <h3>Factory Sections</h3>
      {[1, 2, 3, 4, 5].map((n, i) => <div className="admin-form-grid" key={n}>
        <label>Section {n} Title<input name={`section_title_${n}`} defaultValue={sections[i]?.title}/></label>
        <RichTextEditor name={`section_body_${n}`} label={`Section ${n} Description`} defaultValue={String(sections[i]?.body || "")}/>
      </div>)}
    </>}
    {page.slug === "oem-odm" && <>
      <h3>OEM / ODM 图片与文字</h3>
      <p className="hint">图片顺序：第一张为顶部大图；第二至第七张对应下方六个板块。上传后保存生效。推荐使用真实产品开发或工厂照片。</p>
      <label>Capability tags / 能力标签（英文逗号分隔）<input name="oem_tags" defaultValue={String(content.oem_tags || "Custom Product Development,Private Label,Custom Packaging,Quality Control")}/></label>
      <label>Project title / 咨询标题<input name="oem_project_title" defaultValue={String(content.oem_project_title || "Start Your OEM Project")}/></label>
      <label>Project description / 咨询介绍<textarea name="oem_project_body" defaultValue={String(content.oem_project_body || "Tell us what you want to develop, your target market and estimated order quantity. Our team will review your requirements and discuss the next steps.")}/></label>
      <label>Button label / 按钮文字<input name="oem_button_label" defaultValue={String(content.oem_button_label || "Request an OEM Quote")}/></label>
      {["Product Development","Customization Options","Manufacturing Capabilities","Quality Assurance","OEM Project Workflow","MOQ & Lead Time"].map((title,i)=><div className="admin-form-grid" key={title}>
        <label>Section {i+1} title / 标题<input name={`section_title_${i+1}`} defaultValue={sections[i]?.title || title}/></label>
        <RichTextEditor name={`section_body_${i+1}`} label={`Section ${i+1} description / 正文`} defaultValue={String(sections[i]?.body || "")}/>
      </div>)}
      <label>OEM FAQ / 问答（每行 Question | Answer）<textarea name="oem_faqs" defaultValue={Array.isArray(content.oem_faqs) ? (content.oem_faqs as {question:string;answer:string}[]).map(item=>`${item.question} | ${item.answer}`).join("\n") : ""}/></label>
    </>}

    {page.slug === "resources" && <>
      <h3>Product &amp; sourcing Guides 栏目</h3>
      <div className="admin-form-grid">
        <label>Title / 标题<input name="section_title_1" defaultValue={String(sections[0]?.title || "Product & sourcing")}/></label>
        <label>Accent / 强调文字<input name="section_body_1" defaultValue={String(sections[0]?.body || "Guides")}/></label>
        <label>Small heading / 小标题<input name="section_title_2" defaultValue={String(sections[1]?.title || "Buyer Knowledge")}/></label>
        <label>Description / 介绍<textarea name="section_body_2" defaultValue={String(sections[1]?.body || "Product selection, customization and sourcing guidance for your next lighting project.")}/></label>
      </div>
      <p className="hint">下方 Page Images 第一张图片作为栏目图片。每篇指南的封面和正文，请在 Product &amp; sourcing Guides 中编辑。</p>
    </>}

    {page.slug === "products" && <>
      <h3>All Products Search</h3>
      <div className="admin-form-grid">
        <label>Search Box Placeholder<input name="section_title_1" defaultValue={String(sections[0]?.title || "Search by product name, model or category")}/></label>
        <label>Search Label<input name="section_body_1" defaultValue={String(sections[0]?.body || "Search all products")}/></label>
        <label>No Results Message<input name="section_title_2" defaultValue={String(sections[1]?.title || "No matching products found.")}/></label>
        <label>Product Count Label<input name="section_body_2" defaultValue={String(sections[1]?.body || "products")}/></label>
      </div>
    </>}

    {page.slug === "contact" && <>
      <h3>Contact Details</h3>
      <label>Company Name<input name="section_title_1" defaultValue={String(sections[0]?.title || "Shenzhen Xinshern Technology Co., Ltd.")}/></label>
      <input type="hidden" name="section_body_1" value=""/>
      <div className="admin-form-grid">
        <label>Head Office Label<input name="section_title_2" defaultValue={String(sections[1]?.title || "Head Office")}/></label>
        <label>Head Office Address<textarea name="section_body_2" defaultValue={String(sections[1]?.body || "#388 Dongchang Road, Fenghuang Street, Guangming District, Shenzhen, China")}/></label>
        <label>Factory Address Label<input name="section_title_3" defaultValue={String(sections[2]?.title || "Factory Address")}/></label>
        <label>Factory Address<textarea name="section_body_3" defaultValue={String(sections[2]?.body || "#106 LingNan Road, Tangxia Town, Dongguan, China")}/></label>
        <label>Email Label<input name="section_title_4" defaultValue={String(sections[3]?.title || "Email")}/></label>
        <label>Email Address<input type="email" name="section_body_4" defaultValue={String(sections[3]?.body || "sales@szxinshengtech.com")}/></label>
        <label>Factory Tours Label<input name="section_title_5" defaultValue={String(sections[4]?.title || "Factory Tours")}/></label>
        <label>Factory Tours Description<textarea name="section_body_5" defaultValue={String(sections[4]?.body || "Visits are welcome by appointment.")}/></label>
      </div>
    </>}

    <label>External Video URL<input name="video_url" defaultValue={String(content.video_url || "")} placeholder="YouTube or hosted video URL"/></label>
    {content.video_url ? <label className="delete-media-check delete-external-video">
      <input type="checkbox" name="delete_external_video"/> Delete external video link
    </label> : null}
    {page.media?.length ? <div>
      <h3>Current Page Images / Videos</h3>
      <p className="hint">Select Delete below any file, then click the orange Save button to remove it. Every image and video can be deleted.</p>
      <div className="admin-media-grid">{page.media.map((m, i) => <div className="admin-media" key={`${m.url}-${i}`}>
        {m.type === "video" ? <video src={m.url} controls/> : <img src={m.url} alt={m.alt || ""}/>}
        <div className="admin-media-control">
          <label className="delete-media-check"><input type="checkbox" name={`delete_page_media_${i}`}/> Delete this {m.type === "video" ? "video" : "image"}</label>
        </div>
      </div>)}</div>
    </div> : null}
    <PageMediaUploader currentCount={page.media?.length || 0}/>
    <label className="check"><input type="checkbox" name="published" defaultChecked={page.published}/> Published</label>
    <button className="btn-primary">Save {page.title}</button>
  </form>;
}
