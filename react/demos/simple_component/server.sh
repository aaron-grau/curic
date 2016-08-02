if !([ -d "node_modules" ]); then
  npm install && webpack
fi

ruby -run -ehttpd . -p8000