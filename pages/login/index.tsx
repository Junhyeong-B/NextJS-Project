import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signInAPI, signUpAPI } from "../../apis";
import { Button } from "../../components";
import { authActions } from "../../store";
import classes from "../../styles/login.module.scss";

const LoginPage: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
        console.log(result);

        alert("회원가입이 완료되었습니다.");
        setIsSignup(false);
        setIsLoading(false);
      } catch (error) {
        alert("비밀번호는 6자리 이상 입력해주세요.");
        setIsLoading(false);
      }
    } else {
      try {
        const result = await signInAPI({
          data: JSON.stringify(data),
        }).then((response) => response.data);
        const { idToken } = result;

        dispatch(authActions.login({ idToken }));

        router.replace("/");
      } catch (error) {
        alert("존재하지 않는 아이디입니다.");
        setIsLoading(false);
      }
    }
  };
  return (
    <div className={classes.container}>
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
