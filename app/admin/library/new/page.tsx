import ContentEntryForm from "@/components/admin/ContentEntryForm";
import { saveContentEntry } from "../../actions";
import type { ContentEntry } from "@/lib/types";
export default function NewContent({searchParams}:{searchParams:{type?:string}}){const initialType=(["article","knowledge","case","solution","faq"].includes(searchParams.type||"")?searchParams.type:"article") as ContentEntry["type"];const guide=initialType==="article"||initialType==="knowledge";return <><h1>{initialType==="case"?"Add Case / 新增案例":initialType==="solution"?"Add Application Guide":guide?"Add Product & sourcing Guide":"Add Content"}</h1><ContentEntryForm action={saveContentEntry} guide={guide} initialType={initialType}/></>}
