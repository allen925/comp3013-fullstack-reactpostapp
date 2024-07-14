import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { Card, Image, Text } from '@mantine/core';
import classes from './PostDetails.module.css';

function PostDetailsPage() {
  const post = useLoaderData();
  console.log(post)
  return (
    <Container>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Button mt="lg" variant="light" color="blue">
          <Link to="/posts" style={{ color: "#2db0da", fontWeight: "600" }}>Back to Posts</Link>
        </Button>
        <Button mt="lg" variant="light" color="blue">
          <Link to={{ pathname: `/posts/${post.post.id}/edit` }} state={post.post} style={{ color: "#228BE6", fontWeight: "600" }}>Edit</Link>
        </Button>
      </div>
      <Card padding="lg" className={`${classes.card} ${classes.parent} ${classes.clean}`}>
        {/* <Card.Section mt="xl"*/}
        <Card.Section gap={5} className={`${classes.div1} ${classes.clean}`}>
          <Text fz="md">
            Author: {post.authorName}
          </Text>
        </Card.Section>
        <Card.Section gap={5} className={`${classes.div2} ${classes.clean}`}>
          <Text fz="xl" fw={700} className={classes.clean}>
            {post.post.title}
          </Text>
        </Card.Section>
        <Card.Section gap={5} className={`${classes.div3} ${classes.clean}`}>
          <Text fz="sm" c="dimmed" fw={500}>
            Category: {post.post.category}
          </Text>
        </Card.Section>
        <Card.Section gap={5} className={`${classes.div4} ${classes.clean}`} style={{ alignSelf: 'start' }}>
          <Text fz="md" ta="left" className={classes.paragraph}>
            {post.post.content}
          </Text>
        </Card.Section>
        <Card.Section gap={5} className={`${classes.div5} `} style={{ boxSizing: "border-box", padding: "0 30px" }} >
          <Image
            src={post.post.image}
            alt={` Image with title: ${post.post.title}`}
            height="auto"
            width="auto"
            style={{maxHeight:"500px"}}
          />
        </Card.Section>
      </Card>
    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  const res = await axios.get(`${DOMAIN}/api/posts/` + params.id);
  return res.data;
};


export default PostDetailsPage;
