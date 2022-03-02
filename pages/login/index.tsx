import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signInAPI, signUpAPI } from "../../apis";
import { Button } from "../../components";
import { authActions } from "../../store";
import classes from "../../styles/Login.module.scss";

export type AuthResultType = {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
};

const LoginPage: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      alert("이메일, 패스워드를 입력해 주세요.");
      return;
    }

    setIsLoading(true);

    const data = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    if (isSignup) {
      try {
        const result = await signUpAPI({
          data: JSON.stringify(data),
        }).then((response) => response.data);

        enqueueSnackbar(`${result.email} 회원가입이 완료되었습니다.`, {
          variant: "success",
        });
        setIsSignup(false);
        setIsLoading(false);
      } catch (error) {
        enqueueSnackbar("비밀번호는 6자리 이상 입력해주세요.", {
          variant: "error",
        });
        setIsLoading(false);
      }
    } else {
      try {
        const result: AuthResultType = await signInAPI({
          data: JSON.stringify(data),
        }).then((response) => response.data);
        const { idToken, email } = result;

        dispatch(authActions.login({ idToken, email }));
        enqueueSnackbar(`${email}님 안녕하세요!`, { variant: "info" });

        router.replace("/");
      } catch (error) {
        enqueueSnackbar("존재하지 않는 아이디입니다.", { variant: "warning" });
        setIsLoading(false);
      }
    }
  };
  return (
    <div className={classes.container}>
      <Head>
        <title>Free to Game List | {isSignup ? "Sign Up" : "Sign In"}</title>
      </Head>
      <form className={classes.form} onSubmit={submitHandler}>
        <input type="email" placeholder="아이디(이메일)" ref={emailRef} />
        <input type="password" placeholder="비밀번호" ref={passwordRef} />
        {!isLoading ? (
          <Button>{isSignup ? "회원가입" : "로그인"}</Button>
        ) : (
          "\u00A0"
        )}
      </form>
      <span
        className={classes.signup}
        onClick={() => setIsSignup((prevState) => !prevState)}
      >
        {isSignup ? "로그인 하러가기" : "회원가입 하러가기"}
      </span>
    </div>
  );
};

export default LoginPage;
