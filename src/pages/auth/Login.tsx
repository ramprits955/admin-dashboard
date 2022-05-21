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
} from "@mantine/core";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useLogin } from "@pankod/refine-core";

const schema = Yup.object().shape({
  email: Yup.string().required().email("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

function Login() {
  const { mutate: loginUser } = useLogin();
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: undefined,
      password: undefined,
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align='center'
        sx={(theme) => ({
          fontFamily: `Montserrat, ${theme.fontFamily}`,
          fontWeight: 700,
        })}>
        Welcome back!
      </Title>
      <Text
        color='dimmed'
        size='sm'
        align='center'
        mt={5}
        sx={(theme) => ({
          fontFamily: `Montserrat, ${theme.fontFamily}`,
          fontWeight: 400,
        })}>
        Do not have an account yet?{" "}
        <Anchor<"a">
          href='#'
          size='sm'
          onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit((values) => loginUser(values))}>
          <TextInput
            label='Email'
            placeholder='you@mantine.dev'
            required
            {...form.getInputProps("email", { withError: true })}
          />
          <PasswordInput
            label='Password'
            placeholder='Your password'
            required
            mt='md'
            {...form.getInputProps("password", { withError: true })}
          />
          <Group position='apart' mt='md'>
            <Checkbox label='Remember me' />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href='#'
              size='sm'>
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt='xl' type='submit'>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;
