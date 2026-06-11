import Link from "next/link";
import { SubmitButton } from "@/components/admin/submit-button";
import type { AdminPost } from "@/lib/posts";
import { postCategories, postPlatforms, postStatusLabel, postStatuses } from "@/lib/posts";

export function PostForm({ post, action }: { post?: AdminPost; action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="grid gap-4">
        <label className="text-sm font-semibold text-slate-800">
          Titel
          <input name="title" required defaultValue={post?.title || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Beschreibung
          <textarea
            name="description"
            required
            maxLength={5000}
            defaultValue={post?.description || ""}
            className="mt-2 min-h-80 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm leading-6"
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">Zeilenumbrüche, Emojis und Links werden gespeichert.</span>
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold text-slate-800">
            Kategorie
            <select name="category" defaultValue={post?.category || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">
              <option value="">Keine Kategorie</option>
              {postCategories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Plattform
            <select name="platform" defaultValue={post?.platform || "facebook"} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">
              {postPlatforms.map((platform) => <option key={platform.value} value={platform.value}>{platform.label}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Status
            <select name="status" defaultValue={post?.status || "active"} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">
              {postStatuses.map((status) => <option key={status} value={status}>{postStatusLabel(status)}</option>)}
            </select>
          </label>
        </div>
        <label className="text-sm font-semibold text-slate-800">
          Notizen
          <textarea name="notes" defaultValue={post?.notes || ""} className="mt-2 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SubmitButton className="rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-60" pendingText="Speichern ...">
          Speichern
        </SubmitButton>
        <Link href="/admin/beitraege" className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
          Abbrechen
        </Link>
      </div>
    </form>
  );
}
