"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getIndexableUrls, notifyIndexNow } from "@/lib/indexing";

export async function submitIndexNow() {
  const urlList = await getIndexableUrls();
  let ok = false;
  let message = "";
  try {
    const response = await notifyIndexNow(urlList);
    ok = response.ok;
    message = response.ok
      ? `已提交 ${urlList.length} 个网址，搜索引擎将自行安排抓取。`
      : `提交失败（HTTP ${response.status||"连接超时"}），请稍后重试。`;
  } catch {
    message = "连接搜索引擎失败，请稍后重试。";
  }
  revalidatePath("/admin/indexing");
  redirect(`/admin/indexing?status=${ok ? "success" : "error"}&message=${encodeURIComponent(message)}`);
}
