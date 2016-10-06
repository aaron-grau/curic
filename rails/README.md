# Rails

* [Setup][rails-setup]
* Rails Api [api.rubyonrails.org][rails-api]
* Rails Guides [guides.rubyonrails.org][rails-guides]

[rails-setup]: readings/rails-setup.md
[rails-api]: http://api.rubyonrails.org/v4.0.2/
[rails-guides]: http://guides.rubyonrails.org/v4.0.2/

## w4d1

### Assessment03
+ [Practice][assessment-prep-3]

### Video Lectures (60 min)
:closed_lock_with_key: `go_video_go`
+ [:movie_camera: What is an API?][api-video] (10 min)
+ [:movie_camera: HTTP Request/Response][http-req-res-video] (5 min)
+ [:movie_camera: Rails Routing][rails-routing-video] (5 min)
+ [:movie_camera: Routes Demo][routes-demo-video] (10 min)
+ [:movie_camera: Basic Controller Demo][basic-controller-demo-video] (15 min)
+ [:movie_camera: RESTful Controller Demo][restful-controller-demo-video] (15 min)

### Readings
+ [Callbacks][callbacks]
+ [Delegation][delegation]

### Homeworks (125 min)
* [Library Controller][library-hw] (45 min)
* [HTML Curriculum 1: Introduction][html-1] (45 min)
* [HTML Curriculum 2: Containers][html-2] (35 min)

### Additional Resources
+ [Routing I: Basics][routing-i]
+ [Basic Controllers][basic-controllers]
+ [Basic JSON API][basic-json-api]
+ [Routing II: Nested Collections][routing-ii]
+ [:movie_camera: Rails Screencasts (3 thru 11)][rails-screencasts]
  + [:computer: Code from demos][rails-videos-code]

### Projects
+ [First Routes and Controllers][first-routes]
+ [Contacts API][contacts-api]

[assessment-prep-3]: http://github.com/appacademy/assessment-prep#assessment-3
[api-video]: https://vimeo.com/168498417
[http-req-res-video]: https://vimeo.com/168498424
[rails-routing-video]: https://vimeo.com/168498679
[routes-demo-video]: https://vimeo.com/168499905
[basic-controller-demo-video]: https://vimeo.com/168501163
[restful-controller-demo-video]: https://vimeo.com/168505535

[callbacks]: readings/callbacks.md
[delegation]: readings/delegation.md

[rails-screencasts]: https://vimeo.com/album/2953690/sort:alphabetical
[rails-videos-code]: demos/intro_rails_video_demo

[library-hw]: ./homeworks/questions/library

[routing-i]: readings/routing-part-i.md
[basic-controllers]: readings/basic-controllers.md
[basic-json-api]: readings/basic-json-api.md
[routing-ii]: readings/routing-part-ii.md

[first-routes]: projects/first_routes
[contacts-api]: projects/contacts_api

## w4d2

### Readings (90 min)
* [Basic views][basic-views] (15 min)
* [Partials][partials] (15 min)
* [ERB][erb] (15 min)
* [HTML Form Basics][html-forms] (15 min)
* [Rails Parameter Conventions][rails-params-conventions] (10 min)
* [Mass Assignment][mass-assignment] (5 min)
* [PATCH, PUT, and DELETE][patch-put-and-delete] (5 min)
* [Debugging][debugging-rails] (10 min)

### Homeworks (30 min)
* [HTML Curriculum 3: Forms][html-3] (30 min)

### Additional Resources
* [Easy Forms Demo][easy-forms-demo]

### Projects
* [99 Cats][99-cats]

[basic-views]: readings/basic-views.md
[erb]: readings/erb.md
[html-forms]: readings/html-forms.md
[rails-params-conventions]: readings/parameter-conventions.md
[mass-assignment]: readings/mass-assignment.md
[patch-put-and-delete]: readings/patch-put-and-delete.md
[debugging-rails]: readings/debugging-rails.md
[partials]: readings/partials.md

[auth-00-user-model]: https://vimeo.com/groups/appacademy/videos/93097977
[auth-01-basic-sessions]: https://vimeo.com/groups/appacademy/videos/93097978
[auth-02-password-digest]: https://vimeo.com/groups/appacademy/videos/93097979
[auth-03-password-pseudo-attribute]: https://vimeo.com/groups/appacademy/videos/93100190
[auth-04-session-token]: https://vimeo.com/groups/appacademy/videos/93101442

[easy-forms-demo]: demos/easy_forms_demo
[99-cats]: projects/ninety_nine_cats_i

## w4d3

### Video lectures (2 hr, 38 min)
:closed_lock_with_key: `go_video_go`
* [:movie_camera: Secure State][auth-secure-state] (11 min)
* [:movie_camera: Cookies and Authentication][auth-cookies] (17 min)
* [:movie_camera: Encoding and Encryption][auth-encoding] (19 min)
* [:movie_camera: Hashing for Authentication][auth-hashing] (11 min)
* [:movie_camera: Salting][auth-salting] (31 min)
* [:movie_camera: BCrypt][auth-bcrypt] (7 min)
* [:movie_camera: Session and Flash][auth-session] (12 min)
* [:movie_camera: Auth Pattern][auth-pattern] (15 min)
* [:movie_camera: (cc) 06 CSRF Attack][auth-06-csrf-attack] (13 min)
* [:movie_camera: (cc) 07 CSRF Protection][auth-07-csrf-protection] (12 min)
* [:movie_camera: (cc) 08 CSRF Methods][auth-08-csrf-methods] (10 min)

### Homeworks (60 min)
* [HTML Curriculum 4: Head Section][html-4] (30 min)
* [Rails Auth][rails-auth-homework] (30 min)

### Additional Resources
* [Cookies][cookies]
* [Controllers and State][controllers-and-state]
* [CSRF and Forms][csrf-and-forms]
* [displaying validation errors, `flash`][error-validation]
* [Auth I: Creating Users][auth-part-i]
* [Auth II: Sessions][auth-part-ii]

### Project
* [99 Cats II: Auth][99-cats-part-ii]

[controllers-and-state]: readings/controllers-and-state.md
[csrf-and-forms]: readings/csrf.md
[cookies]: readings/cookies.md
[auth-part-i]: readings/auth-part-i.md
[auth-part-ii]: readings/auth-part-ii.md
[error-validation]: readings/validation.md
[12-displaying-validation-errors]: http://vimeo.com/groups/appacademy/videos/100729436
[13-flash-messages]: http://vimeo.com/groups/appacademy/videos/100729438

[vimeo-double-speed]: https://chrome.google.com/webstore/detail/vimeo-repeat-speed/noonakfaafcdaagngpjehilgegefdima?hl=en
[auth-05-bcrypt]: https://vimeo.com/groups/appacademy/videos/93104232
[auth-06-csrf-attack]: https://vimeo.com/groups/appacademy/videos/93114286
[auth-07-csrf-protection]: https://vimeo.com/groups/appacademy/videos/93114288
[auth-08-csrf-methods]: https://vimeo.com/groups/appacademy/videos/93114287
[auth-github]: https://github.com/appacademy/AuthVideoDemo
[auth-secure-state]: https://vimeo.com/160819941
[auth-cookies]: https://vimeo.com/160820294
[auth-encoding]: https://vimeo.com/160820971
[auth-hashing]: https://vimeo.com/160821222
[auth-salting]: https://vimeo.com/160822597
[auth-bcrypt]: https://vimeo.com/160825250
[auth-session]: https://vimeo.com/160824886
[auth-pattern]: https://vimeo.com/160826910

[99-cats-part-ii]: projects/ninety_nine_cats_ii

[rails-auth-homework]: homeworks/questions/rails_auth.md

## w4d4

### Study Hall 9 - 10am

### Video Lectures (39 min)
:closed_lock_with_key: `go_video_go`
* [:movie_camera:  (cc) 14-radio-and-textarea][14-radio-and-textarea] (16 min)
* [:movie_camera:  (cc) 15-helpers][15-helpers] (13 min)
* [:movie_camera: layouts][layout-video] (10 min)

### Readings (60 min)
* [ActionMailer][action-mailer] (20 min)
* [View helpers][view-helpers] (15 min)
* [View layouts][view-layouts] (10 min)
* [View partials][view-partials] (15 min)

### Homeworks (30 min)
* [Helpers, Layouts, and Partials][helpers-and-layouts-hw] (30 min)

### Additional Resources
* [:movie_camera: Action Mailer Demo][action-mailer-video] (11 min)

### Projects
* **Solo**: [Music App][music-app-project]

[action-mailer]: readings/mailing-1.md
[view-helpers]: readings/helpers.md
[view-layouts]: readings/layouts.md
[view-partials]: readings/partials.md
[helpers-and-layouts-hw]: homeworks/questions/helpers-layouts-mailer.md
[14-radio-and-textarea]: http://vimeo.com/groups/appacademy/videos/100729825
[15-helpers]: http://vimeo.com/groups/appacademy/videos/100780885
[layout-video]: https://vimeo.com/168822741
[action-mailer-video]: https://vimeo.com/168810895

[music-app-project]: projects/music_app

## w4d5

### Study Hall 9 - 10am

### Assessment04 Practice
+ [Practice][assessment-prep-4]

### Video Lectures (54 min)
:closed_lock_with_key: `go_video_go`
* [:movie_camera:  (cc) 16-tag-ids-setter][16-tag-ids-setter] (22 min)
* [:movie_camera:  (cc) 17-checkboxes-1][17-checkboxes-1] (12 min)
* [:movie_camera:  (cc) 18-checkboxes-2][18-checkboxes-2] (11 min)
* [:movie_camera:  (cc) 19-checkboxes-3][19-checkboxes-3] (6 min)
* [:movie_camera:  (cc) 20-query-string][20-query-string] (3 min)

### Readings (20 min)
* [Polymorphic Associations][polym-assoc-blurb] (10 min)
  * **Just section 2.9**
* [Concerns][concerns-reading] (10 min)

### Homeworks (30 min)
* [Polymorphism and Concerns][polymorphism-and-concerns-hw] (30 min)

### Additional Resources
* **Bonus Topic:** [Decorators][decorators]
* [Checkboxes and Id Setters Reference][checkboxes-id-setters]

### Projects
* [RedditClone][reddit-clone]

[assessment-prep-4]: https://github.com/appacademy/assessment-prep#assessment-4
[polym-assoc-blurb]: http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[concerns-reading]: readings/concerns.md
[16-tag-ids-setter]: http://vimeo.com/groups/appacademy/videos/100780886
[17-checkboxes-1]: http://vimeo.com/groups/appacademy/videos/100780887
[18-checkboxes-2]: http://vimeo.com/groups/appacademy/videos/100846847
[19-checkboxes-3]: http://vimeo.com/groups/appacademy/videos/100846848
[20-query-string]: http://vimeo.com/groups/appacademy/videos/100849678
[decorators]: readings/decorators.md
[checkboxes-id-setters]: readings/checkboxes.md
[polymorphism-and-concerns-hw]: homeworks/questions/polymorphism-concerns/polymorphism-concerns.md

[reddit-clone]: projects/reddit_on_rails

## w5d1

### Readings (72 min)
* [Integration Testing][integration-testing] (7 min)
* [RSpec and Rails Setup][rspec-setup] (15 min)
* [Testing Models][rspec-models] (15 min)
* [FactoryGirl and Faker Gems][fac-grl-faker] (20 min)
* [Testing Controllers][rspec-controllers] (5 min)
* [Testing with Capybara][capybara] (15 min)

### Homeworks (60 min)
* [Capybara][capybara-hw] (45 min)
* [Implicit Bias Test][bias-quiz] (15 min)
  * Please take the Gender-Career Quiz to help you prepare for our diversity and inclusion event tomorrow

### Additional Resources
* [Spring and Guard Setup][spring-guard]

### Projects
* [Goal App][goaling-app]
* **Bonus**: [Appacademy.io Tests][appacademyio-tests]

[integration-testing]: readings/integration-testing.md
[rspec-setup]: readings/rspec-and-rails-setup.md
[rspec-models]: readings/rspec-models.md
[rspec-controllers]: readings/rspec-controllers.md
[fac-grl-faker]: readings/factorygirl-and-faker.md
[capybara]: readings/capybara.md
[spring-guard]: readings/guard-spring-setup.md

[capybara-hw]: homeworks/questions/capybara.md
[bias-quiz]: https://implicit.harvard.edu/implicit/takeatest.html

[goaling-app]: projects/goal_app
[appacademyio-tests]: projects/appacademy.io_tests

## w5d2

### Assessment04
* [Practice][assessment-prep-4]

### Video Lectures (60 min)
:closed_lock_with_key: `go_video_go`
* [:movie_camera: Rails Lite Intro](https://vimeo.com/161381457) (4 min)
* [:movie_camera: HTTP](https://vimeo.com/161381484) (12 min)
* [:movie_camera: HTTP Demo](https://vimeo.com/161381489) (4 min)
* [:movie_camera: Rails from the Inside Out](https://vimeo.com/161381601) (13 min)
* [:movie_camera: Rack Middleware](https://vimeo.com/161382367) (4 min)
* [:movie_camera: Rack Middleware Demo](https://vimeo.com/161386029)  
	* [:computer: demo code][middleware-demo] (22 min)

### Homeworks (45 min)
* Complete [RegexOne][regex-link] (45 min)

### Additional Resources
* [:movie_camera: Rack](https://vimeo.com/161384649) (9 min)
* [:movie_camera: TCP](https://vimeo.com/161382361) (15 min)
* [:movie_camera: DNS](https://vimeo.com/161381921) (12 min)
* [:movie_camera: Rack Demo](https://vimeo.com/161381828) (25 min)
* [:movie_camera: (cc) 00-webserver][00-webserver] (16 min)
* [:movie_camera: (cc) 01-protocols][01-protocols] (14 min)
  * old news at this point; recommended speed >= 2x
* [:movie_camera: (cc) 02-http][02-http] (43 min)
* [Middleware][middleware]
* [HTTP][http]
* [Rack][rack]

### Solo Project
* [Rails Lite][rails-lite]

[middleware-demo]: https://github.com/appacademy/lecture-notes/blob/master/rails/w5d2/video/demos/rack_middleware/middleware.rb
[http]: readings/http.md
[rack]: readings/rack.md
[regex-link]: http://regexone.com/
[00-webserver]: http://vimeo.com/groups/appacademy/videos/100169899
[01-protocols]: http://vimeo.com/groups/appacademy/videos/100169898
[02-http]: http://vimeo.com/groups/appacademy/videos/100267302
[middleware]: readings/middleware.md
[rails-lite]: projects/rails_lite

<!-- HTML Curriculum Links -->
[html-1]: ../html-css/README.md#lesson-1-introduction
[html-2]: ../html-css/README.md#lesson-2-containers
[html-3]: ../html-css/README.md#lesson-3-forms
[html-4]: ../html-css/README.md#lesson-4-head-section
