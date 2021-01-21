const intialState = { message: "" };

const notificationReducer = (state = intialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'REMOVE_NOTIFICATION':
      return intialState
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

export const removeNotification = (message) => {
  return {
    type: "REMOVE_NOTIFICATION",
  }
}

export default notificationReducer