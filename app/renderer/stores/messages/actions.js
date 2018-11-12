import { createAction } from 'redux-actions'

export default {
  set: createAction('MESSAGES_SET'),
  reset: createAction('MESSAGES_RESET'),
  add: createAction('MESSAGE_ADD'),
  edit: createAction('MESSAGE_EDIT'),
  delete: createAction('MESSAGE_DELETE')
}