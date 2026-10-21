import HomePageFields from "@/components/admin/HomePageFields";
import PageMediaUploader from "@/components/admin/PageMediaUploader";
import type { GalleryItem, SitePage } from "@/lib/types";
import RichTextEditor from "@/components/admin/RichTextEditor";
import WhyImageUploader from "./WhyImageUploader";
import DynamicSectionsEditor from "./DynamicSectionsEditor";
import { pageFAQs } from "@/lib/faq";

const whyDefaults = [
  ["Product development", "Discuss the design brief, sample requirements and specifications for your product."],
  ["Manufacturing process", "Review the equipment and production steps relevant to your order."],
  ["Inspection requirements", "Agree inspection checkpoints and request the applicable test records."],
  ["Packaging & delivery", "Confirm packaging, labeling and shipment requirements for your market."],
];

export default function PageForm({ page, factoryGallery = [], action }: { page: SitePage; factoryGallery?: GalleryItem[]; action: (form: FormData) => void }) {
  const sections = Array.isArray(page.content?.sections) ? page.content.sections as any[] : [];
  const content = page.content || {};
  const faqRows = pageFAQs(content, page.body);

  return <form id={`page-${page.slug}`} className="admin-form" action={action}>
    <h2>{page.title}</h2>
    <label>Admin Label / Page Title<input name="title" defaultValue={page.title}/></label>
    <label>Eyebrow Text<input name="eyebrow" defaultValue={page.eyebrow}/></label>
    <label>Main Heading<input name="heading" defaultValue={page.heading}/></label>
    <div className="main-description-field">
      {["applications", "resources"].includes(page.slug)
        ? <RichTextEditor
            name="body"
            label="Main Description / 主描述"
            defaultValue={page.body || ""}
          />
        : <label>{page.slug==="faq"?"FAQ Introduction / FAQ 简介":"Main Description"}<textarea name="body" defaultValue={page.slug==="faq"?String(content.faq_intro||""):page.body}/></label>
      }
    </div>

    {page.slug === "home" && <>
      <h3>Homepage Buttons</h3>
      <div className="admin-form-grid">
        <label>Inquiry Button Label<input name="cta_label" defaultValue={String(content.cta_label || "Submit Project Requirements")}/></label>
        <label>Inquiry Button Link<input name="cta_url" defaultValue={String(content.cta_url || "/#project-inquiry")}/></label>
        <label>Catalog Button Label<input name="catalog_label" defaultValue={String(content.catalog_label || "Download Catalog")}/></label>
        <label>Catalog PDF URL<input name="catalog_url" defaultValue={String(content.catalog_url || "")}/></label>
      </div>

      <h3>Verified Statistics / 经核实数据</h3>
      <p className="hint">Use verified figures only. Leave a value empty to hide it; keep factory area consistent with the Factory page.</p>
      {[ ["15", "YEARS IN LIGHTING INDUSTRY"], ["20", "DAILY PRODUCTION CAPACITY"], ["50000", "FACTORY AREA (M²)"], ["20", "EXPORT MARKETS SERVED"] ].map(([value, label], i) => <div className="admin-form-grid" key={i}>
        <label>Statistic {i + 1} Value<input name={`stat_value_${i + 1}`} defaultValue={String(content[`stat_value_${i + 1}`] || "")}/></label>
        <label>Statistic {i + 1} Label<input name={`stat_label_${i + 1}`} defaultValue={String(content[`stat_label_${i + 1}`] || label)}/></label>
      </div>)}

      <h3>Why Partner With Us Section</h3>
      <div className="admin-form-grid">
        <label>Black Title<input name="why_title" defaultValue={String(content.why_title || "Review the capabilities")}/></label>
        <label>Orange Title<input name="why_accent" defaultValue={String(content.why_accent || "behind your product")}/></label>
      </div>
      <label>Section Description<input name="why_description" defaultValue={String(content.why_description || "Discuss the manufacturing process and supporting evidence relevant to your project.")}/></label>
      {whyDefaults.map(([title, body], i) => <div className="admin-form-grid" key={title}>
        <WhyImageUploader
          index={i+1}
          value={String(content[`why_image_${i+1}`] || "")}
        />
        <label>Card {i + 1} Title<input name={`why_card_title_${i + 1}`} defaultValue={String(content[`why_card_title_${i + 1}`] || title)}/></label>
        <RichTextEditor
          name={`why_card_body_${i + 1}`}
          label={`Card ${i + 1} Description`}
          defaultValue={String(content[`why_card_body_${i + 1}`] || body)}
        />
      </div>)}
      <HomePageFields content={content}/>

<h3>Factory & Quality Images / 工厂质量图片</h3>

{[
["LED Lighting Production Workshop",
"A view of the lighting production and assembly area, showing the working environment and manufacturing activities."],
["Product Assembly & Manufacturing",
"Lighting product assembly operations, including component preparation, product assembly and manufacturing coordination."],
["Quality Control Process",
"Quality inspection procedures and production control process."],
["Manufacturing Capabilities",
"Factory capabilities, production support and customer cooperation."]
].map(([title,body],i)=>
<div className="admin-form-grid" key={i}>

<label>
Factory Image {i+1} Upload / 上传图片
<input
type="file"
name={`home_factory_image_file_${i+1}`}
accept="image/*"
/>
<input
type="hidden"
name={`home_factory_image_${i+1}`}
value={String(content[`home_factory_image_${i+1}`] || "")}
/>
</label>

<label>
Factory Title {i+1}
<input
name={`home_factory_title_${i+1}`}
defaultValue={String(content[`home_factory_title_${i+1}`] || title)}
/>
</label>

<label>
Factory Description {i+1}
<textarea
name={`home_factory_body_${i+1}`}
defaultValue={String(content[`home_factory_body_${i+1}`] || body)}
/>
</label>

</div>
)}
    </>}

    {page.slug === "factory" && <>
      <h3>Factory Sections / 工厂图文</h3>
      <p className="hint">每一组文字对应一张图片或视频。可直接在这里查看、替换或删除，保存后同步更新 Factory 页面。</p>
      <DynamicSectionsEditor initial={sections} media={factoryGallery}/>
    </>}
    {page.slug === "faq" && <>
      <h3>FAQ Questions &amp; Answers / 常见问题</h3>
      <p className="hint">每行填写一组：Question | Answer。前台会自动显示为可展开和收起的 FAQ，不要粘贴 HTML 标签。</p>
      <label>FAQ Rows / FAQ 内容<textarea name="page_faqs" className="faq-rows-editor" defaultValue={faqRows.map(item=>`${item.question} | ${item.answer}`).join("\n")} placeholder="What is your MOQ? | MOQ depends on the model and quantity."/></label>
    </>}
    {page.slug === "oem-odm" && <>
      <h3>OEM / ODM 图片与文字</h3>
      <label>Hero Image / 顶部主图（上传新图片即可替换现有主图）
        <input type="file" name="oem_hero_image_file" accept="image/*"/>
      </label>
      <p className="hint">上传后点击页面底部 Save。新图片将替换顶部主图，其他板块图片保持不变。</p>
      <p className="hint">图片顺序：第一张为顶部大图；第二至第七张对应下方六个板块。上传后保存生效。推荐使用真实产品开发或工厂照片。</p>
      <label>Capability tags / 能力标签（英文逗号分隔）<input name="oem_tags" defaultValue={String(content.oem_tags || "Custom Product Development,Private Label,Custom Packaging,Quality Control")}/></label>
      <label>Project title / 咨询标题<input name="oem_project_title" defaultValue={String(content.oem_project_title || "Start Your OEM Project")}/></label>
      <label>Project description / 咨询介绍<textarea name="oem_project_body" defaultValue={String(content.oem_project_body || "Tell us what you want to develop, your target market and estimated order quantity. Our team will review your requirements and discuss the next steps.")}/></label>
      <label>Button label / 按钮文字<input name="oem_button_label" defaultValue={String(content.oem_button_label || "Request an OEM Quote")}/></label>
      <h3>OEM / ODM Workflow Cards / 流程卡片编辑</h3>
      <p className="hint">分别编辑四套流程的标题和每一步文字。前台使用网页原生文字展示，不需要上传流程图图片。</p>
      {[
        {
          key: "workflow_existing_oem",
          title: "Existing Product · OEM",
          steps: [
            "Customer puts forward modification requirements",
            "Recommend existing product solution",
            "Evaluate modification scope",
            "Quotation & order confirmation",
            "Make revised sample",
            "Customer sample confirmation",
            "Material procurement + IQC incoming inspection",
            "Mass production | Aging test",
            "Finished product inspection",
            "Inspection & shipment"
          ]
        },
        {
          key: "workflow_existing_odm",
          title: "Existing Product · ODM",
          steps: [
            "Customer puts forward modification requirements",
            "Recommend existing product solution",
            "Evaluate modification scope",
            "Quotation & order confirmation",
            "Make revised sample",
            "Customer sample confirmation",
            "Material procurement + IQC incoming inspection",
            "Mass production | Aging test",
            "Finished product inspection",
            "Inspection & shipment"
          ]
        },
        {
          key: "workflow_new_oem",
          title: "New Product Development · OEM",
          steps: [
            "Customer provides new drawings / 3D model",
            "Engineering DFM review",
            "Quotation (mold + production) & order confirmation",
            "Prototype making",
            "Customer prototype confirmation",
            "Mold opening + trial mold & mold revision",
            "Pre-production PP sample making",
            "Customer PP sample sign-off",
            "Material procurement + IQC incoming inspection",
            "Mass production | Aging test",
            "Finished product inspection",
            "Inspection & shipment"
          ]
        },
        {
          key: "workflow_new_odm",
          title: "New Product Development · ODM",
          steps: [
            "Customer puts forward new product concept",
            "Factory structural & electronic design",
            "3D modeling & DFM review",
            "Quotation & order confirmation",
            "Prototype making",
            "Customer prototype confirmation",
            "New mold opening + repeated mold revision",
            "Pre-production PP sample making",
            "Customer PP sample sign-off",
            "Material procurement + IQC incoming inspection",
            "Mass production | Aging test",
            "Finished product inspection",
            "Inspection & shipment"
          ]
        }
      ].map((workflow) => (
        <div className="admin-workflow-editor" key={workflow.key}>
          <h4>{workflow.title}</h4>
          <label>Workflow Title / 流程标题
            <input
              name={`${workflow.key}_title`}
              defaultValue={String(content[`${workflow.key}_title`] || workflow.title)}
            />
          </label>
          <div className="admin-form-grid">
            {workflow.steps.map((step, index) => (
              <label key={`${workflow.key}_${index + 1}`}>
                Step {index + 1} / 步骤 {index + 1}
                <input
                  name={`${workflow.key}_${index + 1}`}
                  defaultValue={String(content[`${workflow.key}_${index + 1}`] || step)}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
      <label>OEM FAQ / 问答（每行 Question | Answer）<textarea name="oem_faqs" defaultValue={Array.isArray(content.oem_faqs) ? (content.oem_faqs as {question:string;answer:string}[]).map(item=>`${item.question} | ${item.answer}`).join("\n") : ""}/></label>
    </>}

    {page.slug === "applications" && <>
  <h3>Applications Capability / 应用能力模块</h3>

  {[
    ["OEM / ODM Development",
    "From concept development to mass production, we support customized lighting projects."],
    ["Custom Lighting Solutions",
    "Product design, packaging and private label solutions for global brands."],
    ["Quality Control",
    "Inspection and production management throughout the manufacturing process."],
    ["Global Supply Support",
    "Reliable export support for distributors, retailers and international buyers."]
  ].map(([title,body],i)=>
    <div className="admin-form-grid" key={i}>

      <label>
        Capability Image {i+1} / 图片
        <input
          type="file"
          name={`application_image_file_${i+1}`}
          accept="image/*"
        />
        <input
          type="hidden"
          name={`application_image_${i+1}`}
          defaultValue={String(content[`application_image_${i+1}`] || "")}
        />
      </label>

      <label>
        Capability Title {i+1}
        <input
          name={`application_title_${i+1}`}
          defaultValue={String(content[`application_title_${i+1}`] || title)}
        />
      </label>

      <label>
        Capability Description {i+1}
        <textarea
          name={`application_body_${i+1}`}
          defaultValue={String(content[`application_body_${i+1}`] || body)}
        />
      </label>

    </div>
  )}
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

    <h2>SEO &amp; AI / GEO</h2>
    <div className="admin-seo-grid">
      <label>SEO Title<input name="page_seo_title" defaultValue={String(content.page_seo_title || "")}/></label>
      <label>SEO Keywords<input name="page_seo_keywords" defaultValue={String(content.page_seo_keywords || "")}/></label>
    </div>
    <label className="seo-description-field">SEO Description<textarea name="page_seo_description" defaultValue={String(content.page_seo_description || "")}/></label>
    <label>AI Summary<textarea name="page_ai_summary" defaultValue={String(content.page_ai_summary || "")}/></label>

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
