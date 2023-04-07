import { createStore } from 'redux';
import { RegisterReducer } from '../RegisterR/RegisterReducer'


const store = createStore(RegisterReducer);
export default store;