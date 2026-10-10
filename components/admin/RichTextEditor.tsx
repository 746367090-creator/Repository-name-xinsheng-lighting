"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RichTextEditor({ name, defaultValue = "", label, enableImages = false, onImageBusy }: { name: string; defaultValue?: string; label: string; enableImages?: boolean; onImageBusy?: (busy:boolean)=>void }) {
  const editor = useRef<HTMLDivElement>(null);
  const [imageBusy, setImageBusy] = useState(false);
  const [imageMessage, setImageMessage] = useState("");
  const selectedImage = useRef<HTMLImageElement | null>(null);
  const hidden = useRef<HTMLInputElement>(null);
  const savedSelection = useRef<Range | null>(null);

  function rememberSelection() {
    const selection = window.getSelection();
    if (selection?.rangeCount && editor.current?.contains(selection.anchorNode)) {
      savedSelection.current = selection.getRangeAt(0).cloneRange();
    }
  }

  function restoreSelection() {
    editor.current?.focus();
    const selection = window.getSelection();
    if (selection && savedSelection.current) {
      selection.removeAllRanges();
      selection.addRange(savedSelection.current);
    }
  }

  function setExactFontSize(px: number) {
    restoreSelection();
    document.execCommand("fontSize", false, "7");
    editor.current?.querySelectorAll('font[size="7"]').forEach(font => {
      const span = document.createElement("span");
      span.style.fontSize = px + "px";
      span.innerHTML = font.innerHTML;
      font.replaceWith(span);
    });
    sync();
    rememberSelection();
  }
  function sync() { if (hidden.current && editor.current) hidden.current.value = editor.current.innerHTML; }
  function command(type: string, value?: string) {
    restoreSelection();
    document.execCommand(type, false, value);
    sync();
  }
  async function insertImage(file?:File) {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 10*1024*1024) {setImageMessage("请选择10MB以内的图片。");return;}
    setImageBusy(true);onImageBusy?.(true);setImageMessage("正在上传图片…");
    try {
      const client=createClient();
      const extension=file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g,"") || "jpg";
      const path=`guides/${crypto.randomUUID()}.${extension}`;
      const {error}=await client.storage.from("media").upload(path,file,{contentType:file.type,upsert:false});
      if(error)throw error;
      const {data}=client.storage.from("media").getPublicUrl(path);
      const image=document.createElement("img");image.src=data.publicUrl;image.alt=file.name;image.style.maxWidth="100%";
      const paragraph=document.createElement("p");paragraph.appendChild(document.createElement("br"));
      editor.current?.append(image,paragraph);sync();setImageMessage("图片已加入正文，保存后发布。点击正文图片后，可用移除图片按钮删除。");
    } catch(error){setImageMessage(error instanceof Error?error.message:"上传失败，请重试。");}
    finally{setImageBusy(false);onImageBusy?.(false);}
  }
  function removeImage(){const image=selectedImage.current;if(image&&editor.current?.contains(image)){image.remove();selectedImage.current=null;sync();setImageMessage("图片已从正文移除，保存后生效。");}else{setImageMessage("请先点击正文中要移除的图片。");}}
  function addLink() {
    const url = window.prompt("Enter link URL");
    if (url) command("createLink", url);
  }
  return <label className="rich-editor-label">{label}
    <input ref={hidden} type="hidden" name={name} defaultValue={defaultValue}/>
    <div className="rich-toolbar" onMouseDownCapture={rememberSelection} role="toolbar" aria-label={`${label} formatting`}>
      <button type="button" onClick={() => command("bold")}><strong>B</strong></button>
      <button type="button" onClick={() => command("italic")}><em>I</em></button>
      <button type="button" onClick={() => command("underline")}><u>U</u></button>
      <select aria-label="Text style" defaultValue="p" onChange={event => command("formatBlock", event.target.value)}>
        <option value="p">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="blockquote">Quote</option>
      </select>
      <select aria-label="Font size in pixels"
          defaultValue=""
          onChange={event => {
            if (event.target.value) setExactFontSize(Number(event.target.value));
            event.target.value = "";
          }}>
          <option value="">Font Size / 字号</option>
          {[12,14,16,18,20,24,28,32,36,40].map(size =>
            <option key={size} value={size}>{size}px</option>
          )}
        </select>
      <button type="button" onClick={() => command("insertUnorderedList")}>• List</button>
      <button type="button" onClick={() => command("insertOrderedList")}>1. List</button>
      <button type="button" onClick={() => command("justifyLeft")}>Left</button>
      <button type="button" onClick={() => command("justifyCenter")}>Center</button>
      <button type="button" onClick={() => command("justifyRight")}>Right</button>
      <label className="color-tool">Color<input type="color" defaultValue="#2b241d" onChange={event => command("foreColor", event.target.value)}/></label>
      <button type="button" onClick={addLink}>Link</button>
      <button type="button" onClick={() => command("unlink")}>Unlink</button>
      <button type="button" onClick={() => command("removeFormat")}>Clear</button>
    </div>
    {enableImages && <div className="rich-toolbar"><label>Insert body image / 插入正文图片<input type="file" accept="image/*" disabled={imageBusy} onChange={event=>{void insertImage(event.target.files?.[0]);event.target.value="";}}/></label><button type="button" disabled={imageBusy} onClick={removeImage}>Remove selected image / 移除选中图片</button><span role="status" aria-live="polite">{imageMessage}</span></div>}
    <div ref={editor} className="rich-editor" contentEditable suppressContentEditableWarning onInput={sync} onMouseUp={rememberSelection} onKeyUp={rememberSelection} onBlur={sync} onClick={event=>{if(event.target instanceof HTMLImageElement)selectedImage.current=event.target}} dangerouslySetInnerHTML={{ __html: defaultValue }}/>
  </label>;
}
