import React from 'react';
import Currency from './currency';
import store from './store';
import selectCurrency from './actions';

class Widget extends React.Component {

  constructor(props) {
    super(props);
    this.props.store.subscribe(this.render.bind(this));
    this.currencies = ["USD", "EUR", "CAD", "JPY", "GBP", "CNY"];
    this.selectCurrency = selectCurrency.bind(this);
  }

  fetchRates(currency) {
    $.ajax({
      url: `http://api.fixer.io/latest?base=${currency}`,
      type: "GET",
      dataType: "JSON",
      success: function(resp) {
        this.props.store.dispatch(
          this.selectCurrency(resp.base, resp.rates)
        );
      }.bind(this)
    });
  }

  render() {
    const { rates, baseCurrency } = this.props.store.getState();

    const currencyOptions = this.currencies.map( (currency) => {
      return (
        <div onClick={ () => { this.fetchRates(currency) }}
             key={currency}
             className="currency-option">
          {currency}
        </div>
      );
    });

    const currencyNames = Object.keys(rates);
    const currencyRates = currencyNames.map( (currency) => {
      return (<Currency name={currency}
                        rate={rates[currency]}
                        key={currency}/>);
    });

    return (
      <div>
        <h1>Currency Exchange Rates</h1>
        <h3>Base Currency: {baseCurrency}</h3>

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
};


export default Widget;
