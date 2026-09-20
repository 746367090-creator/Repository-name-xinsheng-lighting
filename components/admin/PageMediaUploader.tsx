"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { MediaItem } from "@/lib/types";

export default function PageMediaUploader({ currentCount = 0 }: { currentCount?: number }) {
  const [uploaded, setUploaded] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const available = Math.max(0, 12 - currentCount - uploaded.length);
    const selected = Array.from(files).slice(0, available);
    if (!selected.length) return setMessage("A page supports up to 12 media files.");
    const client = createClient();
    if (!client) return setMessage("Supabase is not connected.");
    setUploading(true);
    setMessage("");
    const completed: MediaItem[] = [];
    for (const file of selected) {
      const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "bin";
      const path = `pages/${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
      const { error } = await client.storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
      if (error) { setMessage(`Upload failed: ${error.message}`); continue; }
      const { data } = client.storage.from("media").getPublicUrl(path);
      completed.push({ type: file.type.startsWith("video/") ? "video" : "image", url: data.publicUrl, alt: file.name });
    }
    setUploaded(current => [...current, ...completed]);
    setUploading(false);
    if (completed.length) setMessage(`${completed.length} file(s) uploaded. Click the orange Save button to publish.`);
  }

  return <div className="page-media-uploader">
    <input type="hidden" name="uploaded_page_media" value={JSON.stringify(uploaded)}/>
    <label>Upload Page Images / Videos<input type="file" accept="image/*,video/*" multiple disabled={uploading || currentCount + uploaded.length >= 12} onChange={event => { void handleFiles(event.target.files); event.target.value = ""; }}/></label>
    {uploading ? <p className="hint">Uploading directly to media storage… please wait.</p> : null}
    {message ? <p className="hint">{message}</p> : null}
    {uploaded.length ? <div className="admin-media-grid">{uploaded.map((item, index) => <div className="admin-media" key={item.url}>{item.type === "video" ? <video src={item.url} controls/> : <img src={item.url} alt={item.alt || ""}/>}<button type="button" className="danger" onClick={() => setUploaded(current => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</button></div>)}</div> : null}
  </div>;
}
