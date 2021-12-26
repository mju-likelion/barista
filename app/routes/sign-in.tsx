import { Button, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import Particles from "react-tsparticles";
import { fb } from "~/firebase-config";

export default function SignIn() {
  useEffect(() => {
    fb.auth.onAuthStateChanged(async () => {
      await fb.createUserIfNotExist();
      const isAdmin = await fb.checkIsAdmin();
      console.log(isAdmin);
    });
  }, []);

  return (
    <>
      <Center h="100vh">
        <Button
          colorScheme="gray"
          leftIcon={<FaGoogle />}
          variant="solid"
          onClick={fb.signIn}
        >
          구글로 로그인하기
        </Button>
      </Center>
      <Particles
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
    </>
  );
}
