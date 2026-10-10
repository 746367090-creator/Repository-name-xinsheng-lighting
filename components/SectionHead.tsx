import sanitizeHtml from "sanitize-html";

export default function SectionHead({
  kicker, title, accent, description
}: {
  kicker?: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  const safe = sanitizeHtml(description || "", {
    allowedTags: [
      "p", "br", "div", "span", "font",
      "strong", "b", "em", "i", "u",
      "h2", "h3", "h4", "ul", "ol", "li",
      "blockquote", "a"
    ],
    allowedAttributes: {
      "*": ["style"],
      "font": ["color", "size", "style"],
      "a": ["href", "title"]
    },
    allowedStyles: {
      "*": {
        "color": [/^#[0-9a-fA-F]{3,8}$/, /^rgb\\([0-9, ]+\\)$/],
        "font-size": [/^(?:1[2-9]|2[0-9]|3[0-9]|40)px$/],
        "text-align": [/^(left|center|right)$/],
        "font-weight": [/^(normal|bold|[1-9]00)$/],
        "font-style": [/^(normal|italic)$/],
        "text-decoration": [/^(underline|none)$/]
      }
    }
  });

  return (
    <div className="section-head">
      {kicker && <div className="kicker">{kicker}</div>}
      <h2>{title} {accent && <span className="accent">{accent}</span>}</h2>
      {description && (
        <div className="section-description-rich"
          dangerouslySetInnerHTML={{ __html: safe.replace(/\\n/g, "<br/>") }}
        />
      )}
    </div>
  );
}
