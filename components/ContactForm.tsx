"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
const inquiryTypes = ["Product Purchase", "OEM / ODM Request", "Sample Request", "Technical Support"];
export default function ContactForm({defaultInquiryType="Product Purchase",heading="Tell us about your project"}:{defaultInquiryType?:string;heading?:string}) {
  const params = useSearchParams();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const requestedType = params.get("type") || "";
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const formElement = event.currentTarget;
    setSending(true); setStatus("Sending your inquiry…");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: new FormData(formElement) });
      const result = await response.json();
      setStatus(typeof result.message === "string" ? result.message : "Unable to send. Please try again or email sales@szxinshengtech.com.");
      if (response.ok) formElement.reset();
    } catch { setStatus("Connection interrupted. Please try again or email sales@szxinshengtech.com."); }
    finally { setSending(false); }
  }
  return <form className="card form-card" onSubmit={submit} aria-busy={sending}><h2>{heading}</h2><div className="form-grid">
    <label className="architecture-form-label">Full name *<input className="field" name="full_name" autoComplete="name" required/></label>
    <label className="architecture-form-label">Company<input className="field" name="company_name" autoComplete="organization"/></label>
    <label className="architecture-form-label">Email *<input className="field" name="email" type="email" autoComplete="email" required/></label>
    <label className="architecture-form-label">Phone / WhatsApp<input className="field" name="phone" type="tel" autoComplete="tel"/></label>
    <label className="architecture-form-label">Country / region<input className="field" name="country" autoComplete="country-name"/></label>
    <label className="architecture-form-label">Product / model<input className="field" name="product" defaultValue={params.get("product") || ""}/></label>
    <label className="architecture-form-label">Expected quantity<input className="field" name="quantity" placeholder="e.g. 500 pieces"/></label>
    <label className="architecture-form-label">Application<input className="field" name="application" defaultValue={params.get("application") || ""} placeholder="e.g. retail gifting"/></label>
    <label className="architecture-form-label full">Inquiry type<select className="field" name="inquiry_type" defaultValue={inquiryTypes.includes(requestedType) ? requestedType : (inquiryTypes.includes(defaultInquiryType) ? defaultInquiryType : "Product Purchase")}>{inquiryTypes.map(type => <option key={type}>{type}</option>)}</select></label>
    <input type="hidden" name="annual_volume" value=""/>
    <label className="architecture-form-label full">Project requirements *<textarea className="field" name="message" placeholder="Target market, required functions, customization, quantity and timeline…" required/></label>
    <button className="btn-primary full" type="submit" disabled={sending}>{sending ? "Sending…" : "Send Your Inquiry"}</button>
    <p className="form-status full" role="status" aria-live="polite">{status || "Your information is used to respond to your inquiry. For drawings or project files, email sales@szxinshengtech.com."}</p>
  </div></form>;
}
