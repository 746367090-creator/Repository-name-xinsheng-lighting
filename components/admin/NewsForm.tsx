import type { NewsPost } from "@/lib/types";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function NewsForm({ post, action }: { post?: NewsPost; action: (form: FormData) => void }) {
  return <form className="admin-form" action={action}>
    {post && (
      <input type="hidden" name="id" value={post.id}/>
    )}
    <div className="admin-form-grid">
      <label>Title<input name="title" defaultValue={post?.title} required/></label>
      <label>URL Slug<input name="slug" defaultValue={post?.slug}/></label>
      <label>Category<input name="category" defaultValue={post?.category || "Company"}/></label>
      <label>Publish Date<input type="date" name="published_at" defaultValue={(post?.published_at || new Date().toISOString()).slice(0, 10)}/></label>
    </div>
    <label>Excerpt<textarea name="excerpt" defaultValue={post?.excerpt}/></label>
    <RichTextEditor name="content" label="Article Content" defaultValue={post?.content || ""}/>
    <input type="hidden" name="existing_cover" value={post?.cover_url || ""}/>
    <label>Cover Image<input type="file" name="cover" accept="image/*"/></label>
    {post?.cover_url && <img className="admin-form-cover-preview" src={post.cover_url} alt={post.title}/>} 
    <h2>SEO &amp; AI / GEO</h2>
    <div className="admin-seo-grid"><label>SEO Title<input name="seo_title" defaultValue={post?.seo?.title}/></label><label>SEO Keywords<input name="seo_keywords" defaultValue={post?.seo?.keywords}/></label></div>
    <label className="seo-description-field">SEO Description<textarea name="seo_description" defaultValue={post?.seo?.description}/></label>
    <label>AI Summary<textarea name="ai_summary" defaultValue={post?.ai_summary}/></label>
    <label>Status<select name="status" defaultValue={post?.status || "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></label>
    <button className="btn-primary">Save News Post</button>
  </form>;
}
