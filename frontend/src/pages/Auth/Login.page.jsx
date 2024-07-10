import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './Login.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin =  (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };


  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper component="form" onSubmit={onLogin} withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" name="email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" name="password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl" >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;

/*

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={onLogin}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "20px",
            background: "#d3d3d3",
            padding: "50px",
          }}
        >
          <h1>This is the login page</h1>
          <input
            placeholder="email"
            name="email"
            type="email"
            required
            style={{ minWidth: "320px", height: "26px" }}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            required
            style={{ minWidth: "320px", height: "26px" }}
          />
          <button type="submit">login</button>
          {authLoading ? <h2>Loading...</h2> : null}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

*/