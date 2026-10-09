import ContentEntryForm from "@/components/admin/ContentEntryForm";
import { saveContentEntry } from "../../actions";
export default function NewContent({searchParams}:{searchParams:{type?:string}}){const guide=searchParams.type==="article";return <><h1>{guide ? "Add Product & sourcing Guide" : "Add Content"}</h1><ContentEntryForm action={saveContentEntry} guide={guide}/></>}
