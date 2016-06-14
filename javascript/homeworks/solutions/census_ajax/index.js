console.log("Console has been opened.");

$.ajax({
  type: 'GET',
  url: 'http://api.census.gov/data/2013/language?' +
   'key=5eac739dc334cf11fdd846b87988ea41591abd29',
  data: {LAN: 620,
        for: 'us',
        get: 'EST,LANLABEL'},
  success(data) {
    console.log("The census data has arrived.");
    console.log(data[0]);
    console.log(data[1]);
  },
  error() {
    console.error("An error occurred.");
  },
});

console.log("The AJAX request has been sent...");
