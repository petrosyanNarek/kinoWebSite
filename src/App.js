import "./App.css";
import { Header } from "./components/headerBar/Header";
import { MenuBar } from "./components/menuBar/MenuBar";
import { Routering } from "./router/Routering";
import { Footer } from "./components/footer/Footer";
import { SocialMenuBar } from "./components/socialMenuBar/SocialMenuBar";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  addAnwser,
  addComment,
  setCommentAnwserRating,
  setCommentRating,
  updateRating,
} from "./features/films/premiresFilmSlice";
const socket = io.connect("http://localhost:3000");
function App() {
  const dispatch = useDispatch();
  const filmId = useLocation().pathname.split("/");
  const [searchParams] = useSearchParams("film/");
  const seriesId = +searchParams.get("seria");
  useEffect(() => {
    if (filmId[1] === "film" && !seriesId) {
      socket.emit("join_room", `film${filmId[2]}`);
    } else if (seriesId) {
      socket.emit("join_room", `seria${seriesId}`);
    } else {
      socket.emit("join_room", `1`);
    }
  }, [filmId, seriesId, dispatch]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      const { room, ...newData } = data;
      if (newData.user && (newData.filmId || newData.seriesId)) {
        dispatch(addComment(newData));
        console.log(newData);
        dispatch(updateRating(newData.rating));
      } else if (typeof newData.rating === "boolean") {
        if (newData.commentsAnwserId) {
          dispatch(setCommentAnwserRating(newData));
        } else {
          dispatch(setCommentRating(newData));
        }
      } else {
        dispatch(addAnwser(newData));
      }
    });
  }, []);
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
