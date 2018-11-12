import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import messagesActions from '../stores/messages/actions'
import foldersActions from '../stores/folders/actions'
import OverviewPage from '../pages/OverviewPage';

const mapStateToProps = (state) => {
  return {
    folders: state.folders.folders
  }
}

const mapDispatchToProps = (dispatch) => {
  const messages = bindActionCreators(messagesActions, dispatch)
  const folders = bindActionCreators(foldersActions, dispatch)
  return {
    resetMessages: () => {
      messages.reset()
    },
    resetFolders: () => {
      folders.reset()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage)
