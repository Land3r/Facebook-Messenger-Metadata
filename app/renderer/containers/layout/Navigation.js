import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Navigation from '../../components/layout/Navigation';

const getNavLinks = (messages) => {
  if (messages != null) {
    const result = messages.map((message) => {
      if (message?.thread_path) {
        return {
          title: message.thread_path,
          url: '/details/'+message.thread_path
        }
      }
      else return {
        title: 'undefined',
        url: 'undefined'
      }
    })
    return result
  }
  else {
    return []
  }
}

const mapStateToProps = (state) => {
  return {
    messagesNavLinks: getNavLinks(state?.messages?.messages)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigateTo: (url) => {
      dispatch(push(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
