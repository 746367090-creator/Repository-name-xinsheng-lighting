import type { QA } from "./types";

export const homeSteps = [
  ["Share your requirements", "Tell us the product, target market, estimated quantity and desired launch date."],
  ["Review the proposal", "Discuss feasibility, specifications, quotation and sample costs."],
  ["Confirm the sample", "Review the sample and agree the functions, finish and packaging."],
  ["Production & inspection", "Confirm the order, inspection requirements and production schedule."],
  ["Arrange delivery", "Agree shipment arrangements and the documents needed for your order."],
];
export const homeBuyers = [
  ["Brands", "Discuss product development, private label and packaging for your collection."],
  ["Importers", "Share your market, product specifications and shipment requirements."],
  ["Retailers", "Discuss your assortment, packaging format and replenishment plans."],
  ["E-commerce sellers", "Review product presentation, labeling and fulfillment requirements."],
];
export const homeFAQs: QA[] = [
  {question:"What is the minimum order quantity?",answer:"MOQ depends on the product, customization and packaging. Send the product or model and your expected quantity for confirmation."},
  {question:"How do I request a sample?",answer:"Share your chosen product or development brief. Sample availability, costs and timing will be confirmed before you proceed."},
  {question:"What is the production lead time?",answer:"Timing depends on the product, order quantity and sample approval. Ask for the schedule for your specific order."},
  {question:"Can I customize the packaging?",answer:"Share your artwork, packaging format and labeling requirements so we can review feasibility, costs and MOQ."},
  {question:"Which certifications are available?",answer:"Requirements vary by product and destination. Ask for the applicable reports and their scope before placing an order."},
  {question:"How do we start an OEM or ODM project?",answer:"Send your target market, product requirements, estimated quantity and timeline. We will discuss the development scope and sample plan."},
  {question:"How can I discuss a project with your team?",answer:"Submit the inquiry form with your requirements and preferred discussion time, including your time zone."},
];
export const homeTextDefaults: Record<string,string> = {
  home_products_title:"Explore our lighting range", home_products_body:"Choose a product series to view the range and discuss your requirements.",
  home_process_title:"From your brief to delivery", home_process_body:"Start with your requirements. Confirm the sample and order details before production.",
  home_factory_title:"Factory & quality control", home_factory_body:"Explore manufacturing photos, equipment and inspection information. Ask our team for the records relevant to your product.",
  home_cases_title:"Product development cases", home_cases_body:"Explore project requirements, development decisions and the resulting products.",
  home_buyers_title:"Support for your business", home_buyers_body:"Choose your business type and tell us what you need for your market.",
  home_faq_title:"Before you place an order", home_faq_body:"Key questions about samples, production, packaging and compliance.",
  home_inquiry_title:"Tell us what you want to develop", home_inquiry_body:"Share your product, quantity, sales market and customization requirements, or request a time to discuss your project.",
  home_form_title:"Submit your requirements", home_appointment_label:"Arrange a Project Discussion",
};
export const homeStringFields = [
  ...Object.keys(homeTextDefaults), "home_product_categories", "home_case_slugs",
  ...[1,2,3,4].flatMap(i=>[`why_evidence_${i}`,`why_evidence_label_${i}`,`home_buyer_title_${i}`,`home_buyer_body_${i}`,`home_factory_title_${i}`,`home_factory_body_${i}`]),
  ...[1,2,3,4,5].flatMap(i=>[`home_step_title_${i}`,`home_step_body_${i}`]),
];
export function homepageFields(form:FormData) {
  return {
    ...Object.fromEntries(homeStringFields.map(key=>[key,String(form.get(key)||"").trim()])),
    home_stats_verified:form.get("home_stats_verified")==="on",
    home_photos_verified:form.get("home_photos_verified")==="on",
    home_cases_authorized:form.get("home_cases_authorized")==="on",
    home_faqs:String(form.get("home_faqs")||"").split("\n").map(line=>{const[q,...a]=line.split("|");return{question:q.trim(),answer:a.join("|").trim()}}).filter(item=>item.question&&item.answer),
  };
}
export function homepageLink(value:unknown) {
  const url=String(value||"").trim();
  if(url.startsWith("/")&&!url.startsWith("//"))return url;
  try {const parsed=new URL(url);return ["https:","http:"].includes(parsed.protocol)?url:""}catch{return ""}
}
