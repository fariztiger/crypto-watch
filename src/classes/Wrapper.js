const axios = require( 'axios' );
const WebSocket = require( 'ws' );

/**
 * Wrapper class for ajax requests and socket connection.
 */
module.exports = class Wrapper {

  // interface method for handling socket feed data
  async initSocketFeed( handler ) {
    // 1. parse json data from socket
    // 2. build new Symbol instance for a unique symbol
    // 3. pass Symbol object to handler function
  }

  // make new request
  makeRequest( method, url ) {
    return axios( { method, url } );
  }

  // get new websocket object
  getNewSocket( url ) {
    return new WebSocket( url );
  }







}
