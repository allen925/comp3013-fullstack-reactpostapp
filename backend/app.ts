import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  findPostById,
  updatePost,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";
import { Request, Response, NextFunction } from 'express';


// to check runtime typing of params, from https://stackoverflow.com/questions/44078205/how-to-check-the-object-type-on-runtime-in-typescript
interface PostFields {
  title: string;
  category: string;
  content: string;
  image: string;
}
function isValidPostFields(obj: any): obj is PostFields {
  return typeof obj === 'object' &&
         typeof obj.title === 'string' && obj.title.trim() !== '' &&
         typeof obj.category === 'string' && obj.category.trim() !== '' &&
         typeof obj.content === 'string' && obj.content.trim() !== '' &&
         typeof obj.image === 'string' && obj.image.trim() !== '';
}

// helpers to solve concerns mentioned in POST /api/posts
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: 'Token required' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, "thechangedsecretaskedfor", (err, decoded) => {
      if (err) return res.status(403).send({ error: 'Token is not valid or expired' });
      next();
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};
const validatePostInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, category, content, image }: {
      title: string;
      category: string;
      content: string;
      image: string;
    } = req.body;
    
    if (!isValidPostFields(req.body)) 
      return res.status(400).send({ error: 'All fields must be provided and must be non-empty strings' });
    if (!title || !category || !content || !image) 
      return res.status(400).send({ error: 'All fields must be provided and validated with correct types' });
    
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "thechangedsecretaskedfor", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "thechangedsecretaskedfor");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  await sleep(2000);
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  try {
    const id = req.params.id;
    let post = findPostById(parseInt(id));
    const user = findUserById(post.userId);
    let authorName = user.email.split('@')[0];
    res.status(200).json({ post, authorName, success: true });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// TODO TO UPDATE POST DETAIL FROM FRONTEND
app.post("/api/posts/:id/edit", (req, res) => {
  try {
    const { initialValues, newContents } = req.body;
    const { title, category, content, imageLink: image } = newContents;

    const post = updatePost(initialValues.id, { title, category, content, image });
    res.status(200).json({ post, success: true });
  } catch (error) {
    res.status(404).json({ error });
  }
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", authenticateToken, validatePostInput, (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
