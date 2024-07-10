import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Text } from "@mantine/core";
import { useLoaderData } from "react-router-dom";

export const PostPage = () => {
  const posts = useLoaderData();
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
      <SimpleGrid cols={3}>
        {posts?.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return res.data;
};
