"use strict";

const React = require('react');
const Currency = require('./currency');
const RatesStore = require('./ratesStore');

const Widget = React.createClass({
  currencies: ["USD", "EUR", "CAD", "JPY", "GBP", "CNY"],

  getInitialState() {
    return ({baseCurrency: "please select", rates: {}});
  },

  componentDidMount() {
    RatesStore.addListener(this._onChange);
  },

  _onChange() {
    this.setState({rates: RatesStore.all()});
  },

  setBaseCurrency(currency) {
    this.setState({baseCurrency: currency}, () => {
      // use arrow function to allow us to call function with arguments
      RatesStore.fetchRates(this.state.baseCurrency)
    });
  },

  render() {
    const currencyOptions = this.currencies.map( (currency) => {
      return (<div onClick={this.setBaseCurrency.bind(this, currency)}
                   key={currency}
                   className="currency-option">
                   {currency}
              </div>);
    });

    const rates = this.state.rates || {};
    const currencyNames = Object.keys(rates);
    const currencyRates = currencyNames.map( (currency) => {
      return (<Currency name={currency}
                        rate={this.state.rates[currency]}
                        key={currency}/>);
    });


    return (
      <div>
        <h1>Currency Exchange Rates</h1>
        <h3>Base Currency: {this.state.baseCurrency}</h3>

        <div className="currency-selector">
          Get Rates:
          {currencyOptions}
        </div>
        <div className="rates-list">
          {currencyRates}
        </div>
      </div>
    );
  }
});

module.exports = Widget;
