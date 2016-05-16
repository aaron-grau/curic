# A Basic AJAX Example

```js
    $.ajax({
      type: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      success: function(data) {
        console.log("We have your weather!")
        console.log(data);
      },
      error: function() {
        console.error("An error occured.");
      },
   });

```
