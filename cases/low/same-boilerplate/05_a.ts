type CartItem = { id: string; price: number; quantity: number };
type CartState = { items: CartItem[]; total: number };

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clear(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, clear } = cartSlice.actions;
export default cartSlice.reducer;
