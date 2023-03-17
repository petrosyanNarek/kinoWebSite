import "./App.css";
import { Header } from "./components/headerBar/Header";
import { MenuBar } from "./components/menuBar/MenuBar";
import { Routering } from "./router/Routering";
import { Footer } from "./components/footer/Footer";
import { SocialMenuBar } from "./components/socialMenuBar/SocialMenuBar";
import { MyModal } from "./components/UI/myModal/MyModal";
function App() {
  return (
    <>
      <Header />
      <MyModal />
      <MenuBar />
      <Routering />
      <Footer />
      <SocialMenuBar />
    </>
  );
}

export default App;
