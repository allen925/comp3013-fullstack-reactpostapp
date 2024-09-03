import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Text, Loader } from "@mantine/core";
import { defer, Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

export const PostPage = () => {
  const data = useLoaderData();

  return (
    <Container>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'darkblue', to: '#45CEE6', deg: 180 }}
      >
        Posts
      </Text>

      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Loader color="blue" type="dots" />
          <Text size="md" align="center" style={{ marginTop: 10 }}>
            Loading posts... (showcase network delay)
          </Text>
        </div>
      }>
        <Await resolve={data.posts} errorElement={<p>Error loading posts!</p>}>
          {(posts) => (
            <SimpleGrid cols={3}>
              {posts?.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))}
            </SimpleGrid>
          )}
        </Await>
      </Suspense>
    </Container>
  );
};

export const postsLoader = async () => {
  // Start fetching the posts but do not await here
  const postsPromise = axios.get(`${DOMAIN}/api/posts`).then(res => res.data);

  // Use defer to manage the promise
  return defer({ posts: postsPromise });
};
