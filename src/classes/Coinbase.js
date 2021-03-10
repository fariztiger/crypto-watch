const Wrapper = require( './Wrapper' );
const Symbol  = require( './Symbol' );

/**
 * Wrapper class for handling connections to Coinbase Pro API.
 */
module.exports = class Coinbase extends Wrapper {

  // constructor
  constructor() {
    super();
    this._apiurl = 'https://api.pro.coinbase.com';
    this._wsurl  = 'wss://ws-feed.pro.coinbase.com';
    this._market = 'USD';
    this._subs   = [];
    this._cache  = {};
  }

  // start listening for live market data
  async initSocketFeed( handler ) {
    try {
      const res  = await this.makeRequest( 'GET', this._apiurl + '/products' );
      const subs = res.data.filter( p => ( p.status === 'online' && p.quote_currency === this._market ) ).map( p => p.id );
      const ws   = this.getNewSocket( this._wsurl );

      // send subscribe request when socket connection opens
      ws.on( 'open', data => {
        ws.send( JSON.stringify( {
          "type": "subscribe",
          "channels": [ "level2", "heartbeat", { "name": "ticker", "product_ids": subs } ]
        } ) );
      });

      // handle subscription messages, pass to external handler
      ws.on( 'message', message => {
        const data = JSON.parse( message );
        const { product_id, open_24h, high_24h, low_24h, volume_24h, price } = data;
        const [ token, quote ] = String( product_id || '' ).split( '-' );

        if ( typeof handler !== 'function' ) return;
        if ( data.type !== 'ticker' ) return;
        if ( !token || !quote ) return;

        // create new symbol, or update the one in the cache
        const symbol = this._cache[ product_id ] || new Symbol();
        symbol.setData( {
          exchange: 'Coinbase',
          token: token,
          quote: quote,
          open: Number( open_24h ),
          high: Number( high_24h ),
          low: Number( low_24h ),
          volume: Number( volume_24h ),
          price: Number( price )
        });

        // update cache and pass to handler
        this._cache[ product_id ] = symbol;
        handler( symbol );
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

