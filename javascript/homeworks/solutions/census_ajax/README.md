# Your (First) First AJAX Request

Today is the day to make our first ever AJAX request. We will be querying US census data using their public API. Using the [skeleton provided][skeleton] for you, create an AJAX request that will fetch the number of people who speak a certain language in the US. Remember, JQuery's `ajax` method takes a single object as an argument. If you want, you can revisit the [Basic AJAX][basic-ajax] reading for examples.

### Building Your Request

Set your path to: `http://api.census.gov/data/2013/language?key=5eac739dc334cf11fdd846b87988ea41591abd29` (key included for you)

To work properly with the US census API, we need our data object to include these keys:

- `LAN` (see [this list][language-list] for the options)
- `for` (use the key `us` for the US)
- `get` (use `EST,LANLABEL` for estimate and language label, respectively)

**Open the `index.html` page to see your results!**

Once you get your request working, you can play around with your data options to see data for different languages. A hint for formatting: with the data array that comes back, there will be two nested arrays - one with keys to the data, and one with the data itself; if you `console.log` each nested array separately, it will be much easier to read.

Now celebrate! You're AJAX-ing!

[skeleton]: ../../questions/census_ajax/census_ajax.zip
[language-list]: http://www.census.gov/hhes/socdemo/language/about/02_Primary_list.pdf
[basic-ajax]: https://github.com/appacademy/curriculum/blob/master/javascript/readings/basic-ajax.md
