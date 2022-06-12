import * as c from '../_tests_/actions/ActionTypes';


export default (state = false, action) => {
  switch (action.type) {
  case 'TOGGLE_FORM':
    return !state;
  default:
    return state;
  }
};