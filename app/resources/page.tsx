import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import ContentGrid from "@/components/ContentGrid";
import { getContentEntries, getGallery, getPage } from "@/lib/queries";

export const metadata = {
  title: "LED Lighting Sourcing Guides & Resources",
  description: "Buyer guides, company news, purchasing FAQs and product catalogs for global LED lighting buyers.",
  alternates: { canonical: "/resources" }
};

export default async function Resources() {
  const [all, catalog, page] = await Promise.all([
    getContentEntries(),
    getGallery("catalog"),
    getPage("resources")
  ]);

  const sections = Array.isArray(page?.content?.sections)
    ? page.content.sections as { title?: string; body?: string }[]
    : [];

  const rows = all.filter(x => ["article", "knowledge"].includes(x.type));

  return (
    <section className="section resources-page">
      <div className="container">
        <div className="resources-intro">
          <SectionHead
            kicker={page?.eyebrow || "Buyer Resources"}
            title={page?.heading || "LED Lighting Sourcing Guides & Resources"}
            description={page?.body || "Practical guidance for product selection, sourcing, customization and purchasing decorative LED lighting."}
          />
        </div>

        <section id="buyer-guides" className="resource-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 01</span>
              <h2>{sections[0]?.title || "LED Lighting Product & Sourcing Guides"} {sections[0]?.body || "Buyer Guides"}</h2>
              <p>{sections[1]?.body || "Explore practical guidance on product specifications, customization, samples and supplier evaluation."}</p>
            </div>
            <Link className="btn-primary" href="/contact?application=Buyer%20Guides">
              Get a Quote
            </Link>
          </div>

          {rows.length > 0 ? (
            <ContentGrid items={rows} base="/resources" />
          ) : (
            <div className="empty-detail">
              Buyer guides will appear here when published.
              <Link href="/contact?application=Buyer%20Guides" className="text-link">Ask our team →</Link>
            </div>
          )}
        </section>

        <section id="news" className="resource-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 02</span>
              <h2>News & Updates</h2>
              <p>Company updates, product developments and lighting industry news from XINSHERN.</p>
            </div>
            <div className="resource-module-actions">
              <Link className="btn-secondary" href="/news">Read News</Link>
              <Link className="btn-primary" href="/contact?application=News%20and%20Product%20Inquiry">Get a Quote</Link>
            </div>
          </div>
        </section>

        <section id="purchasing-faq" className="resource-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 03</span>
              <h2>Purchasing FAQ</h2>
              <p>Answers about MOQ, samples, customization, production lead times, packaging and delivery.</p>
            </div>
            <div className="resource-module-actions">
              <Link className="btn-secondary" href="/faq">Browse FAQ</Link>
              <Link className="btn-primary" href="/contact?application=Purchasing%20Inquiry">Get a Quote</Link>
            </div>
          </div>
        </section>

        <section id="product-catalog" className="resource-module resource-catalog-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 04</span>
              <h2>Product Catalog</h2>
              <p>Explore our decorative LED lighting range and identify products for your market.</p>
            </div>
            <div className="resource-module-actions">
              {catalog.length > 0 ? catalog.map(item => (
                <a
                  key={item.id}
                  className="btn-primary"
                  href={item.media_url}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  Download Product Catalog
                </a>
              )) : (
                <Link className="btn-primary" href="/contact?application=Product%20Catalog%20Request">
                  Request Product Catalog
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
