# Homework with Git

Starting today, and for the duration of the cohort, you will use git to submit all of your homework assignments.

## Setup

* Create a new folder in the directory of your choosing
  ```bash
  cd Documents/app_academy/
  mkdir homeworks
  ```

* Initialize empty git repository in your new directory
  ```bash
  cd homeworks
  git init
  ```
* Complete W1D1 homework
* Make initial git commit
  ```bash
  git add W1D1/hw.rb
  git commit -m "Add w1d1 homework"
  ```

  * **NB: git commit messages should start with capitalized verbs in the present tense that tell what the commit does and should not have any trailing punctuation**

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
  ```bash
  git push origin master
  ```

## Adding Homework

To add homework, start by creating a new folder *WXDX* in your *homeworks* directory:

```
homeworks/
  |
   -- W1D1/
   -- W1D2/
   -- W1D3/
```

Do your homework in that directory, and commit often! When you are done, simply run:

```
  git push origin master
```
