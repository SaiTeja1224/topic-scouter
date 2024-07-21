import "./App.css";
import Background from "./components/Background";
import Container from "./components/Container";
import Content from "./components/Content";
import Navigation from "./components/Navigation";
import Search from "./components/Search";

import useStore from "@/store/store";
import { verify } from "@/lib/services";
import { useEffect } from "react";

function App() {
  const login = useStore((state) => state.login);
  useEffect(() => {
    (async () => {
      try {
        const data = await verify();
        login(data);
      } catch (e) {
        console.log("Failed to verify user");
      }
    })();
  }, [login]);

  return (
    <>
      <Background />
      <Navigation />
      <Search />
      <Container>
        <Content />
      </Container>
    </>
  );
}

export default App;
