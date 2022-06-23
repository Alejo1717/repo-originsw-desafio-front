export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ENDPOINTs = {
  LOGIN: SERVER_URL  + '/api/auth/login',
  USERS: SERVER_URL + '/api/users',
  TWELVEDATA: SERVER_URL + '/api/twelvedata',
  USER_ACTION: SERVER_URL + '/api/action/user-action'
};
