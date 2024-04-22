import { IPraticante } from "@/app/praticante/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PraticantesInitialState {
  praticantes: IPraticante[];
}

const initialState: PraticantesInitialState = {
  praticantes: [],
};

export const praticanteSlice = createSlice({
  name: "praticante",
  initialState,
  reducers: {
    addPraticante: (state, action: PayloadAction<IPraticante>) => {
      state.praticantes.push(action.payload);
    },
  },
});

export const { addPraticante } = praticanteSlice.actions;
export default praticanteSlice.reducer;
