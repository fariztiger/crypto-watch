/**
 * Class for a unique trading symbol from an exchange
 */
module.exports = class Symbol {

  // constructor
  constructor() {
    this.exchange = '';
    this.token    = '';
    this.quote    = 'USD';
    this.pair     = '';
    this.open     = 0;
    this.high     = 0;
    this.low      = 0;
    this.volume   = 0;
    this.price    = 0;
  }

  // set data for this symbol
  setData( data ) {
    Object.assign( this, data );
    this.pair = this.token +'/'+ this.quote;
  }

}
