[schedule]: courses/sf

# Purpose 

This repository exists solely to store curriculum materials. 

It does not follow "presentation logic", i.e. materials are not organized according to the day on which they are presented. 

Check out the [**SF course**][schedule] for chronologically-organized READMEs linking to curriculum materials.

# Organization 

Materials are organized by topic and then type. 

* **Topics** 
	* Ruby
	* SQL
	* Rails
	* HTML/CSS
	* Javascript
	* React

* **Types**   
	* **Readings**: markdown files for teaching material.   
	* **Projects**: Work done in class.
		* Each project should have its own folder holding instructions (as a README), skeleton, solution, etc.
	* **Homeworks**: Work done outside of class. 
	* **Demos**: Self-contained demonstrations requiring no student input.
	* **Assets**: Images, etc. Roughly miscellaneous.

**Note:** There is no "Solutions" folder: solutions should live in the folders of their respective projects (e.g. javascript/projects/asteroids/solution).

# Revision Workflow 

There are three types of revisions: **patches, revisions, and releases**.

**Note:** Gitflow and versioning coming soon.

## Patches

Patches can be accomplished in one commit and do not require peer-review. Examples include fixing typos, broken links and formatting.

Patches can be done directly to the `master` branch.

## Revisions

Revisions are changes that alter the curriculum in a modular way. Examples include changing a project's instructions, removing deprecated materials, adding new materials, and updating a solution.

Revisions should be done on a feature branch. Once complete, they should be assigned to the curriculum point-person for review and merging into master.

## Releases

Releases are major alterations to the curriculum. Examples include introducing a new language or framework and updating materials that cross-cut many parts of the curriculum.

Releases are a team-wide concern and plans should be developed on an ad hoc basis.
