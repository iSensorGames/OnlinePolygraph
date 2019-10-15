// Redux
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

// Services
import * as services from "./services";

// Reducers
import reducers from "./reducers";

// Enhancers
import { composeWithDevTools } from "remote-redux-devtools";
const composeEnhancers = composeWithDevTools({
  realtime: true
});

const middleware = [ReduxThunk.withExtraArgument(services)];

export default createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);
