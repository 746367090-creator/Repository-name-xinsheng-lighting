import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import ContentGrid from "@/components/ContentGrid";
import FAQAccordion from "@/components/FAQAccordion";
import { getContentEntries, getGallery, getPage, getNews } from "@/lib/queries";

export const metadata = {
  title: "LED Lighting Sourcing Guides & Resources",
  description:
    "Buyer guides, company news, purchasing FAQs and product catalogs for global LED lighting buyers.",
  alternates: { canonical: "/resources" }
};

const defaultFAQs = [
  {
    title: "Orders & Customization",
    items: [
      {
        question: "What is your typical minimum order quantity (MOQ)?",
        answer:
          "MOQ depends on the product model, customization requirements and order quantity. Contact our team with your requirements for a project-specific quotation."
      },
      {
        question: "Can I request samples before placing a bulk order?",
        answer:
          "Sample availability, cost and lead time can be discussed with our team before confirming a bulk order."
      },
      {
        question: "Do you offer OEM and ODM services?",
        answer:
          "Yes. We support product customization, private label branding, packaging and product development according to project requirements."
      },
      {
        question: "How long does production take?",
        answer:
          "Lead time depends on product specifications, material availability, sample approval and order quantity. We confirm the schedule during quotation and order review."
      }
    ]
  },
  {
    title: "Quality & Delivery",
    items: [
      {
        question: "How do you manage product quality?",
        answer:
          "Quality requirements can include incoming material inspection, in-process checks, functional testing and final inspection, according to the agreed product specifications."
      },
      {
        question: "Can you customize product packaging?",
        answer:
          "Packaging and private label options can be evaluated based on the product, target market and order requirements."
      }
    ]
  }
];

export default async function Resources() {
  const [all, catalog, page, news, faqPage, customFAQs] = await Promise.all([
    getContentEntries(),
    getGallery("catalog"),
    getPage("resources"),
    getNews(),
    getPage("faq"),
    getContentEntries("faq")
  ]);

  const sections = Array.isArray(page?.content?.sections)
    ? page.content.sections as { title?: string; body?: string }[]
    : [];

  const rows = all.filter(x => ["article", "knowledge"].includes(x.type));

  const faqGroups = customFAQs.length
    ? customFAQs.map(item => ({
        title: item.title,
        items: item.faqs?.length
          ? item.faqs
          : [{ question: item.title, answer: item.content }]
      }))
    : defaultFAQs;

  return (
    <section className="section resources-page">
      <div className="container">
        <div className="resources-intro">
          <SectionHead
            kicker={page?.eyebrow || "Buyer Resources"}
            title={page?.heading || "LED Lighting Sourcing Guides & Resources"}
            description={
              page?.body ||
              "Practical guidance for product selection, sourcing, customization and purchasing decorative LED lighting."
            }
          />
        </div>

        <section id="buyer-guides" className="resource-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 01</span>
              <h2>
                {sections[0]?.title || "LED Lighting Product & Sourcing"}{" "}
                {sections[0]?.body || "Buyer Guides"}
              </h2>
              <p>
                {sections[1]?.body ||
                  "Explore practical guidance on product specifications, customization, samples and supplier evaluation."}
              </p>
            </div>
            <Link
              className="btn-primary"
              href="/contact?application=Buyer%20Guides"
            >
              Get a Quote
            </Link>
          </div>

          {rows.length > 0 ? (
            <>
              <ContentGrid items={rows.slice(0, 3)} base="/resources" />
              {rows.length > 3 && (
                <details className="resources-more">
                  <summary>View All Buyer Guides ({rows.length - 3} more)</summary>
                  <ContentGrid items={rows.slice(3)} base="/resources" />
                </details>
              )}
            </>
          ) : (
            <div className="empty-detail">
              Buyer guides will appear here when published.
              <Link href="/contact" className="text-link">
                Ask our team →
              </Link>
            </div>
          )}
        </section>

        <section id="news" className="resource-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 02</span>
              <h2>News & Updates</h2>
              <p>
                Company updates, product developments and lighting industry
                news from XINSHERN.
              </p>
            </div>
            <div className="resource-module-actions">
              <Link
                className="btn-primary"
                href="/contact?application=News%20and%20Product%20Inquiry"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {news.length > 0 ? (
            <>
              <div className="news-grid">
                {news.slice(0, 3).map(post => (
                  <Link
                    href={`/news/${encodeURIComponent(post.slug)}`}
                    className="card"
                    key={post.id}
                  >
                    <div className="news-cover content-cover-16x9">
                      {post.cover_url ? (
                        <img src={post.cover_url} alt={post.title} />
                      ) : (
                        <span className="accent news-star">✦</span>
                      )}
                    </div>
                    <div className="news-info">
                      <small>{post.category}</small>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <span className="text-link">Read Article →</span>
                    </div>
                  </Link>
                ))}
              </div>
              {news.length > 3 && (
                <details className="resources-more">
                  <summary>View All News ({news.length - 3} more)</summary>
                  <div className="news-grid">
                    {news.slice(3).map(post => (
                      <Link
                        href={`/news/${encodeURIComponent(post.slug)}`}
                        className="card"
                        key={post.id}
                      >
                        <div className="news-cover content-cover-16x9">
                          {post.cover_url ? (
                            <img src={post.cover_url} alt={post.title} />
                          ) : (
                            <span className="accent news-star">✦</span>
                          )}
                        </div>
                        <div className="news-info">
                          <small>{post.category}</small>
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <span className="text-link">Read Article →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </details>
              )}
            </>
          ) : (
            <div className="empty-detail">
              No published news is available yet.
              <Link href="/news" className="text-link">
                Visit News →
              </Link>
            </div>
          )}
        </section>

        <section id="purchasing-faq" className="resource-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 03</span>
              <h2>
                {(faqPage?.heading || "Purchasing Frequently Asked Questions")
                  .replace(/ Questions$/i, "")}
              </h2>
              <p>
                {faqPage?.body ||
                  "Answers about MOQ, samples, customization, production lead times, packaging and delivery."}
              </p>
            </div>
            <div className="resource-module-actions">
              <Link className="btn-secondary" href="/faq">
                Browse FAQ
              </Link>
              <Link
                className="btn-primary"
                href="/contact?application=Purchasing%20Inquiry"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          <div className="resources-faq-expanded">
            {faqGroups.map(group => (
              <section className="resources-faq-group" key={group.title}>
                <h3>{group.title}</h3>
                <FAQAccordion items={group.items || []} />
              </section>
            ))}
          </div>
        </section>

        <section id="product-catalog" className="resource-module resource-catalog-module">
          <div className="resource-module-heading">
            <div>
              <span className="kicker">MODULE 04</span>
              <h2>Product Catalog</h2>
              <p>
                Explore our decorative LED lighting range and identify
                products for your market.
              </p>
            </div>
            <div className="resource-module-actions">
              {catalog.length > 0 ? (
                catalog.map(item => (
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
                ))
              ) : (
                <Link
                  className="btn-primary"
                  href="/contact?application=Product%20Catalog%20Request"
                >
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
