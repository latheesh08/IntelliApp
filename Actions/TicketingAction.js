//fetching ticket result and filter result based on ticket status 
const {
  TICKETING_FAILURE,
  TICKETING_SUCCESS,
  TICKETING_REQUEST,
} = require('../ActionTypes');

function fetchViewTicketsRequest(data) {
  return { type: TICKETING_REQUEST, data };
}

function fetchViewTicketsFailure(error) {
  return { type: TICKETING_FAILURE, error };
}

function fetchViewTicketsSuccess(row, res) {
  return { type: TICKETING_SUCCESS, data: { row, res } };
}
function ticketUpdate(data, ticket) {
  var res = data.concat(ticket)
  var row = res.filter(ticket => ticket.ticketStatus.toUpperCase() !== 'CLOSED');
  return (dispatch) => {
    dispatch(fetchViewTicketsSuccess(row, res));
  }
}
function fetchViewTickets(user, url, token, ticket) {
  var url = url.replace(/emailId/g, user.email)
  return (dispatch) => {

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
      .then((response) => response.json())
      .then((response) => {
        rows = response.ticketDetails.filter(ticket => ticket.ticketStatus.toUpperCase() !== 'CLOSED');
        if (ticket.length < rows.length) {
          dispatch(fetchViewTicketsSuccess(rows, response))
        }
      })
      .catch(error => console.log(url) + dispatch(fetchViewTicketsFailure(error)));

  };
}

module.exports = {
  fetchViewTickets,
  ticketUpdate
};