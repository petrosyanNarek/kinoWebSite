import "./App.css";
import { Header } from "./components/headerBar/Header";
import { MenuBar } from "./components/menuBar/MenuBar";
import { Routering } from "./router/Routering";
import { Footer } from "./components/footer/Footer";
import { SocialMenuBar } from "./components/socialMenuBar/SocialMenuBar";
function App() {
  return (
    <>
      <Header />
      <MenuBar />
      <Routering />
      <Footer />
      <SocialMenuBar />
    </>
  );
}

export default App;
