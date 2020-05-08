const initialState = {
  lotteries: undefined,
};

const lotteriesReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return {
        ...initialState,
      };
    }
  }
};

export default lotteriesReducer;
