import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import messagesActions from '../stores/messages/actions'
import foldersActions from '../stores/folders/actions'
import ImportPage from '../pages/ImportPage'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  const messages = bindActionCreators(messagesActions, dispatch)
  const folders = bindActionCreators(foldersActions, dispatch)
  return {
    addMessages: (data) => {
      messages.add(data)
    },
    addFolders: (data) => {
      folders.add(data)
    },
    updateFolders: (data) => {
      folders.edit(data)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportPage)