# ContactsAPI

* **[Live version](http://aa-contactsapi.herokuapp.com/users)**

# Layering on Contacts

We're going to continue building on the API we built in the first
routes project.

Our goal is to build an application to store and share email contacts.
Each user has a set of contacts that they own/control. These contacts
can also be shared with other users. A contact that has been shared with
one or more other users will be visible to those users, but the contact
still 'belongs to' the original user. Although we will maintain this
conceptual distinction between a user's own contacts vs. the contacts
that have been shared with that user, we will eventually write an index
method that will combine both types of a user's viewable contacts
together.

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

**Contact**

* Columns:
    * `name`
    * `email`
    * `user_id`
* All of these should be present; add ActiveRecord and DB level
  checks.
* Enforce that the same `email` address cannot be recorded twice for
  the same user. A single user can't have two contacts with the same
  email address. Two different users can each have contacts with the
  same email address, however. This means that the `user_id` and
  `email` combination must be unique. Enforce this at the DB and model
  levels. [Here's some help for the model validation][scoped-uniqueness]!
* Add associations between `User` and `Contact`. Call the association
  from `Contact` to `User` `owner`.
* Add an index on `user_id` so that we can quickly get all the
  contacts for a user.

[scoped-uniqueness]: http://apidock.com/rails/ActiveModel/Validations/ClassMethods/validates#940-uniqueness

**ContactShare**

* Columns:
    * `contact_id`
    * `user_id`
* Ensure that both are present. Add the two levels of
  validations/constraints.
* Ensure that a user can't have two shares for the same contact. Add
  two levels of validation/constraint.
* Add indices to `ContactShare`'s foreign key columns for fast lookup.
  * Note: we almost always want to create indexes for any foreign keys,
    particularly if those foreign keys will be used in a `has_many` or a
    `has_one` relationship.
* Add associations from `ContactShare` to both `Contact` and
  `User`. Add associations in the other direction.
* Add a through association from `Contact` to `shared_users`.
    * `Contact#shared_users` is the set of users with whom a contact has
      been shared.
* Add a through association from `User` to `shared_contacts`.
    * `User#shared_contacts` is the set of contacts that have been
      shared with a user (*not* the set of contacts that a user has
      shared with others).

Note that both `Contact`s and `ContactShare`s have `user_id`s, but they
mean different things. For a `Contact`, the `user_id` points to the
owner of that contact, whereas for a `ContactShare` the `user_id` points
to the user with whom a given contact has been shared. Note also that
neither of these `user_id`s have anything to do with the person whose
contact information is being stored; that person needn't be in our
database at all.

Play around in the Rails console to ensure that you can create `User`,
`Contact`, and `ContactShare` models. Ensure that your associations
work.

## Phase II: Users and Contacts API

Next you usually move to the API layer: how you will be **exposing**
your data, specifying how the outside world can interact with it.

First, build out your `User` controller actions. You'll want:

* `user_params` helper method
    * should be private
    * requires the key `:user` in params, and permits each of the user
      attributes as keys in the nested hash.
* `create` (POST `/users`)
    * Using uploaded parameters (use `user_params`), build a new
      `User` object and try to save it.
    * Remember to use `if @user.save` to check if validations passed.
    * On error, render validation errors using
      `@user.errors.full_messages`. Set the status code to indicate
      error.
* `destroy` (DELETE `/users:id`)
    * Find the user (use `params[:id]`) and destroy the object.
    * Traditionally you render the destroyed user.
    * Use `dependent: :destroy` in the `User#contacts` and
      `User#contact_shares` associations, so that these get destroyed,
      too.
* `index` (GET `/users`)
    * Render all the users in the DB.
* `show` (GET `/users/:id`)
    * Render a single user, fetched by `params[:id]`.
* `update` (PATCH `/users/:id`)
    * Find the requested user (`params[:id]`)
    * Use `update` with `user_params` to do a mass-assignment update
      and save.
    * Render validation errors using
      `@user.errors.full_messages`. Don't forget the status code!

In the `routes.rb` file, use the `only:` option for `resources` to
restrict to just the five actions above. There should be six routes
in total; remember that Rails will generate both `patch` and `put`
routes for the `update` action.

Next, move on to creating `ContactsController`. Build the same six
actions. Your code should look very similar, but practice this a
second time.

Next, use RestClient or Chrome's Postman plugin to test your API. Test
every API endpoint.

**Hint**: For this project, do not write any authentication or
authorization logic. When creating a new `contact`, require the
uploader submit their `user_id`. This isn't secure because anyone
could always take your `user_id` and upload new contacts in your name.
For now, let's assume all the users of our service aren't malicious
:-)

## Phase III: Sharing `Contacts`

**ContactShare Routes**

Add a new `resources` and a controller for `ContactShare`s. Add an
action to `create` a `ContactShare`; you'll want to upload the
`contact_id` and the `user_id` to share with.  Also, remember to use
strong parameters (`params[:contact_share].permit(:attribute_here,
:another_attribute_here)`).

Add a `destroy` action that will un-share a `Contact` with a
`User`. To delete a share, the user should issue a DELETE to
`/contact_shares/123`, where `123` is the id of the `ContactShare` to
destroy.

Both routes should conventionally render the created/destroyed
`ContactShare` for a response.

We won't need any of the other routes, so you can use an `only:` to
restrict them.

**User's Contacts: nested routes**

Right now a GET to `/contacts` gets all of the contacts in the
system. That's probably too many: we probably want to only fetch the
`Contact`s of a particular user.

Let's add a new, nested resource, `/users/:user_id/contacts`, so that
we can get the contacts for a given user. We'll only need the `index`
action for this nested resource.

You may remove the `index` action from the top-level `contacts`
resource. We'll modify our API so that you can't download all the
contacts in one go, but instead only per-user. You will be able to get
user 1's contacts through `GET /users/1/contacts`, user 2's through
`GET /users/2/contacts`, etc.

The nested resource will still hit the `ContactsController`. Rewrite
the `index` method to return (a) the `Contact`s owned by a user plus
(b) the `Contact`s shared with the user. You can access the specified
user through `params[:user_id]` because it is part of the nested
route.

## Bonus

Implement these (thinking about sensible routes for each):

* Make a `Comment` model that `belongs_to` either a user or a
  contact. A user should be able to comment on a contact, shared
  contact, or on another user. Use [polymorphic associations][poly-assoc].
  * **Note:** The Railscast uses an outdated Rails 2 routing syntax.
    Just nest your comments resources under users and contacts in the
    same way that you would nest any other resource.
* Favorite contacts. This will require adding additional columns to
  contacts (for favoriting of contacts by their owner) and shared
  contacts (for favoriting of contacts shared to a user). Use a nice
  custom route to accomplish this. [Hint.][more-restful-actions]
* Contact groups
    * A user can have many groups
    * Contacts can belong to more than one group

[poly-assoc]: http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[concerns-for-models]: http://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns
[more-restful-actions]: http://guides.rubyonrails.org/v3.2.14/routing.html#adding-more-restful-actions
