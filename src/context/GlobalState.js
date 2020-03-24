import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(AppReducer, [], () => {
    const localData = localStorage.getItem("transactions");
    const newAr = localData
      ? JSON.parse(localData).map(trn => ({
          date: new Date(trn.date),
          amount: trn.amount,
          id: trn.id,
          text: trn.text
        }))
      : [];

    console.log(newAr);

    return localData ? newAr : [];
  });

  useEffect(() => {
    console.log(transactions);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
