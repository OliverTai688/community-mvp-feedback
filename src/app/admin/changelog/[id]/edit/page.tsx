import EditorPreview from "@/components/changelog/EditorPreview"

export default async function EditChangelogPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/changelog/${params.id}`, {
    cache: "no-store",
  })
  const data = await res.json()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/30 py-12 px-4">
      <EditorPreview initialData={data} isEditing />
    </div>
  )
}
