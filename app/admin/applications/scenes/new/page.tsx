import SceneForm from "@/components/admin/ApplicationSceneForm";
import { saveApplicationScene } from "@/app/admin/actions";
export default function NewScene(){return <><h1>Add Scene / 新增场景</h1><SceneForm action={saveApplicationScene}/></>}
