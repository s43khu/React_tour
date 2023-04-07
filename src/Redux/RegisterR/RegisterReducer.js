const istate = {
  username: 'Guest',
  password: '',
  email: ''
}
export function RegisterReducer(state = istate, action) {
  console.log("action=", action)
  console.log("state=", state)
  switch (action.type) {

    case 'REGISTER':
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email

      return {
        username: action.payload.username,
        password: action.payload.password,
        email: action.payload.email
      }

    default:
      return state
  }
}