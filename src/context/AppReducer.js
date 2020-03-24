export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return state.filter(transaction => transaction.id !== action.payload);

    case "ADD_TRANSACTION":
      return [
        ...state,
        {
          amount: action.payload.amount,
          date: action.payload.date,
          id: action.payload.id,
          text: action.payload.text
        }
      ];
    default:
      return state;
  }
};
