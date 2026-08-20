type FilterState = { query: string; page: number; pageSize: number };

const filterSlice = createSlice({
  name: 'filter',
  initialState: { query: '', page: 0, pageSize: 20 } as FilterState,
  reducers: {
    search(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 0;
    },
    goToPage(state, action: PayloadAction<number>) {
      state.page = Math.max(0, action.payload);
    },
    resize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.page = 0;
    },
  },
});

export const { search, goToPage, resize } = filterSlice.actions;
export default filterSlice.reducer;
