var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Give me num: ", function (numStr) {
      var thisNumber = parseInt(numStr);

      sum += thisNumber;
      console.log("Partial sum: " + sum);

      addNumbers(sum, numsLeft - 1, completionCallback);
    })
  } else {
    completionCallback(sum);
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
  reader.close();
});
