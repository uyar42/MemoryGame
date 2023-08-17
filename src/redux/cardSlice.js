import { createSlice, current } from "@reduxjs/toolkit";

import { cards } from "../data/cards.js";

export const cardSlice = createSlice({
  name: "cards",
  initialState: {
    items: cards.sort(() => Math.random() - 0.5),
    score: 0,
    founds: [],
  },

  reducers: {
    isFlipped: (state, action) => {
      const card = state.items.find((f) => f.id === action.payload);
      if (card) {
        card.isItTurned = card.isItTurned ? false : true;
      }
      // console.log(current(state.items), "slice");
    },
    incrementScore: (state, action) => {
      state.score += Number(action.payload);
    },
    restartGame: (state, action) => {
      state.items.sort(() => Math.random() - 0.5);
      state.items.map((i) => (i.isItTurned = false));
      state.score = 0;
    },
    founded: (state, action) => {
      state.founds.push(action.payload);
    },
  },
});

export const foundsSelector = (state) => state.cards.founds;
export const cardSelector = (state) => state.cards.items;
export const scoreSelector = (state) => state.cards.score;
export const flippedCardsSelector = (state) => state.cards.flippedCards;

export const selectedSelector = (state) => state.cards.selected;

export default cardSlice.reducer;
export const { isFlipped, incrementScore, restartGame, founded } =
  cardSlice.actions;
