import { useEffect } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { auth, provider } from "../firebase";
import { onAuthStateChanged, signInWithPopup } from "@firebase/auth";

const login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  const handleAuth = () => {};
  return (
    <Wrapper>
      <UberLogo src="https://i.ibb.co/ZMhy8ws/uber-logo.png" />
      <Title>Log in to access your account</Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      <SignInButton onClick={() => signInWithPopup(auth, provider)}>
        Sign in with Google
      </SignInButton>
    </Wrapper>
  );
};
const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 w-screen p-4
`;
const SignInButton = tw.div`
    bg-black text-white text-center py-4 mt-8
    cursor-pointer
`;
const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`;
const Title = tw.div`
    text-5xl text-gray-500 pt-4
`;
const HeadImage = tw.img`
    object-contain w-full
`;
export default login;
