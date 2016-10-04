# Full-Stack Project Proposals

Welcome to full-stack projects! This is a hectic and exciting time, and it
represents the culmination of your education at App Academy. Now that you've
chosen your project, we want to help you build the best projects possible; so
we'll help you come up with a road map to keep yourself on track.

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

0. Create a new Rails project. 
	-	`--skip-turbolinks=true`
	- `--database=postgresql`
0. `git init` a repository for your project.
0. Add the following to your `.gitignore`:

	```
	node_modules/
	bundle.js
	bundle.js.map
	```
0. Setup a remote repository on Github.
0. Commit your files and push to your remote.

## Set up your `docs` directory

Your project is going to have a directory that stores all your planning
materials. The main document there will be a development README that outlines
all the major facets of your development process.

0. Create a `docs` folder in your project directory.
0. The `docs` directory must contain the following: 

	0. A `README.md` file. This is your Development README, which will:
		-	outline the architecture,
		- show wireframes,
		- describe features, and
		- outline a development timeline for your application.

		**Note:** this README is NOT the same as the Production README that lives at 
		the project's root directory.

	0. The following files, which should be linked to in the Development README: 
		- `api-endpoints.md`
		- `component-hierarchy.md`
		- `redux-structure.md`
		- `sample-state.md`
		- `schema.md`

0. Create a `docs/wireframes` folder to hold wireframe images.

## Fleshing Out the Proposal

The Development README of your project repo MUST include the following:

### Heroku Link

At the end of the first day of full-stack projects, you should have a link to the
live version of your site. It doesn't have to be pretty, but it has to be
there. Push to Heroku ASAP!

### Minimum Viable Product

Write a one-sentence summary of the project and a list of the features that
would be absolutely necessary for the app to be marketable. Your MVP section must follow the format outlined [here][mvp-features].

[mvp-features]: mvp-list.md

### Wireframes

- `/wireframes`

Links to wireframes of your application's UI views. Each wireframe should be a
basic representation of the layout and information presented in a view. If you
plan to use nested React components, clearly indicate the hierarchy in your
wireframes. We should be able to see every view of your website using your
wireframes, and how each view is reached.

**NB**: You can use any tool you like to create your wireframes (pen and paper are
completely acceptable). If your writing looks like chicken scratches, try
[draw.io][draw.io].

[draw.io]: https://www.draw.io/

### React Components

- `component-hierarchy.md`

In addition to the wireframes, you should diagram a tree indicating your
application's overall component structure. 

Discuss how you will nest your components. If components will need containers, indicate what state and dispatch props they will need. For presentational components, discuss what props and state they will need.

Map out your React Routes with their respective components and paths.

See the sample project proposal for an example of this.

### Sample State

- `sample-state.md`

Create a basic illustration of your state shape. Think about what information
you need to store for your app to work, and how best to organize it to minimize
duplication and maximize ease of access.

### Redux Architecture

- `redux-structure.md`

Discuss how information will move through your application state and where it
will be stored.

Organize your discussion around each `slice` (i.e. reducer) of state that will
be needed. You should be able to use this document to trace an action starting
with where it was dispatched, through any middlewares and API utils involved,
through the reducer, and finally to the components that update as a result. This
is important because once you start implementing your redux loops, that's
precisely what you'll need to do.

### DB Schema

- `schema.md`

Link to a document outlining the database schema for your app. Build up the
schema by walking through your app's wireframes. Think carefully about what data
will be needed for each view and the best way to store that data. Make note
of any database-level validations and foreign key relationships.

### API Endpoints

- `api-endpoints.md`

Link to a page that lists your Rails API endpoints. Break these up between HTML
and JSON endpoints. Discuss what params, if any, will be needed for each
endpoint, and what information will be returned.

### Implementation Timeline

Create a section in your proposal README for each `phase` of your project to develop an implementation timeline.

Refer back to your MVP and group the features into logical phases with detailed lists of each task necessary to develop the feature. This will be
the road map for your application. Rather than building the entire project all
at once, you're going to implement one feature at a time. You should have a
working app at the end of each phase (even if not all of your features are in
yet). For each phase, write a brief game plan and list out any third-party APIs, front-end and back-end components you will need to implement.

## Submission

When you've finished setting up your full-stack project repo, add it to Progress Tracker and email your instructors (instructors-sf@appacademy.io or
instructors-ny@appacademy.io).  A TA will review each proposal and leave
their comments in issues on the project repo. Be prepared to respond to
feedback, and keep your README up to date as you make progress. Happy hunting!
