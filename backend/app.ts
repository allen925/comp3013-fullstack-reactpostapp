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
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  try {
    const id = req.params.id;
    let post = findPostById(parseInt(id));
    const user = findUserById(post.id);
    let authorName = user.email.split('@')[0];
    res.status(200).json({ post, authorName, success: true });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// TODO TO UPDATE POST DETAIL FROM FRONTEND
app.post("/api/posts/:id/edit", (req, res) => {
  try {
    const post = updatePost(req.body.initialValues.id, req.body.newContents)
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
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
