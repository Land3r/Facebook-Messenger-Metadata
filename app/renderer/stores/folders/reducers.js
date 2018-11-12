import { handleActions } from 'redux-actions';
import actions from './actions';
import defaultState from './defaultState'

export default handleActions(
  {
    [actions.set]: (state, action) => {
      return { ...state, folders: action.payload };
    },
    [actions.reset]: (state) => {
        return { ...state, folders: [] };
    },
    [actions.add]: (state, action) => {
        const folders = state.folders
        console.log(action.payload)
        folders.push(action.payload)
        return { ...state, folders: [...folders]}
    },
    [actions.edit]: (state, action) => {
        const folders = state.folders
        let foundIndex = null
        folders.find((message, index) => {
            if (message.thread_path == action.payload.thread_path) {
                foundIndex = index
                return true
            }
        })
        if (foundIndex != null) {
            folders.splice(foundIndex, 1, action.payload)
        }
        return { ...state, folders: [...folders]}
    },
    [actions.delete]: (state, action) => {
        const folders = state.folders
        let foundIndex = null
        folders.find((message, index) => {
            if (message.thread_path == action.payload.thread_path) {
                foundIndex = index
                return true
            }
        })
        if (foundIndex != null) {
            folders.splice(foundIndex, 1)
        }
        return { ...state, folders: [...folders]}
    },
  },
  {
      ...defaultState
  }
);
