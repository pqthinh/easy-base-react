import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import { Wrapper } from "./styled";
import useRequest from "../../hooks/useRequest";
import useToken from "../../hooks/useToken";
import useStorage from "../../hooks/useStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onPostExecute } = useRequest();
  const { saveToken } = useToken();
  const { saveValue } = useStorage();

  const submit = async () => {
    const data = await onPostExecute("/login", { email, password });
    console.log(data);
    saveToken(data.token);
    saveValue("USER", data.data);
  };

  return (
    <Wrapper>
      <FormControl>
        <InputLabel htmlFor="email">Email address</InputLabel>
        <Input
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="password">password</InputLabel>
        <Input
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            console.log(e);
            setPassword(e.target.value);
          }}
        />
      </FormControl>

      <Button onClick={submit}>Submit</Button>
    </Wrapper>
  );
};
export default Login;
