const initialState = {
  loading: false,
  error: null,
  data: "",
}

export default function catReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CATS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "GET_CATS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case "GET_CATS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
