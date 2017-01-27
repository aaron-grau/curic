# Homework with Git

Starting today, and for the duration of your cohort, you will use git to submit all of your homework assignments. All homework assignments will be accumulated into a single repo on GitHub. Each day's homework will be done in a local copy and pushed up to GitHub daily.

## Setup
Let's initialize our repo and setup a GitHub remote before moving on to adding homeworks.
* Create a new folder in the directory of your choosing
  ```bash
  cd path-to-some-directory
  mkdir homeworks
  ```

* Initialize empty git repository in your new directory
  ```bash
  cd homeworks
  git init
  ```

* Create a basic README file and initial commit
  ```bash
  touch README.md # makes file in current directory
  cat > README.md << "# App Academy Homeworks" # "creates 'App Academy Homeworks' header in README"
  git add README.md
  git status # let's get in the habit of making sure we commit the intended files
  git commit -m "Initial commit"
  ```

* Create remote repository on GitHub
  * Login to GitHub and click the "New Repository" button.
  * Use the default settings and click "Create Repository".

* Add GitHub remote repository to local version and make first `push`.
  * You will need the url for your newly created remote. This will be `https://www.github.com/<username>/<repo-name>.git`. Note the `.git` at the end.
  ```bash
  git remote add origin https://www.github.com/<username>/<repo-name>.git
  git push origin master
  ```

* We've now successfully setup a repo on GitHub and made our first push. :smiley:

## Submitting homework
We want to do our homework within our *homeworks* repo. If we've just initialized our homeworks repo then we already have the most up-to-date version on our machine, but if we are doing our homework from a different machine we will need to *clone* our remote repo to make a new local copy we can work from.

As we progress, we will create a new directory for each day's work. Our homeworks repo will take the following form:
```
homeworks/
  |
   -- W1D1/
   -- W1D2/
   -- W1D3/
```

Before beginning the day's homework, ensure your local repo is up-to-date with the remote.
  * If we have a local copy, check if it is up-to-date. Type command `git status` in terminal. If local is up-to-date, we should see `Your branch is up-to-date with 'origin/master'`. Otherwise type command `git pull` in terminal to update your local version.
  * If we do not have a local copy, use `git clone`. This will create a new copy of your repo in the current directory.
  
  ```
  git clone https://www.github.com/<username>/<repo-name>.git
  ```

To add homework, start by creating a new folder *WXDX* in your *homeworks* directory. Do your homework in that directory, and commit often! When you are done, simply run:

```bash
git push origin master
```

* **NB: git commit messages should start with capitalized verbs in the present tense that tell what the commit does and should not have any trailing punctuation**
