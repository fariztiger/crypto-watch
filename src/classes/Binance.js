const Wrapper = require( './Wrapper' );
const Symbol  = require( './Symbol' );

/**
 * Wrapper class for handling connections to Binance.com API.
 */
module.exports = class Binance extends Wrapper {

   // constructor
  constructor() {
    super();
    this._wsurl  = '';
    this._market = 'TUSD';
    this._cache  = {};
  }

   // start listening for live market data
  async initSocketFeed( handler ) {
    try {
      const ws = this.getNewSocket( this._wsurl );

      // when connection opens
      ws.on( 'open', data => {
        // ...
      });

      // handle subscription messages, pass to external handler
      ws.on( 'message', message => {
        // ...
      });

      // handle socket errors
      ws.on( 'error', err => {
        console.error( 'initSocketFeedError:', err );
      });

      // handle socket disconnect
      ws.on( 'close', data => {
        console.error( 'initSocketFeed CLOSED' );
      });
    }
    // handle any errors from above
    catch ( err ) {
      console.error( 'initSocketFeedError:', err );
    }
  }

}

