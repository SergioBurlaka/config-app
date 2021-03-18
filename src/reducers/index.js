import { combineReducers } from 'redux';

import configReduser from './configReduser';

export default combineReducers({
  configState: configReduser,
});
