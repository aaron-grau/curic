# ArtworksAPI

## Learning Goals

+ Be able to write Active Record models quickly
+ Know how to write a `user_params` method
+ Be able to write the five API RESTful controller methods
+ Know how to test your API endpoints with Postman
+ Know how to create and destroy join table records via controller methods
+ Know how a nested route works

## Layering on Artworks

We're going to continue building on the API we built in the first
routes project.

Our goal is to build an application to store and share artwork.
Each user has a set of artworks that they own/control. These artworks
can also be shared with other users. An artwork that has been shared with
one or more other users will be visible to those users, but the artwork
still 'belongs to' the original user. Although we will maintain this
conceptual distinction between a user's own artworks vs. the artworks
that have been shared with that user, we will eventually write an index
method that will combine both types of a user's viewable artworks
together so that we can see any art made by or shared with that user.

## Phase I: Data Layer

You almost always start with the data layer when you're thinking about
adding functionality. What pieces of data are necessary to implement
the functionality you need? What changes need to be made to the
database schema? What models do you need? What associations and
validations?

**User**

* You should have `name` and `email` columns from the first routes
  project. Change your User model so that you only have one column:
  `username`. Write new migrations to accomplish this.
* Enforce presence and uniqueness of `username` at both ActiveRecord
  and DB levels.

**Artwork**

* Columns:
    * `title`
    * `image_url`
    * `artist_id`
* All of these should be present. Add ActiveRecord validations and DB
  constraints.
* Ensure a single user cannot have two artworks with the same
  title. On the other hand, two different users can have
  artworks with the same title. In other words, two separate artists could
  both have artworks of their own named "Untitled", but a single artist
  should not be able to have two pieces with that same title. This means
  that the `artist_id` and `title` **combination** must be unique. Enforce
  this at the DB and model levels.
    * [Here's some help for the model validation][scoped-uniqueness]
    * To add the DB constraint, consider what would happen if we added
      indexing and a uniqueness constraint to not one, but two columns.
      [Check the Rails API docs for more info][multi-column-indexing]
* Add an index on `artist_id` so that we can quickly get all the contacts for a user.
* Add associations between `User` and `Artwork`.
  * Call the association from `Artwork` to `User` `Artist`.
    * Note that our column in the `artworks` table does not have to be `user_id` despite
      being a foreign key to the `users` table. In this case, `artist_id` is much
      more descriptive and therefore preferable.

[scoped-uniqueness]: http://apidock.com/rails/ActiveModel/Validations/ClassMethods/validates#940-uniqueness
[multi-column-indexing]: http://apidock.com/rails/v2.3.8/ActiveRecord/ConnectionAdapters/SchemaStatements/add_index

**ArtworkShare**

The `artwork_shares` table is a joins table. Its whole purpose is to link a `User`
(the person viewing the artwork) with an `Artwork`.

* Columns:
    * `artwork_id`
    * `viewer_id`
      * Again, prefer columns names that are more semantic (i.e. more descriptive
        of the relationship) when possible.
* Ensure that both are present. Add the two levels of
  validations/constraints.
* Ensure that a user cannot have a single `Artwork` shared with them more than once.
  Add two levels of validation/constraint.
* Add indices to `ArtworkShare`'s foreign key columns for fast lookup.
  * NB: we almost always want to create indexes for any foreign keys,
    particularly if those foreign keys will be used in a `has_many` or a
    `has_one` relationship.
* Add associations connecting an `ArtworkShare` to both an `Artwork` and
  a `User` (name this association `viewer`).
* Add a through association `shared_viewers` on `Artwork`.
    * `Artwork#shared_viewers` will return the set of users with whom an artwork has
      been shared.
* Add a through association from `shared_artworks` on `User`.
    * `User#shared_artworks` will return the set of artworks that have been
      shared with a user (*not* the set of artworks that a user has
      shared with others).

Use the Rails console to ensure that you can create `User`,
`Artwork`, and `ArtworkShare` instances. Test that your validations and
associations work.

## Phase II: Users and Artworks API

Next let's move to the API layer. The API describes how you will **expose**
your data and specifies how the outside world can interact with it.

First, build out your `User` controller actions. You'll want:

* `user_params` helper method
    * should be private
    * requires the key `:user` in params, and permits each of the user
      attributes as keys in the nested hash.
* `create` (POST `/users`)
    * Using request parameters (use `user_params`), build a new
      `User` object and try to save it.
    * Remember to use `if @user.save` to check if validations passed.
    * On error, render validation errors using
      `@user.errors.full_messages`. Set the status code to indicate
      error.
* `destroy` (DELETE `/users:id`)
    * Find the user (we can lookup the id in `params[:id]`) and destroy the object.
    * Best practice is to render the destroyed user after destroying it in the database.
    * Use `dependent: :destroy` in the `artworks` and
      `artwork_shares` associations on `User`. This ensures that the
      associated records are also destroyed.
* `index` (GET `/users`)
    * Render all the users in the database.
* `show` (GET `/users/:id`)
    * Render a single user, using the `:id` in `params[:id]`.
* `update` (PATCH `/users/:id`)
    * Find the requested user
    * Use `update` with `user_params` to do a mass-assignment update
      and save.
    * Render validation errors using
      `@user.errors.full_messages`. *Don't forget the status code!*

In the `routes.rb` file, use the `only:` option for `resources` to
restrict to just the five actions above. There should be six routes
in total; remember that Rails will generate both `patch` and `put`
routes for the `update` action.

Next, move on to creating `ArtworksController`. Build the same five
actions and params helper method. Your code should look very similar,
but practice this a second time.

Next, use Chrome's Postman plugin to test your API. Test every API endpoint.

**Hint**: For this project, do not write any authentication or
authorization logic. When creating a new `artwork`, require the
uploader submit their `artist_id`. This isn't secure because anyone
could always take your `artist_id` and upload new artworks in your name.
For now, let's assume the users of our service aren't malicious
:-)

## Phase III: Sharing `Artworks`

**ArtworkShare Routes**

Add a new `resources` routes and controller for `ArtworkShare`.
Include the following actions and associated routes.
* `create` - you'll want to pass the `artwork_id` and the `viewer_id`.
Also, use strong parameters by writing an `artwork_share_params` helper
method that will whitelist the `ArtworkShare` attributes.
* `destroy` - un-shares an `Artwork` with a `User`. To delete a share,
the user should issue a DELETE to `/artwork_shares/123`, where
`123` is the id of the `ArtworkShare` to destroy.

Again, it is conventional for an API to render back an object that is
created or destroyed after creating or destroying it. Both of these
routes should conventionally render the created/destroyed `ArtworkShare`
as the response.

We won't need any of the other routes, so you can use `only:` to
restrict them.

**User's Artworks: nested routes**

Right now a GET to `/artworks` gets all of the artworks in the
system. That's probably too many: we probably want to only fetch the
`Artwork`s of a particular user.

Let's add a new, nested resource, `/users/:user_id/artworks`, so that
we can get the artworks for a given user. We'll only need the `index`
action for this.

You may remove the `index` action from the top-level `artworks`
resource. This will modify our API so that a user can't download all the
artworks in one go, but instead only per-user. For example, you will
be able to get user 1's artworks through `GET /users/1/artworks`, user 2's through
`GET /users/2/artworks`, etc.

The nested resource will still hit `ArtworksController#index`. Rewrite
the `index` method to return:

*  the `Artwork`s owned by a user ***and***
*  the `Artwork`s shared with the user.
You can access the specified user through `params[:user_id]`
because it is part of the nested route.

## Bonus

<!-- Implement these (thinking about sensible routes for each):

* Make a `Comment` model that `belongs_to` either a user or a
  contact. A user should be able to comment on a contact, shared
  contact, or on another user. Use [polymorphic associations][poly-assoc].
  * **Note:** The Railscast uses an outdated Rails 2 routing syntax.
    Just nest your comments resources under users and contacts in the
    same way that you would nest any other resource.
* Favorite contacts. This will require adding additional columns to
  contacts (for favoriting of contacts by their owner) and shared
  contacts (for favoriting of contacts shared to a user). Use a semantic
  custom route to accomplish this. [Hint.][more-restful-actions]
* Contact groups
    * A user can have many groups
    * Contacts can belong to more than one group -->

[poly-assoc]: http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[concerns-for-models]: http://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns
[more-restful-actions]: http://guides.rubyonrails.org/v3.2.14/routing.html#adding-more-restful-actions
