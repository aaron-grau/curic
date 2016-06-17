# Heroku Isn't Working

1. Look at the Javascript console on your website on heroku.com, look for errors.
2. Look at the server logs.  You can set them up [here](../readings/heroku-deployment.md).  Then run `heroku logs -t` and see what error pops up.
3. Run `heroku run bash` to poke around in terminal on production.
