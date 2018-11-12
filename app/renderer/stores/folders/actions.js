import { createAction } from 'redux-actions'

export default {
  set: createAction('FOLDERS_SET'),
  reset: createAction('FOLDERS_RESET'),
  add: createAction('FOLDER_ADD'),
  edit: createAction('FOLDER_EDIT'),
  delete: createAction('FOLDER_DELETE')
}