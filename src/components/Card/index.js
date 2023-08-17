import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  cardSelector,
  isFlipped,
  incrementScore,
  scoreSelector,
  founded,
  foundsSelector,
  // incrementScore,
} from "../../redux/cardSlice";

function Card() {
  // const score = useSelector(scoreSelector);

  // const founds = useSelector(foundsSelector);

  const cards = useSelector(cardSelector);
  // const flippedCards = useSelector(flippedCardsSelector);
  const [select, setSelect] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(select);
    if (select.length === 2) {
      if (select[0]?.name === select[1]?.name) {
        dispatch(incrementScore(+50));
        dispatch(founded(select));
        setSelect([]);
      } else {
        setTimeout(() => {
          dispatch(isFlipped(select[0].id));
          dispatch(isFlipped(select[1].id));
          setSelect([]);
        }, 477);
        dispatch(incrementScore(-10));
      }
    }
  }, [select]);
  const handleClick = (c) => {
    if (c.isItTurned === true) {
      return;
    }
    let isDuplicate = select.some((state) => state.id === c.id);
    // console.log(isDuplicate);
    if (select.length <= 1) {
      if (!isDuplicate) {
        dispatch(isFlipped(c.id));
        setSelect([...select, c]);
      }
    }
  };

  return (
    <div className="grid grid-cols-6 gap-12 mx-auto  h-screen mt-5">
      {cards.map((c) => (
        <div className="w-24">
          <img
            onClick={() => handleClick(c)}
            className={`
            backface-hidden
            rounded-lg
            ${
              c.isItTurned
                ? "transform -scale-x-110 duration-300 h-32"
                : "transform scale-x-180 duration-300 h-32 w-24 object-fill- rounded-lg"
            }
           ${!c.isItTurned && "hover:scale-105 duration-100"}

            ${c.isItTurned ? "cursor-not-allowed" : "cursor-pointer"}`}
            key={c.id}
            src={
              c.isItTurned
                ? `${c.img}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGIiJcc9SBchKTHKh8gqCwv9GnbVqk_ki_qg&usqp=CAU"
            }
            alt={c.name}
          />
        </div>
      ))}
    </div>
  );
}

export default Card;
