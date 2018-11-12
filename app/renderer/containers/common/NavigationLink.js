import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import NavigationLink from '../../components/common/NavigationLink'

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigateTo: (url) => {
      dispatch(push(url))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationLink)
