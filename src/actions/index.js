import _ from "lodash";

import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// fetching one user at a time
export const fetchUser = id => dispatch => {
  _fetchUser(id, dispatch);
};
// memoizing the fetchUser for executing it only one time for each id of the users
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
});
