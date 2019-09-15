import _ from "lodash";

import jsonPlaceholder from "../apis/jsonPlaceholder";

// FETCH POSTS AND USERS | solucion al overfetchinf #2 | Hace uso de los dos action creators restantes (los cuales dejan de invocarse desde
// los componentes)
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // la palabra clave await no asegura que cuando dispatchamos el action creator (y su funcion interna es llamada eventualmente)
  // esperemos a que la API request sea completada antes de seguir con el proceso de ejecucion dentro de nuestro action creator (en
  // este caso fetchpostsandusers)
  await dispatch(fetchPosts());

  // se usa la funcion _.map de lodash para retornar del arreglo de posts solo los ids, pero devuelve 100 ids y se repiten
  // entonces con la funcion _.uniq se filtran todas las ids repetidas del arreglo de ids
  const userIds = _.uniq(_.map(getState().posts, "userId"));

  // loopeamos sobre cada user id y llamamos al action creator adecuado para cada user id
  userIds.forEach(id => dispatch(fetchUser(id)));

  // Posible refactoring using the _.chain() function helper from lodash
  // _.chain(getState().posts)
  //   .map("userId")
  //   .uniq()
  //   .forEach(id => dispatch(fetchUser(id)))
  //   .value(); // Lodash no ejecuta todos los pasos sino se pone esta funcion al final
};

// solution to overfecthing #1 using _.memoize function from lodash
// fetching one user at a time
// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };
// memoizing the fetchUser for executing it only one time for each id of the users
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// FETCH POSTS ACTION CREATOR
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// FETCH USER ACTION CREATOR
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
