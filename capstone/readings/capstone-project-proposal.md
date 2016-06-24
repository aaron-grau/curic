# Capstone Project Proposals

Welcome to capstone projects! This is a hectic and exciting time, and it represents
the culmination of your education at App Academy. Now that you've chosen your
project, we want to help you build the best projects possible; so we'll help you
come up with a road map to keep yourself on track.

## Sample Proposal

To get started, take a look at this [sample proposal repo][sample-proposal].
This is what your proposal should look like by the time you've finished it.
We want it to be comprehensive, well-organized, and well-polished. This is not
just for our benefit; by the time you start implementing your project, you will
have already thought carefully about the functionality and scope of each
feature, allowing your future self to focus completely on writing the code for
it.

[sample-proposal]: ../demos/sample_project_proposal

## Setting up the Project Repo

0. Click "Download ZIP" on the sample proposal page.

0. Save and extract the contents to whatever folder you want your project to
   live in.

0. `cd` into the folder and run this command, adding any other options you
   might want:

   `rails new . --skip-turbolinks --database=postgresql`

   This will generate your Rails app in the current folder, rather than
   creating a new directory.

0. `git init` and push to your remote repository. A capstone project is born!

## Fleshing Out the Proposal

The README of your project repo MUST include the following:

### Heroku Link

At the end of the first day of capstone projects, you should have a link to the
live version of your site. It doesn't have to be pretty, but it has to be
there. Push to Heroku ASAP!

### Minimum Viable Product

Write a one-sentence summary of the project and a list of the features that
would be absolutely necessary for the app to be marketable. Your MVP section must follow the format outlined [here][mvp-features].

[mvp-features]: mvp-list.md

### Wireframes

You should also link to a page containing wireframes of the views essential for
your MVP. Each wireframe should be a basic representation of the layout and
information presented in the view. If you plan to use nested React components,
clearly indicate the heirarchy in your wireframes. We should be able to "click"
through your website using your wireframes.

**NB**: You can use any tool you like to create your wireframes (pen and paper
are completely acceptable). To spare your eyes from my chicken scratches, I made
the sample proposal wireframes using [draw.io][draw.io].

[draw.io]: https://www.draw.io/

### React Components

In addition to the view wireframes, you should diagram a tree indicating your
application's overall component structure. See the sample project proposal for
an example of this.

### Flux Cycles

Flux loops are organized by data type. Under each data type, there may be sub-
categories, and each action is listed with the sequence of events that result
from its invocation, ending with the API or store. Finally, store listeners are
listed at the end.

You should be able to use this document trace an action starting with where it
was invoked, through the API/store involved, and finally to the components that
update as a result. This is important because once you start implementing your
flux loops, that's precisely what you'll need to do.

### DB Schema

Link to a document outlining the database schema for your app. Build up the
schema by walking through your app's wireframes. Think carefully about what data
will be needed for each view and the best way to store that data. Make note
of any database-level validations and foreign key relationships.

### API Endpoints

Link to a page that lists your Rails API endpoints. Break these up between
HTML and JSON endpoints.

### Implementation Timeline

This will be the road map for your application. Rather than building the
entire project all at once, you're going to implement one feature at a time.
Refer back to your MVP and group the features into logical phases. You
should have a working app at the end of each phase (even if not all of your
features are in yet). For each phase, write a brief game plan and list out any
third-party APIs, front-end and back-end components you will need to implement.

## Submission

When you've finished setting up your capstone project repo, add it to Progress
Tracker and email your instructors (instructors-sf@appacademy.io or
instructors-ny@appacademy.io).  A TA will review each proposal and leave
their comments in issues on the project repo. Be prepared to respond to
feedback, and keep your README up to date as you make progress. Happy hunting!
