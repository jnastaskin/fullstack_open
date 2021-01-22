const intialState = "";

const notificationReducer = (state = intialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.delay)
      return action.data
    case 'REMOVE_NOTIFICATION':
      return intialState
    default:
      return state
  }
}

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { 
        message,
        delay: setTimeout(() => {
          dispatch(removeNotification(""))
        }, delay * 1000)
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  }
}

export default notificationReducer