/**
 * Server app
 */
const Coinbase = require( './src/classes/Coinbase' );

const feedHandler = function( data ) {
  console.log( data );
}

const _coinbase = new Coinbase();
_coinbase.initSocketFeed( feedHandler );

// const _binance = new Binance();
// _binance.initSocketFeed( feedHandler );

