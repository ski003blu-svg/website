import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const listBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image, author, category, read_minutes, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("list blog error", error);
    return { posts: [] };
  }
  return { posts: data ?? [] };
});

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) {
      console.error("get blog error", error);
      return { post: null };
    }
    return { post };
  });
