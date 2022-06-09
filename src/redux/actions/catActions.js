import axios from "axios";

const GET_CATS_REQUEST = 'GET_CATS_REQUEST';
const GET_CATS_SUCCESS = 'GET_CATS_SUCCESS';
const GET_CATS_FAILURE = 'GET_CATS_FAILURE';

export function getCatsRequest() {
  return {
    type: GET_CATS_REQUEST
  };
}

export function getCatsSuccess(data) {
  return {
    type: GET_CATS_SUCCESS,
    payload: data
  };
}

export function getCatsFailure(error) {
  return {
    type: GET_CATS_FAILURE,
    payload: error
  };
}

export function getCats() {
  return dispatch => {
    dispatch(getCatsRequest());
    axios.get('https://cat-fact.herokuapp.com/facts/random')
      .then(({ data }) => {
        dispatch(getCatsSuccess(data.text));
      }
      )
      .catch(error => {
        dispatch(getCatsFailure(error));
      }
      );
  };
}
