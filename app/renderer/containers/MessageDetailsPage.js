import { connect } from 'react-redux';
import MessageDetailsPage from '../pages/MessageDetailsPage';

const getMessageDetail = (state, thread_path) => {
    const foundMessage = state.messages.messages.find((element) => (element.thread_path == thread_path))
    return {...foundMessage}
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: getMessageDetail(state, ownProps.match.params.thread_path)
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailsPage)
