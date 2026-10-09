import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SceneForm from "@/components/admin/ApplicationSceneForm";
import { saveApplicationScene } from "@/app/admin/actions";
export default async function EditScene({params}:{params:{id:string}}){const client=createClient();const result=client?await client.from("site_media").select("*").eq("id",params.id).eq("collection","scene").maybeSingle():{data:null};if(!result.data)notFound();return <><h1>Edit Scene / 编辑场景</h1><SceneForm scene={result.data} action={saveApplicationScene}/></>}
