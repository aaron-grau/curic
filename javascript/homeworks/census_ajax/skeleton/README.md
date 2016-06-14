# Your (First) First AJAX Request

Today is the day to make our first ever AJAX request. We will be querying US census data using their public API. Using the skeleton provided for you, create an AJAX request that will fetch the percent poverty by race in the US.

Remember, JQuery's `ajax` method takes a single object as an argument. If you want, you can revisit the [Basic AJAX][basic-ajax] reading for examples.

Set your path to: http://api.census.gov/data/timeseries/poverty/histpov2?key=5eac739dc334cf11fdd846b87988ea41591abd29 (key included for you)

To work properly with the US census API, we need our data object to include these keys:

- `RACE` (see list below for options)
- `time` (use the year 2014 - it seems to be the most recent data available)
- `get` (use 'PCTPOV' - percent poverty)

The API documentation provides the following IDs for each race category. However, please note that 3, 5, 8, and 11 seem to be broken.

- 1: All Races
- 2: White Alone
- ~~3: White~~
- 4: White Alone, Not Hispanic
- ~~5: White, Not Hispanic~~
- 6: Black Alone or in Combination
- 7: Black Alone
- ~~8: Black~~
- 9: Asian Alone or in Combination
- 10: Asian Alone
- ~~11: Asian and Pacific Islander~~
- 12: Hispanic (of any race)

Once you get your request working, you can play around with your request to see data for different racial categories. A hint for formatting: with the data array that comes back, there will be two nested arrays - one with keys to the data, and one with the data itself; if you `console.log` each nested array separately, it will be much easier to read!

[basic-ajax]: https://github.com/appacademy/curriculum/blob/master/javascript/readings/basic-ajax.md
