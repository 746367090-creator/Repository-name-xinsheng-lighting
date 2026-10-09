import { homeSteps, homeBuyers, homeFAQs, homeTextDefaults } from "@/lib/homepage";
import type { QA } from "@/lib/types";
export default function HomePageFields({content}:{content:Record<string,unknown>}) {
  const text=(key:string)=>String(content[key]||homeTextDefaults[key]||"");
  const headings=[["products","1. Product series / 产品系列"],["process","3. OEM / ODM / 开发流程"],["factory","4. Factory & quality / 工厂质量"],["cases","5. Project cases / 授权案例"],["buyers","6. Buyer services / 买家服务"],["faq","7. FAQ / 常见问题"],["inquiry","8. Inquiry / 询盘入口"]];
  return <>
    <h3>Homepage sections / 首页板块</h3>
    <p className="hint">客户名称、品牌Logo、证书、专利和数据须有真实依据与公开授权。没有授权的客户Logo不会自动出现在首页。</p>
    {headings.map(([key,label])=><div key={key}><h4>{label}</h4><div className="admin-form-grid"><label>Heading / 标题<input name={`home_${key}_title`} defaultValue={text(`home_${key}_title`)}/></label><label>Description / 介绍<textarea name={`home_${key}_body`} defaultValue={text(`home_${key}_body`)}/></label></div></div>)}
    <p className="hint">首页产品在 产品管理 → 产品 / Products 中勾选“首页展示”。只展示已发布产品，最多6个，按产品排序排列。图片、名称和详情同步读取产品内容。</p>
    <h3>Capability evidence / 制造能力依据</h3>
    <p className="hint">上方 Why Partner 卡片写具体能力。下方链接真实工序、设备资料或适用检测记录，说明证书对应产品及范围。</p>
    {[1,2,3,4].map(i=><div className="admin-form-grid" key={i}><label>Card {i} evidence URL / 依据链接<input name={`why_evidence_${i}`} defaultValue={String(content[`why_evidence_${i}`]||"")} placeholder="/factory or https://…"/></label><label>Evidence label / 说明<input name={`why_evidence_label_${i}`} defaultValue={String(content[`why_evidence_label_${i}`]||"View supporting information")}/></label></div>)}
    <label className="check"><input type="checkbox" name="home_stats_verified" defaultChecked={content.home_stats_verified===true}/> 上方数据已核实且允许公开 / Statistics verified for public display</label>
    <h3>Development steps / 五步合作流程</h3>
    {homeSteps.map(([title,body],i)=><div className="admin-form-grid" key={title}><label>Step {i+1} title<input name={`home_step_title_${i+1}`} defaultValue={String(content[`home_step_title_${i+1}`]||title)}/></label><label>Description<textarea name={`home_step_body_${i+1}`} defaultValue={String(content[`home_step_body_${i+1}`]||body)}/></label></div>)}
    <h3>Factory photographs / 工厂照片与视频</h3>
    <p className="hint">下方 Home Page Images 前4张用于工厂板块，首屏仍读取原有轮播。请上传真实设备、工序、检验或测试照片。Home没有图片时读取 Media Library → factory 前4项。删除图片后后续图片前移，请核对说明。</p>
    <label className="check"><input type="checkbox" name="home_photos_verified" defaultChecked={content.home_photos_verified===true}/> 已确认照片真实且允许公开 / Photos authentic and cleared for public use</label>
    {[1,2,3,4].map(i=><div className="admin-form-grid" key={i}><label>Photo {i} title / 设备工序名称<input name={`home_factory_title_${i}`} defaultValue={String(content[`home_factory_title_${i}`]||"")}/></label><label>Photo {i} caption / 检测对象或记录说明<textarea name={`home_factory_body_${i}`} defaultValue={String(content[`home_factory_body_${i}`]||"")}/></label></div>)}
    <h3>Public project cases / 首页案例</h3>
    <label>Case slugs / 案例Slug（每行一个，最多3个）<textarea name="home_case_slugs" defaultValue={String(content.home_case_slugs||"")}/></label>
    <label className="check"><input type="checkbox" name="home_cases_authorized" defaultChecked={content.home_cases_authorized===true}/> 所列案例及客户信息已获公开授权 / Listed cases authorized for public display</label>
    <p className="hint">在 Applications → Case 修改案例图片与正文。首页只展示已选中的已发布案例，未选或未确认授权则不显示案例卡片。</p>
    <h3>Buyer services / 买家服务</h3>
    {homeBuyers.map(([title,body],i)=><div className="admin-form-grid" key={title}><label>Buyer {i+1} title<input name={`home_buyer_title_${i+1}`} defaultValue={String(content[`home_buyer_title_${i+1}`]||title)}/></label><label>Description<textarea name={`home_buyer_body_${i+1}`} defaultValue={String(content[`home_buyer_body_${i+1}`]||body)}/></label></div>)}
    <label>Homepage FAQ / 每行 Question | Answer<textarea name="home_faqs" rows={12} defaultValue={(Array.isArray(content.home_faqs)&&content.home_faqs.length?content.home_faqs as QA[]:homeFAQs).map(item=>`${item.question} | ${item.answer}`).join("\n")}/></label>
    <p className="hint">MOQ、打样费用、交期、认证按真实条件填写。留空使用按项目确认的基础问答。</p>
    <div className="admin-form-grid"><label>Form title / 表单标题<input name="home_form_title" defaultValue={text("home_form_title")}/></label><label>Appointment button / 预约按钮<input name="home_appointment_label" defaultValue={text("home_appointment_label")}/></label></div>
    <p className="hint">预约入口收集要求和期望时间，不会自动确认日程。</p>
  </>;
}
