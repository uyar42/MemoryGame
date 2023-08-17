//antd sil
import React, { useState } from "react";
import Card from "../Card";

import {
  scoreSelector,
  restartGame,
  cardSelector,
} from "../../redux/cardSlice";
import { useDispatch, useSelector } from "react-redux";

function Board() {
  const score = useSelector(scoreSelector);
  const cards = useSelector(cardSelector);

  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(true);

  const handleReset = () => {
    dispatch(restartGame());
    setClicked(true);
    setTimeout(() => {
      setClicked(true);
    }, 200);
    setClicked(false);
  };

  // if (cards.every((c) => c.isItTurned === true)) {
  //   alert(`Tebrikler puanınız ${score}`);
  // }

  return (
    <div className="flex flex-col bg-green-600  h-screen">
      <button
        className="bg-black text-white font-mono hover:text-green-500 mx-auto p-4 "
        onClick={() => handleReset()}
      >
        RESTART GAME
      </button>
      <span className="mx-auto text-3xl font-mono font-bold">
        Score : {score}
      </span>
      {clicked ? (
        cards.every((c) => c.isItTurned) ? (
          <span className="mx-auto mt-40 text-8xl font-mono font-bold">
            Tebrikler
          </span>
        ) : (
          <Card />
        )
      ) : (
        <h2 className=" h-screen bg-green-600 mx-auto mt-40 text-3xl font-mono font-bold">
          YÜKLENİYOR...
        </h2>
      )}
    </div>
  );
}

export default Board;
