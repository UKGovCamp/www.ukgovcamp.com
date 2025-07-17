import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const wordpressPosts = await getCollection("wordpressExport");
const posts = await getCollection("posts");

const allPosts = [...posts, ...wordpressPosts].sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime(),
);

export const GET: APIRoute = async (context) => {
  return rss({
    title: "UKGovCamp",
    description: "",
    site: context.site || "https://www.ukgovcamp.com",
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link:
        post.collection === "wordpressExport"
          ? `/${post.id}`
          : `/posts/${post.id}`,
      author: post.data.author.id,
    })),
    stylesheet: "/pretty-feed-v3.xsl",
  });
};
