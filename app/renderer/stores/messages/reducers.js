import { handleActions } from 'redux-actions';
import actions from './actions';
import defaultState from './defaultState'

export default handleActions(
  {
    [actions.set]: (state, action) => {
      return { ...state, messages: action.payload };
    },
    [actions.reset]: (state) => {
        return { ...state, messages: [] };
    },
    [actions.add]: (state, action) => {
        const messages = state.messages
        console.log(JSON.stringify(action))
        messages.push(action.payload)
        return { ...state, messages: [...messages]}
    },
    [actions.edit]: (state, action) => {
        const messages = state.messages
        let foundIndex = null
        messages.find((message, index) => {
            if (message.thread_path == action.payload.thread_path) {
                foundIndex = index
                return true
            }
        })
        if (foundIndex != null) {
            messages.splice(foundIndex, 1, action.payload)
        }
        return { ...state, messages: [...messages]}
    },
    [actions.delete]: (state, action) => {
        const messages = state.messages
        let foundIndex = null
        messages.find((message, index) => {
            if (message.thread_path == action.payload.thread_path) {
                foundIndex = index
                return true
            }
        })
        if (foundIndex != null) {
            messages.splice(foundIndex, 1)
        }
        return { ...state, messages: [...messages]}
    },
  },
  {
      ...defaultState
  }
);
