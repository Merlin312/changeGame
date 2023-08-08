import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ChatState {
  messages: string[];
}

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    editMessage: (
      state,
      action: PayloadAction<{ index: number; message: string }>
    ) => {
      const { index, message } = action.payload;
      state.messages[index] = message;
    },
    deleteMessage: (state, action: PayloadAction<number>) => {
      state.messages.splice(action.payload, 1);
    },
  },
});

export const { addMessage, editMessage, deleteMessage } = chatSlice.actions;

export const selectMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
