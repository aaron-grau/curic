# Homework with Git

Starting today, and for the duration of the cohort, you will use git to submit all of your homework assignments.

To get started, follow these instructions:

* Create a new folder in the directory of your choosing
  ```
  cd Documents/app_academy/
  mkdir homeworks
  ```

* Initialize an empty git repository in your new directory
  ```
  cd homeworks
  git init
  ```
  
* Make an initial git commit
  ```
  git add -A
  git commit -m "create homeworks repo"
  ```

  * **NB: git commit messages should start with verbs in the present tense that tell what the commit does**

* Set a remote
  * Create a new repository on `github.com` through the 'New repository' button
  * Add a  remote with the correct path
  ```bash
  # for SSH
  git remote add origin git@github.com:YOUR_USERNAME/homeworks.git
  # for HTTPS
  git remote add origin https://github.com/YOUR_USERNAME/homeworks.git
  ```
* Push to the remote
  ```
  git push origin master
  ```

That's it! Now for each day's homework, you can simply create a new directory inside of your `homeworks` directory and use git to track your work -- remember to commit often and push to your remote!
