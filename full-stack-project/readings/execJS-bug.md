## The Problem

`rake assets:precompile` fails with an ExecJS error when you push to heroku.

## Quick fix 1

1. `npm install —save babel-preset-es2015`
2. Add `es2015` to `webpack.config.js` at `module.loaders.query.presets`


## Quick fix 2 (if 1 doesn't work)

In `production.rb`, comment out the line:
```ruby

config.assets.js_compressor = :uglifier

```


## Longer fix

Check out an older commit that works and narrow down the commit that broke.

1. Locally, run `git log` and find the hash of an older commit (e.g., `83aefdc3`)
2. Check out that older commit (`git checkout 83aefdc3...`)
3. Run `rake assets:precompile ENV=production` on that older commit
4. If it works, find a commit halfway between and try steps 2-3 on that commit.
5. Keep binary searching until you find the commit that breaks.
6. Look for culprits (run binary search on the file changes you made).

## Tips

Uglifier sometimes has issues with ES6, so it might be an ES6 line you wrote somewhere.
