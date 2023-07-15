import { createClient } from "@/prismicio";
import Post from "@/src/components/Post/Post";
import { useImageStore } from "@/src/lib/stores";
import addImagesPlaceholders from "@/src/lib/utils/addImagesPlaceholders";

export const dynamic = "force-static";

interface PostPageProps {
  params: { postId: string };
}

export async function generateStaticParams() {
  const client = createClient({
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
  });
  const posts = await client.getAllByType("post");

  return posts.map((post) => ({
    postId: post.uid,
  }));
}

async function getPostData(postUID: string) {
  const client = createClient();

  const post = await client.getByUID("post", postUID);
  const images = await addImagesPlaceholders({ post });
  return { post: post, images };
}

export default async function PostPage({ params }: PostPageProps) {
  const { post, images } = await getPostData(params.postId);
  useImageStore.setState({ images });

  /* @ts-expect-error Async Server Component */
  return <Post {...post} />;
}
