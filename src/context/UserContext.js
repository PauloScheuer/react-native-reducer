import React, { createContext, useReducer } from 'react';
import users from '../data/users';

const initialState = { users };
const UsersContext = createContext({});

const actions = {
  createUser(state, action) {
    const user = action.payload;
    user.id = state.users[state.users.length - 1].id + 1;
    return {
      users: [...state.users, user]
    }
  },
  updateUser(state, action) {
    const updated = action.payload;
    return {
      users: state.users.map(u => u.id === updated.id ? updated : u)
    }
  },
  deleteUser(state, action) {
    const user = action.payload;
    return {
      users: state.users.filter(u => u.id !== user.id)
    }
  }
}

export const UsersProvider = ({ children }) => {
  const reducer = (state, action) => {
    const fn = actions[action.type]
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{
      state, dispatch
    }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContext;