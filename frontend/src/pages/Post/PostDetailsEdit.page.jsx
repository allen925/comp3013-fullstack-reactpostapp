import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from './PostDetails.module.css';
import { useLocation } from 'react-router-dom';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from "react";

function PostDetailsEditPage() {
    const location = useLocation();
    const postContent = location.state;
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: postContent.title,
            category: postContent.category,
            imageLink: postContent.image,
            content: postContent.content,
        },
        validate: {
            title: (value) => value.trim().length === 0,
            category: (value) => value.trim().length === 0,
            imageLink: (value) => value.trim().length === 0,
            content: (value) => value.trim().length === 0,
        },
    });

    const updatePost = async () => {
        const res = await axios.post(`${DOMAIN}/api/posts/${postContent.id}/edit`, { initialValues: postContent, newContents: form.values });
        if (res?.data.success) {
            navigate(-1);
        }
    }

    const [isDialogOpen, setDialogOpen] = useState(false);

    const deletePost = async (postId) => {
        setDialogOpen(false);
        const res = await axios.delete(`${DOMAIN}/api/posts/${postId}`);
        if (res?.data.success) {
            navigate("/posts");
        }
    };

    const popupRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target))
                setDialogOpen(false);
        };

        if (isDialogOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        // Cleanup the event listener unmounts / closes
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isDialogOpen]);

    return (
        <Container>
            <div className={classes["btn-container"]}>
                <Button mt="lg" mb="md" variant="light" color="#2db0da" onClick={() => navigate(-1)}>
                    Back to Post
                </Button>
                <div>
                    <Button ref={popupRef} className={classes.anchor} mt="lg" variant="light" color="red" onClick={() => setDialogOpen(prev => !prev)}>
                        DELETE POST
                    </Button>
                    {isDialogOpen && (
                        <div className={classes["delete-confirm"]}>
                            <p>Are you sure you want to delete this post?</p>
                            <div className={classes["btn-container"]}>
                                <Button color="red" onClick={() => deletePost(postContent.id)}>Confirm</Button>
                                <Button color="gray" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <form onSubmit={form.onSubmit(updatePost)} style={{}}>
                <Title
                    order={2}
                    size="h1"
                    style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                    fw={900}
                    ta="center"
                >
                    Edit Your Post:
                </Title>

                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                    <TextInput
                        label="Title"
                        placeholder="Your title"
                        name="title"
                        variant="filled"
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        label="Category"
                        placeholder="Your category"
                        name="category"
                        variant="filled"
                        {...form.getInputProps('category')}
                    />
                </SimpleGrid>

                <TextInput
                    label="Image"
                    placeholder="Image Link"
                    mt="md"
                    name="imageLink"
                    variant="filled"
                    {...form.getInputProps('imageLink')}
                />
                <Textarea
                    mt="md"
                    label="Content"
                    placeholder="Your content"
                    maxRows={10}
                    minRows={5}
                    autosize
                    name="content"
                    variant="filled"
                    {...form.getInputProps('content')}
                />

                <Group justify="center" mt="xl">
                    <Button type="submit" size="md">
                        Save the Update
                    </Button>
                </Group>
            </form>
        </Container>
    );
}


export default PostDetailsEditPage;