import { EditPostScreen } from "@/features/cms/components/editor/edit-post-screen";

export default async function EditPostPage({ params }: PageProps<"/dashboard/posts/[id]">) {
  const { id } = await params;
  return <EditPostScreen id={id} />;
}
