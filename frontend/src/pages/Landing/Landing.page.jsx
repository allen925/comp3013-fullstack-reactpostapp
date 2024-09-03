import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './Landing.module.css';
import { Grid, Skeleton } from '@mantine/core';
import { SimpleGrid, Image } from '@mantine/core';
import { IconNavigationHeart, IconBrandCashapp, IconMessages } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import postsImage from '../../assets/posts.png';
import postDetailImage from '../../assets/postDetail.png';

const mockdata = [
  {
    icon: IconNavigationHeart,
    title: "Easy For Navigation",
    description:
    "Explore stunning photo galleries with an interface that's both intuitive and aesthetically pleasing—perfect for easy browsing.",
  }, {
    icon: IconBrandCashapp,
    title: "Always Free to Use",
    description:
    "Access all features for free, with no subscriptions required. Dive into a diverse world of photography without any barriers.",
  }, {
    icon: IconMessages,
    title: "Community Engagement",
    description:
    "Join a community of photography enthusiasts committed to sharing and celebrating visual art. Engage, comment, and connect to enrich your photographic journey.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const child = <Skeleton height={140} radius="md" animate={false} />;

  const clickLogin = () => {
    navigate("/login")
  }

  return (
    <>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title}>Explore and Share the World Through Photos</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Dive into a vibrant community of photographers and enthusiasts. Share your unique perspectives and explore stunning images from around the globe. Join us in celebrating every shot, every story, every moment.
          </Text>
          <Button variant="filled" color="rgba(140, 104, 81, .8)" size="xl" radius="xl" className={classes.control} onClick={clickLogin}>
            Get started
          </Button>
        </Container>
      </div>
      <Container my="md">
        <Grid>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <Image
              src={postDetailImage}
              alt="post detail image"
              height="auto"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: 'rgba(117, 110, 110, 1)', to: '#000', deg: 170 }}
              style={{ textIndent: "30px" }}
            >
              "Explore captivating moments and stunning scenes shared by our community."
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: 'rgba(117, 110, 110, 1)', to: '#000', deg: 280 }}
              style={{ textIndent: "30px" }}
            >
              "Explore and discover stunning images shared by photographers from around the globe."
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <Image
              src={postsImage}
              alt="posts image"
              height="auto"
            />
          </Grid.Col>
        </Grid>
      </Container>
      <Container mt={30} mb={30} size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
          {mockdata.map((item) => (
            <div className={classes['feature-feature']} key={item.title}>
              <div className={classes['feature-overlay']} />
              <div className={classes['feature-content']}>
                <item.icon style={{ width: 38, height: 38 }} className={classes['feature-icon']} stroke={1.5} />
                <Text fw={700} fz="lg" mb="xs" mt={5} className={classes['feature-title']}>
                  {item.title}
                </Text>
                <Text c="dimmed" fz="sm">
                  {item.description}
                </Text>
              </div>
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Landing;
