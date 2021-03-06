import * as constants from "../../src/actions/ActionTypes"

export const deleteTicket = id => ({
  type: 'DELETE_TICKET',
  id
});

export const toggleForm = () => ({
  type: 'TOGGLE_FORM'
});


//// Note that addTicket() will take the entire object and then deconstruct it in the action creator. That will save us the trouble of deconstructing the ticket every time we call addTicket() in our React application.
export const addTicket = (ticket) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = ticket;
  return {
    type: 'ADD_TICKET',
    names: names,
    location: location,
    issue: issue,
    id: id,
    formattedWaitTime,
    timeOpen: timeOpen
  }
}

export const updateTime = (id, formattedWaitTime) => ({
  type: constants.UPDATE_TIME,
  id: id,
  formattedWaitTime: formattedWaitTime
});
