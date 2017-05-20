# Documentation and Developer Guide For Blueprint's Lava Mae app!
## Setup
* [Web app Setup](/docs/setup.md)

## Style Guide
Our Rails style guide can be found [here](https://github.com/calblueprint/style-guides/tree/master/rails).

## Commit Process
IMPORTANT: Make sure to set your git information. Instructions can be found [here](https://help.github.com/articles/setting-your-username-in-git/).

Developer workflow is as follows:
1. Make sure your master branch is up-to-date:
```
git checkout master
git pull
```
2. Checkout a new branch off of master. Name the branch in the following manner:
```
git checkout -b <your_name>/<your_feature>
```
3. Create a GitHub issue for your feature in the Lava Mae repository so that other
engineers know what you are working on.
4. Implement your new feature.
5. Create a pull request. Make sure to edit the pull request title to align with
your feature. In the description, you should generally write a small 1-2 line description
of what you completed. Then, on separate new lines, indicate which issues you closed with
this pull request with the following syntax:
```
Fix #104
Fix #105
```
6. Push your code: `git push origin <your_branch_name>`. Submit your pull request and
another engineer will review your code and discuss with you the changes you made if necessary.
7. Before merging your branch, make sure that your branch is up-to-date with head. You can do
this by choosing option `rebase and merge` when merging pull request on GitHub. When merging
in a pull request, the issues indicated in the description are automatically closed. If you are
the one merging in the pull request, make sure to delete the branch! (you can do this on the pull
request itself).
8. Rinse and repeat! Thank you for contributing to Lava Mae!


# Lava Mae Reach Documentation

## Overview
Over hundreds of inquiries have been made worldwide to start a Lava Mae branch, so Lava Mae came to Blueprint for a way to get information out to users who are interested.


### Purpose
This project was created to allow Lava Mae to efficiently share toolkits and to create a network connecting mobile shower nonprofits around the world.


### Blueprint Contact Information
**Lava Mae Project Leaders**:
Casey Takahashi (caseytaka@gmail.com)
Jonathan Chu (jonxchu@gmail.com)

To contact current Blueprint leadership, email team@calblueprint.org

### Action Items/Next Steps
- Implement edit functionality for admins on static page content (Landing Page & About Page)
- Move more of the views to React Components (i.e. User Dashboard)
- User Dashboard
    - Allow users to search through other users
    - Build out a more interactive stories component
    - Order photos in gallery
- Discussion:
    - Replying to responses
    - Order tags
    - More elastic search

## User Flow

### User
- Click "Sign Up" and create an account
- Check email and click on link to confirm the account
- Sign in
- Explore the website
    - Start Your Service
        - Download Toolkits
    - Discussions
        - Search through discussions
        - Respond to discussions
        - Create discussions
        - Favorite discussions
        - Upvote discussions/responses
    - Our Network
        - Explore the map by scrolling or searching by location
        - Click on pins to view users in different areas
    - About Lava Mae
        - Page explaining Lava Mae's region
        - Click "Learn More About Lava Mae" to go to Lava Mae's original website
    - User Dashboard
        - Add user bio/story and photos to photo gallery
        - Edit user information or change password
        - View favorited discussions
        - If have marked that the user is lookking for volunteers or wants to volunteer, will see section showing other volunteers/people looking for volunteers in the same city

### Admin
- Click "Sign Up" and create an account
- Check email and click on link to confirm the account
- Need a current admin to approve user as an admin
- Sign in
- Explore the website
    - Start Your Service
        - Upload, edit, delete, or download toolkits
    - Discussions
        - Has all functionality of general users
        - Ability to delete any discussion or response
    - Our Network
        - Has all functionality of general users
        - Ability to delete users from map
    - About Lava Mae
        - Same flow as general users
    - User Dashboard
        - Same flow as general users
    - Admin Dashboard
        - Can grant or revoke admin privaledges for any user
        - Can delete user accounts


# General Project Information

## Project Setup
Clone repo from GitHub
Run `brew install graphicsmagick`
Run `bundle install`
Startup a postgresql server
Run `rake db:reset`
Start the rails console

## General Clarifications & Notes
1. ResourceTopic is another name for Resources or the "Start Your Service" Page

## Schema
### Admin Tags
- `name` - name of discussion tag

### Discussions
- `score` - number of upvotes
- `content` - body of text
- `tag` - N/A (tags accessed through discussion.tag_list)
- `is_resolved` - N/A
- `title` - discussion title
- `is_admin` - N/A
- `user_id` - id of user who created the discussion

### Discussions Users
For favoriting discussions
- `discussion_id` - id of favorited discussion
- `user_id` - user who favorited the discussion

### Discussions Users Upvote
- `upvote_discussion`
- `upvote_user`

### Images
- `photo` - photo attachment
- `user_id` - id of user who uploaded the image
- `title` - title of photo
- `description` - caption for photo

### Locations
- `place` - location city, state, country string
- `lat` - latitude
- `lng` - longitude

### Resource Topics
Toolkits/Resources on Start Your Service
- `name` - title of resource
- `description` - description of resource
- `attachment` - toolkit attachment

### Resources
N/A

### Responses
- `content` - response body text
- `score` - number of upvotes for response
- `discussion_id` - id of discussion response is tied to
- `is_admin` - N/A
- `user_id` - id of user who created the response
- `user_name` - full name of user who created the response
- `user_image` - profile picture of user who created the response

### Responses Users Upvote
- `upvote_response`
- `upvote_user`

### Taggings
- `tag_id`
- `taggable_id`
- `taggable_type`
- `tagger_id`
- `tagger_type`
- `context`

### Tags
- `name`
- `taggings_count`

### Upvotes
- `upvotable_id`
- `upvotable_type`
- `user_id`

### Users
- `first_name` - first name of user
- `last_name` - last name of user
- `organization` - user's organization
- `num_actions` - N/A
- `is_admin` - true if user is an admin
- `encrypted_password` - encrypted password
- `reset_password_token` - token to reset password if user has forgotten their password
- `email` - user's email
- `profile_pic` - user's profile picture
- `location_id` - id of location object for user's location
- `website` - user's website
- `bio` - text for user's bio/story on the dashboard
- `secondary_name` - name of secondary point of contact for account
- `secondary_email` - email for secondary point of contact for account
- `tertiary_name` - name of tertiary point of contact for account
- `tertiary_email` - email for tertiary point of contact for account
- `volunteer` - true if user wants to volunteer
- `seeking_volunteer` - true if user is looking for volunteers
- `admin_approval_state` - 0 = pending admin approval (no action taken yet; default not an admin), 1 = approved to be admin, 2 = remove admin privileges
- `confirmation_token` - token for user to confirm their account after signing up
- `on_map` - true if user selects that they want to appear on the map
- `admin_map_approval` - by default true; false if admin deletes a user from the map

## 3rd Party Code
MapBox API
Google Maps Geocoder API
LightGallery

## Email Workflow
We added SendGrid, an Add-On for Heroku, to the application as our email service.
SendGrid configuration settings in `environment/development.rb` and `environment/production.rb`.
We set some Devise flags in the User model for `user.rb` that sends out emails through the service specified (in our case, SendGrid).
```
devise :database_authenticatable, :registerable, :confirmable, :recoverable, :rememberable, :trackable, :validatable
```
For email, the ones we care about are:
- `:confirmable` sends out an email from the Registrations Controller when `create` is called.
- `:recoverable` sends out an email from the Passwords Controller when `request_reset` is called. Because we overwrote Devise's default Passwords controller, we have to manually call `user.send_reset_password_instructions` which causes an email to be sent out with a link that contains a token so a user can reset their password without knowing their old password.
- `:reconfirmable` was also manually added in a migration as a column to the Users table. When a user changes their email, they will have to re-confirm their account with their new email.

# Project Codebase
## Helpers
#### **`requester.es6.jsx`**
`initialize(type, route, content='application/json')`
Initializes the request and sets the header.

`_postErrorHandler(xhr, status, error)`
Shows a toastr for each error generated by the failed request.

`_getErrorHandler(xhr, status, error)`
Prints error to console.

`_attemptAjax(endpoint, type, data, extraFields, onSuccess, onError)`
Makes an ajax request of type `type` (PUT, POST, DELETE, GET) to the given endpoint, and passes the `data` along. Calls `onSuccess` if the request was successful, otherwise calls `onError`.

`post(endpoint, data, success, extraFields = {})`
Calls `_attemptAjax` specifying a `POST` request.

`get(route, resolve, reject, extraParams = false, params = {})`
Method to get records as a JSON. Method called for routes to API controllers that just fetch data (don't render a view)

`put(endpoint, data, success, extraFields = {})`
Calls `_attemptAjax` specifying a `PUT` request.

`delete(endpoint, data = {}, success, extraFields = {})`
Calls `_attemptAjax` specifying a `DELETE` request.

## Controllers
#### `admin_tags_controller.rb`
Controller for admins to manage discussion tags.

#### Methods
`def save`: Deletes the current existing set of discussion tags and reconstructs a new set from what was specified in the "Manage Tags" modal.

#### Parameter Validation
`def tag_params`: Allows a list of tag names (strings) to be passed in as the set of new discussion tags.

#### `confirmations_controller.rb`
Controller for email validation following user sign-up.

#### Methods
`def after_confirmation_path_for`: Routes sign-up button to the home page and pops open the login modal by passing in the parameter modal as true.

#### `discussions_controller.rb`
Controller for "Discussions" page.
Handles basic CRUD and renders views for "Discussions"
#### Methods
`def index`: Renders the "Discussions" page view. Handles query parameters such as favorites, tag filters, and search keywords. Additionally, passes down information pertaining to the selected discussion to display. By default, the selected discussion if not specified is the most recently created discussion.

`def create`: Creates a new discussion with the `discussion_params`. The discussion is initialized to have 0 upvotes and tagged with tags the user specified upon creation. Lastly, the post is set as belonging to the current logged-in user.

`def update`: Updates an existing discussion with `discussion_params` and the new set of tags specified by the user.

`def destroy`: Deletes the specified discussion and redirects to the main "Discussions" page.

`def favorite`: Adds the starred discussion to the current user's list of favorited discussions.

`def unfavorite`: Removes starred discussion from the current user's list of favorited discussions.

`def upvote`: Adds an upvote to the specified discussion tied to the current user.

`def get_discussion`: Method to prefetch the selected discussion before `edit, update, destroy, favorite, unfavorite` controller methods.
#### Parameter Validation
`def discussion_params`: Allows a title, content, score, upvotes, and tag list to be passed in as part of a discussion.

#### `images_controller.rb`
Controller for the images rendered under the user photo gallery on the user dashboard. Handles basic CRUD and image conversion.

#### Methods
`def create`: Creates a new Image with the `image_params`. Provides flash messages upon success or error.
`def update`: Finds the Image by `id` and updates the record to reflect the new `image_params`. Provides flash messages upon success or error.
`def convert_photo`: Converts the uploaded File Reader photo strings into strings that can be processed/shown as images.
`def destroy`: Finds the Images by `id` and deletes the record for all the image ids that were passed into `delete_params`. Provides flash messages upon success or error.


#### Parameter Validation
`def image_params`: Allows a photo string , unique photo id, user/user_id, title, and description to be passed in as part of an image.
`def delete_params`:Allows user and array of image ids to be passed in so that we can batch delete all the images in our destroy method.

#### `locations_controller.rb`
`def create`
If the location with the given 'place' string doesn't exist, create a new location. Returns the location object as a json.

#### `maps_controller.rb`
`def map`
Filters through all users and passes the users who have the attributes `admin_map_approval` true and `on_map` true to the `map.html.erb` view.

#### `pages_controller.rb`
`def home`
Filter through and search for users with attribute `on_map` true and pass to the `home.html.erb` view.

`def about`
Renders the static `about.html.erb` page view.

`def admin_dashboard`
Renders the `admin_dashboard.html.erb` view and, if the current user is an admin, passes all the user records and the user default profile picture to the view.


#### `passwords_controller.rb`
`def update`
This method updates a user's password. Find user by `id` and validates that the `old_password` they entered is valid. Then, validate the user's password by calling the private custom `accumulate_password_errors` method. If there are no errors, update the password with the new `password` and `password_confirmation`, otherwise raise an error.

`def request_reset`
This method is when a user requests to reset their password by clicking the “Forgot Password” button on the Login Modal. It finds a user by their email, and sends reset password instructions to their email.

`def reset`
The `reset` method allows a user to reset their password using a token through a link sent to their email if they have forgotten their password. It validates their new password, making sure it meets all the length and character requirements with `accumulate_password_errors` and then resets the password using the `reset_password_token`.


#### `registrations_controller.rb`
`def new`
Renders the `new.html.erb` view.

`def create`
Creates a new user record using the `sign_up_params`. `User.find_by_email` sends an account confirmation email to their account and finds the user by their email.

`def password_reset`
Passes the `reset_password_token` parameter to the `password_reset` view (which won’t require that the user enters their own password if a token is present).


#### `responses_controller.rb`
Controller for discussion responses.
Handles response creation, deletion, updates, and upvoting.

#### Methods
`def create`: Creates a new Response with `response_params` under the current selected discussion. Initializes the response with 0 upvotes and creates an associated between the response poster and the response object.

`def update`: Updates the response attributes with `response_params`

`def destroy`: Deletes the response and redirects to a view of discussions page with the same discussion the response belonged to displayed.

`def upvote`: Adds an upvote from the current user to the response if the user has not previously upvoted the response. If the response was previously upvoted, this method removes the upvote.

`def get_response`: Method to prefetch the selected response before `edit, update, destroy` controller methods.

`def get_discussion`: Method to prefetch the selected discussion before `edit, update, create, destroy` controller methods.

#### Parameter Validation
`def response_params`: Allows content, score and upvotes to be passed in as part of a response.

#### `users_controller.rb`
`def show`
Finds `@user` by id. Passes the show view the user object, the path to some static images, the user's `@favorite_discussions`. If a user has a location associated with the record, the controller passes the view the location record. Filters through all users and passes the records to the view if the user has the attribute `volunteer` or `seeking_volunteer`.

`def destroy`
Only allows user to delete a user record if `current_user` is an admin. Finds the user by `id` and destroys the record.

`def admin_approval_update`
Finds the acting admin user by `admin_id` to ensure only admins can make approvals. Finds the user being promoted/demoted to/from an admin by `user_id`, and changes their `admin_approval_state` attribute.

`def update`
Updates a user record based on the `update_params` when a user edits their profile information.

`def edit_user_password_url`
Returns a string with the URL for when a user edits their password.


#### `application_controller.rb`
`def render_json_message`: This method is used in the controllers to package data, messages, path redirects, and errors into a json that the Requester can handle.
`def toast`: Displays success and error messages.


#### `resource_topics_controller.rb`
Controller for "Start Your Service" page.
Handles basic CRUD and renders views for "Start Your Service".

#### Methods
`def index`
Render the ResourceTopics `index` view and pass in `@loading_bus` as a parameter (this will be used as the loading gif).

`def create`
Creates a new ResourceTopic with the `resource_topic_params`. Redirects to ResourceTopics `index` view. Provides flash messages upon success or error.

`def update`
Finds the ResourceTopic by `id` and updates the record to reflect the new resource_topic_params. Redirects to ResourceTopics `index` view.

`def destroy`
Finds the ResourceTopic by `id` and deletes the record. Redirects to ResourceTopics `index` view.

#### Parameter Validation
`def resource_topic_params`: Allows a name, description, and attachment to be passed in as part of a resource.

### API Controllers
#### `api/resource_topics_controller.rb`
`def index`
Returns all `ResourceTopic` (resources on Start Your Service page) records as a json, ordered by their time of creation.

#### `api/responses_controller.rb`
Used to 'get' the responses from the database.

`def get_upvotes`: Get the upvotes corresponding to a specific responses and render as a json for the response form in discussions.

#### `api/users_controller.rb`
Controller to allow React components to make `get` requests to fetch user attributes.

`def get_profile_pic`: Fetches the json representation of the specified user's profile picture.


## Views

### Discussions
#### **`index.html.erb`**
Renders the `DiscussionPage` React component which handles and renders the list of all discussions, the selected discussion and its responses, and all elements regarding discussion filter such as tags, favoriting, and the search bar. Additionally, if there is a logged in user, the user's favorited discussions are passed down to the component to render.

### Layouts
#### **`application.html.erb`**
`script` tags for 3rd Party APIs used in the project: MapBox, GoogleMaps Geocoder, LightGallery.

### Maps
#### **`map.html.erb`**
Displays a map of public users with a location. Uses MapBox API to display the clickable points on the map using their `Marker` and `Popup` classes. Admins can delete pins on the map.

### Pages
#### **`about.html.erb`**
Renders the static "About Lava Mae" page. Displays a blurb about what Lava Mae does, lists the 3 core beliefs of Lava Mae, and links to the main website (www.lavamae.org) for more information.

#### **`admin_dashboard.html.erb`**
Renders the `AdminUserControls` React component. Displays a list of all users along with their name and associated email. This page allows admins to grant or revoke admin status to a user account, as well as delete a user account.

#### **`home.html.erb`**
Renders the static landing/home page. The first section displays a short blurb about the purpose of the app, with the background as the map of users that renders real-time (same as map on **`map.html.erb`**). However, this map is not interactive.

Note: To push the content below the first section down, a `<div class="filler"></div>` was needed. This class has the same height as the map (90vh).

The call-to-action button in the first section ("Explore") scrolls the page down to the next section, which describes the different parts of the app. The scrolling action is a JavaScript click function with a `scrollTop` animation.

### Partials
#### **`_nav.html.erb`**
Renders the global navigation menu on every page. Global parts of the website like "Start Your Service" and "Discussions" are placed on the left side, while user-related parts like "Profile", "Login" and "Sign Up" are on the right.

The mobile version condenses all menu items into a hamburger menu on the right. An `onClick` function called `mobileMenu` is used on this hamburger menu to toggle on a CSS class that animates the menu items into view from the right side.


### Registrations
#### **`new.html.erb`**
Renders the RegistrationModal React component and initializes Geocoding for the map.

#### **`password_reset.html.erb`**
Renders the `ChangePasswordForm` React Component. This view is rendered when the user has gone through the 'Forgot Password' flow and they have clicked the link emailed to them. The view passes the `reset_token` into the react component, so that the form won't require the user to enter their old password to reset their password.


### ResourceTopics
#### **`index.html.erb`**
Renders the `ResourcePage` React component. If there is a user signed in (`current_user` exists), pass in `signed_in: true` to the component, and `false` otherwise.

### Users
#### **`show.html.erb`**
Displays the user profile. Renders the `EditProfileModal`, `ChangePasswordModal`, `UserBio`, `UserPhotoGallery`, `UserPhotoDelete`, `UserPhotoEdit`, `UserPhotoUpload`, and `VolunteerMatching` React components. If there is a user signed in (`current_user` exists), pass in `current_user` prop into `UserBio` so they can edit their bio. If the user has a location (`location` exists), pass in `location` prop to `EditProfileModal`.


## Javascripts
#### **`discussion_create_modal.es6.jsx`**
#### Props
`@prop all_tags` - list of all tags
`@props loading_bus` - loading lavamae bus url

#### Methods
`_handleSelectTag(e)`
Ensures that when the user clicks on a tag, there is a visual validation through the darkening/lightening of the tag color.

`_renderTags()`
Displays all the tags and allows them to be clickable. Clicking on them triggers `_handleSelectTag(e)` to select/deselect the tag from the discussion.

`_saveForm()`
Sends all the necessary discussion information to the `Discussions` controller and updates the Discussions page with the new Discussion.

#### **`discussion_page.es6.jsx`**
#### Props
`@prop discussions` - discussion index
`@prop unfiltered_discussions` - all discussions with tags and favorites applied, but no search
`@prop discussion` - discussion
`@prop current_user` - current user
`@prop favorite_discussions` - favorite user discussions
`@prop tags` - tag list
`@prop show_favorites` - display favorites flag
`@prop discussion_username` - full name of discussion creator
`@prop discussion_userimage` - discussion user profile image
`@prop responses` - discussion responses
`@prop upvotes` - discussion upvotes
`@prop tag_filter` - tag filter param
`@prop search_param` - search param
`@prop all_tags` - all tags
`@props loading_bus` - loading lavamae bus url
`@prop default_image` - default profile image url
`@prop  all_responses` - all responses

#### Methods
`_generateTimeStamp(obj)`
Handler method for converting and formatting discussion time stamps.

`renderDiscussion()`
Displays the selected discussion and its responses by rendering the `DiscussionForm` and `DiscussionResponses` React components.

#### **`discussion_form.es6.jsx`**
#### Props
`@prop discussion` - discussion
`@prop tags` - tag list
`@prop current_user` - current user
`@prop discussion_username` - full name of discussion creator
`@prop discussion_userimage` - discussion user profile image
`@prop upvotes` - discussion upvotes
`@prop date_handler` - handler to render timestamp
`@prop all_tags` - all tags
#### Methods
`_openModal()`
Handler method to display a modal for deleting a discussion when the delete button is clicked.

`_closeModal()`
Handler method to close the discussion deletion modal if the cancel button is clicked.

`_success(msg)`
Uses the API Requester to delete the discussion from the database and displays a user message if the discussion was successfully deleted.

`_cancelEdit(e)`
Handler method to cancel the inline edit module. If cancelled, no temporary edits are saved.

`_enableForm()`
Handler method to enable the inline edit module for the discussion.

`_successfulSave()`
Closes the inline edit module if the user edits were successfully saved.

`_saveForm(e)`
Uses the API Requester to save the inline edits for the discussion.

`_selectTag(e)`
Used to toggle the `checked` css class for discussion tags.

`_renderTags()`
Renders the associated tags for the selected discussion.

`_renderFormTags()`
Renders discussion tags for the inline edit module.

`renderForm()`
Renders the inline edit module.

`renderGuestContent()`
Renders the selected discussion without edit and delete options for users who do not own the discussion post.

`renderContent()`
Renders the selected discussion with edit and delete options for the discussion post owner.

#### **`discussion_index.es6.jsx`** (Nhi/Lois)
#### Props
`@prop discussions` - discussion index
`@prop unfiltered_discussions` - all discussions w/ tags and favorites applied, but no search
`@prop discussion` - discussion
`@prop current_user` - current user
`@prop favorite_discussions` - favorite user discussions
`@prop show_favorites` - display favorites flag
`@prop date_handler` - handler to render timestamp
`@prop tag_filter` - tag filter param
`@prop search_param` - search param
`@prop all_tags` - all tags
`@props loading_bus` - loading lavamae bus url
`@prop all_responses` - all responses

#### Methods
`_openModal()`
Handler method to display a modal to manage tags if an admin clicks on the "Manage Tags" button.

`_closeModal()`
Handler method to close the tag manager modal.

`_componentDidMount()`
Calls `this._copyToFiltered(discussions)` before calling other methods when this React component is rendered.

`_copyToFiltered(discussions)`
`_onSearchChange(e)`
`_loadDiscussions()`
`_generateLink(disc, fav, filter)`
`renderFilters()`
`renderFavoriteBtn()`
`renderCreateBtn()`
`renderShortened(disc, key)`
`renderIndex()`

#### **`discussion_responses.es6.jsx`**
#### Props
`@prop discussion` - discussion
`@prop current_user` - current user
`@prop responses` - discussion responses
`@prop date_handler` - handler to render timestamp
`@prop default_image` - default profile image url

#### Methods
`_setProfilePic(data, id)`
Sets the profile picture associated with each response if one was successfully fetched via the API Requester. Otherwise, the default profile picture is displayed for this user.

`_fetchProfilePic(id)`
Uses the API Requester to grab the user account's profile picture from the database in order to render it on the page.

`_saveResponse(e)`
Uses the API Requester to save the inline edits of the response.

`renderResponses()`
Renders all responses of the associated discussion.

`renderResponseForm()`
If a user is logged in, displays the page component for users to post responses.

#### **`discussion_favorite.es6.jsx`** (Nhi)
#### Props
`@prop discussion` - discussion
`@prop favorite_discussions` - favorite user discussions

#### Methods
`_successfulFavorite()`

`_successfulUnfavorite()`

`_starDiscussion(e)`

`renderStarred(disc)`


#### **`edit_profile_modal.es6.jsx`**
#### Props
`@props user_id` - user's id
`@props first_name` - user's current first name
`@props last_name` - user's current last name
`@props email` - user's current email
`@props secondary_name` - secondary contact's first and last name
`@props secondary_email` - secondary contact's email
`@props tertiary_name` - tertiary contact's first and last name
`@props tertiary_email` - tertiary contact's email
`@props organization` - user's current orgnization
`@props location` - location city, state, country string
`@props website` - user's website
`@props on_map` - true if user appears on map
`@props profile_pic` - path of user's profile picture
`@props volunteer` - true if user wants to be a volunteer
`@props seeking_volunteer` - true if user is seeking volunteers
`@props admin_map_approval` - true if user is allowed to be on map

#### Methods
`_handleMapCheckboxChange(e)`
Flips the value of the `map_checked` state to reflect the status of the checkbox

`_handleVolunteerCheckboxChange(e)`
Flips the value of the `volunteer` state to reflect the status of the checkbox

`_handleSeekingVolunteerCheckboxChange(e)`
Flips the value of the `seeking_volunteer` state to reflect the status of the checkbox

`_getLongitudeAndLatitudeAndSignUp(loc)`
Uses Google Maps API to assign a `location_id` to users based on the location they provide

`_startSignUpProcess(e)`
Handles incorrect input information before calling `_attemptSave()`

`_attemptSave(response = null)`
Saves all the updated information

`componentDidUpdate()`
Autocomplete user’s location input using Google Maps API

`_handleFileChange(e)`
Changes image preview if profile picture is changed and saves the new file as the profile picture

#### **`login_modal.es6.jsx`**
#### Props
`@props style`- button style for Login Button
`@prop from_module` - true if login modal is being rendered from a someone not signed in trying to download from the 'Start Your Service' Page
`@prop from_map` - true if Login Modal is being rendered from map
`@prop from_discussion` - true if Login Modal is being rendered from someone not signed in trying to create a discussion

#### Methods
`_showForgotPasswordModal()`
Sets `this.state.forgotPasswordMode` to true - this triggers the ForgotPasswordModal to pop up.

`_attemptPasswordReset(e)`
Makes a post request to `/passwords/request_reset`, sending the user's email to the controller. This triggers an email to be sent to the user with a link they can use to reset their password. Upon success, `_successResetEmail` is called.

`_successResetEmail(msg)`
Displays a success toastr message that the reset password email has been sent and closes both the Login and ForgotPassword modals.

`_successLogin(msg)`
Closes the Login Modal, and refreshes the current page so that the user is now logged in.

`_handleLogin(e)`
Makes a post request to `/users/sign_in`, passing in `email` and `password` for the current user. Upon success, calls `_successLogin`.

`_handleSignUp(e)`
Redirects the user to `/sign_up` that displays the "Create Account" page in the case that they want to sign up.

`_renderLoginModal()`
Button display when modal is closed: When the user isn't signed in, depending on what page the user is on, changes the text on the Login Modal button that triggers the modal to show up. If a user is on "Start Your Service", clicking Download opens the Login Modal. If the user is on the "Our Network" page, clicking "Join the Movement" opens the Login Modal. If the user is on the "Discussions" page, clicking "Create Discussion" will prompt the user to sign in by opening the Login Modal.
Modal is open: modal html to input email and password.

`_renderForgotPasswordModal()`
Modal body for ForgotPasswordModal - prompts user to enter their email so they receive a reset password email.

#### **`module_delete_modal.es6.jsx`**
#### Props
`@props resource_topic`- passed down module record

#### Methods
`_handleDelete(msg)`
Handles module delete by admin. Provides flash messages upon success or error.

#### **`module_edit_modal.es6.jsx`**
#### Props
`@props resource_topic`- passed down module record

#### Methods
`_handleUpdate(e)`
Sends the newly updated file, title, and description information to the `Resource Topic` controller. Redirects to updated Resource Page.

`_handleFileChange(e)`
Handles the selection of pdf files and converts them into a string that we can pass to the controller and store in the database.

`_onClick(e)`
Used to open the currently attached file for the module that we are editing.

#### **`module_upload_modal.es6.jsx`**
#### Props
`@props loading_bus` - loading lavamae bus url

#### Methods
`_handleUpload(e)`
Sends the file, title, and description information for a new module to the `Resource Topic` controller. Redirects to updated `Resource Page`.

`_handleFileChange(e)`
Reference `_handleFileChange(e)` in `module_edit_upload.es6.jsx`.

#### **`admin_user_controls.es6.jsx`**
Renders the admin dashboard page which displays a list of users from which admins can grant or revoke admin status of other users or delete user accounts.

#### Props
`@prop users` - list of all users
`@prop user_id` - user id for the current logged in user
`@prop default_image` - default profile image url
#### Methods
`_renderUsers()`
Per user in `this.props.users`, renders a `UserControl` React component which displays a row containing the user's name, email, and buttons to grant or revoke admin status and to delete the user account.

`componentDidMount()`
Calls `this._fetchProfilePic()` before calling other methods when this React component is rendered.

`_fetchProfilePic()`
Uses the API Requester to grab the user account's profile picture from the database in order to render it on the page.

`_setProfilePic(data)`
Sets the profile picture associated with each `UserControl` React component if one was successfully fetched via the API Requester. Otherwise, the default profile picture is displayed for this user.

`_handleApprove()`
Uses the API Requestor to grant the indicated user admin status for Lava Mae Reach. This will only succeed if the id of the grantor is associated with an admin account.

`_handleReject()`
Uses the API Requestor to revoke the indicated user's admin status for Lava Mae Reach.

`_handleDelete()`
Uses the API Requestor to delete the indicated user's account from Lava Mae Reach. This will additionally delete any associated discussions, responses, and other data attached to the account.

`_successDelete(msg)`
Displays the success message if `_handleDelete()` succeeded.

`_successApproval(msg)`
Displays the success message if `_handleApprove()` succeeded.

`_successReject(msg)`
Displays the success message if `_handleReject()` succeeded.

#### **`registration_modal.es6.jsx`**
#### Methods
`_toLogin()`
Routes to the landing page and opens the Login Modal.

`_attemptRegistration(response=null)`
If there's a response passed into the method (new Location object), grabs the location id and sets it as the `locId`. Passes in all fields from the registration inputs as data to the post request to `/sign_up`.

`_renderInput(name, label, type, placeholder, required=false)`
Returns a `div` element for a customized input field.

`_getLongitudeAndLatitudeAndSignUp(loc)`
Uses Google Maps API to assign a `location_id` to users based on the location they provide

`_startSignUpProcess(e)`
Handles incorrect input information before calling `_attemptSave()`

`_handleFileChange(e)`
Changes image preview if profile picture is changed and saves the new file as the profile picture


#### **`resource_page.es6.jsx`**
Renders the resource page and all the modules in it.
#### Props
`@prop signed_in` - true if there a user signed in
`@prop is_admin` - true if current user is an admin
`@props loading_bus` - loading lavamae bus url

#### Methods
`componentDidMount()`
Calls `this._fetchModules()` before calling other methods when this react component is rendered.

`_renderModule(resource_topic)`
Calls `ResourceModule` to render each individual `resource_topic` that is being passed in.

`_fetchModules()`
Uses the API Requester to grab the modules from the database in order to render them on the page.

`_renderModules()`
Maps each module to the `_renderModule(resource_topic)` method in order to render the modules nicely.

`_renderStyledModules()`
Renders the loading bus gif if the modules aren't yet loaded yet, or the modules if they are loaded.

`_renderModuleUploadModal()`
Links to `module_upload_modal.es6.jsx` for uploading modules.


#### **`response_form.es6.jsx`** (Nhi)

#### **`tag_manager.es6.jsx`**
#### Props
`@prop tags` - list of current discussion tags
`@prop close_modal_handler` - function handler to close tag manager modal

#### **`upvote.es6.jsx`**
#### Props
`@prop discussion` - discussion
`@prop response` - response
`@prop user` - current user
`@prop upvotes` - total upvotes

#### Methods
`componentWillReceiveProps(nextProps)`
Called before all other methods each time this component is called. Ensures that the upvotes for the responses are retrieved and the most updated version every time the page is rendered.

`_handleUpvote()`
Each user can upvote each discussion and response once. If the user has already upvoted the discussion/response at hand, then it will result in a downvote. Users can only take away their upvote, so the discussion/response scores will only ever be positive.


#### **`user_bio.es6.jsx`**
#### Props
`@prop user` - passing in the profile page user
`@prop current_user` - passing in the current user viewing the profile page

#### Methods
`_saveForm(e)`
Sends the bio the `Users` controller. Redirects to updated `Resource Page`. Provides flash messages upon success or error.

`renderForm()`
Displays the text boxes prefilled with the user's bio after selecting on "Add Bio" or "Edit".

`renderContent()`
Displays the user's bio, along with the "Edit" or "Add Bio" button depending on whether the user currently has a bio.

#### **`user_photo_delete.es6.jsx`**
#### Props
`@prop user` - user
`@prop images` - photo gallery for user
`@props loading_bus` - loading lavamae bus url

#### Methods
`_selectImage()`
Selection is shown by adding a slight border around the photo.

`_renderImages()`
Takes all the user’s photos and displays them in order for the user to see and select.

`_saveForm(e)`
Sends the list of image ids that have been selected for deletion to the `Image` controller and updates the page.

#### **`user_photo_edit.es6.jsx`**
#### Props
`@prop user` - user
`@prop images` - photo gallery for user
`@props loading_bus` - loading lavamae bus url

#### Methods
`_enableEdit()`
Takes the selected image for edit and navigates to the second form where the user will be able to edit all the information for the image.

`_selectImage()`
Makes it so that the user can only select one image at a time to edit. Selection is shown by adding a slight border around the photo.

`_handleFileChange(e)`
Reference `_handleFileChange(e)` in `module_edit_upload.es6.jsx`.

`_renderImages()`
Takes all the user’s photos and displays them in order for the user to see and select.

`_saveForm(e)`
Sends the new image information, including title, description, and photo to the `Image` controller and updates the page.

`renderPhotoSelection()`
Renders the first part of edit, which is displaying all the images and allowing the user to elect one before continuing on to the next step.

`renderEdit()`
Once the user selects an image and clicks next, they are taken to this form which displays text boxes filled with the current image title and description, along with a preview of the current image.

#### **`user_photo_gallery.es6.jsx`**
#### Props
`@prop images` - photo gallery for user

#### Methods
`componentDidMount()`
Calls the lightGallery assets before calling other methods when this react component is rendered.

`_renderImages()`
Sort the user’s images and call `this._renderImage(image, i)`on each one in order to display all of them.

`_renderCaption(title, description)`
Takes the title and description and renders it as a string of html in order to be passed in and displayed alongside the photo according to the `lightgallery` javascript plugin.

`_renderImage(image, i)`
Defines the thumbnail image to be used for the gallery, along with the original image, title, and description (if available) to be displayed if the thumbnail is liked on.

#### **`user_photo_upload.es6.jsx`**
#### Props
`@prop user` - passing in the profile page user
`@prop current_user` - passing in the current user viewing the profile page

#### Methods
`_handleFileChange(e)`
Reference `_handleFileChange(e)` in `module_edit_upload.es6.jsx`.

`_saveForm(e)`
Sends the user, title, description, and image information the `Images` controller. Redirects to updated `Users Page`. Provides flash messages upon success or error.

`renderForm()`
Displays the upload photo modal with blank text boxes for title, description, and a button to upload an image.

`renderContent()`
Displays either the "Add Photos" or "Start a Gallery!" button depending on whether the user currently has photos in their gallery.


#### **`volunteer_matching.es6.jsx`**
#### Props
`@prop volunteers` - list of all volunteers/volunteer seekers in same location as the current user
`@prop user_id` - user id for the current user
`@prop default_image` - default profile image url
`@prop calling_badge` - calling badge image url
`@prop volunteer_badge` - volunteer badge image url

#### Methods
`_setProfilePic(data, id)`
Sets profile icon to user's profile picture, or to default image if user has no profile picture

`_fetchProfilePic(id)`
Returns the user's profile picture

`_renderUsers()`
Displays list of volunteers/volunteer seekers in the same location along with icons of their profile pictures and badges to indicate volunteer status

#### **`change_password_modal.es6.jsx`**
#### Props
`@prop user_id` - the id of the user
`@prop reset_token` - the password reset token if this form is in reset mode
`@prop show_modal` - if true, start with modal open

#### Methods
`_attemptPasswordUpdate(e)`
Makes a post request and sends passwordUpdateData to `/passwords/${this.props.user_id}`. If the `reset_token` was passed in as a prop (Forgot Password workflow), `reset_password_token` is included instead of the `old_password` (Change Password workflow)


#### **`resource_module.es6.jsx`**
#### Props
`@prop resource_topic` - passed down resource record
`@prop signed_in` - true if a user is signed in
`@prop is_admin` - true if user is an admin

#### Methods
`_handlePreview(e)`
Opens the ResourceTopic attachment in a new window.

`_handleError(msg)`
Displays the error message in a toast.

`setDocuments(resources)`
Sets the state for `resources` and renders the component again.

`_renderAdminEditModal()`
If `this.props.is_admin` is true, then return the `ModuleEditModal` React component element and pass in the `this.props.resource_topic` object.

`_renderAdminDeleteModal()`
If `this.props.is_admin` is true, then return the `ModuleDeleteModal` React component element and pass in the `this.props.resource_topic` object.

`_renderPreviewButton()`
If `this.props.signed_in` is true, show a preview button that allows a user to download the attachment. Clicking the button will call `_handlePreview`. If the user isn't signed in, clicking the preview button will display the `LoginModal` React Component to prompt the user to sign in.

`_renderActionItems()`
Return a div element containing the elements returned from `_renderAdminEditModal`, `_renderAdminDeleteModal`, and `_renderPreviewButton`.



## Stylesheets
### Components
#### **`_button.scss`**
`.btn`
Add this class to all buttons. Includes all of the basic properties for buttons. This class will be used in conjunction with the classes below. For example, `class="btn btn-sm btn-blue"`.

`.btn-sm`
Class for smaller buttons.

`.btn-transparent`
Add this class for a `background: transparent` property.

`.btn-blue`
Add this class for primary "call-to-action" buttons. Adds a `background: $blue-light` (`$blue-light` is the variable name for the primary blue used throughout the website. It is specified in **`partials/_variables.scss`**).

`.btn-outline`
Add this class for secondary action buttons. Adds the properties `background: transparent` and `border: $blue-light`.

`.btn-action`
Add this class to smaller action buttons, like Edit or Delete.

`.btn-destroy`
Add this class for Delete buttons. Adds the property `color: $red`.

`.btn-nav`
Add this class to navigation buttons.

`.btn-nav-selected`
This class is conditionally added when the navigation item represents the page the user is currently on. Adds a `background: $white-20` (20% opacity white).

`.btn-login`
Unique class for Login button.

`.btn-signup`
Unique class for Sign Up button.

`.btn-forum-login`
Unique class for Login button on discussion page.

#### **`_discussion-item.scss`**
`.discussion-item`
Styles each discussion preview in the left panel of all discussions.

`.discussion-item-description`
Adds word wrap and ellipses to truncate discussion description in each item container.

`.selected-discussion`
This class is added when the discussion is selected. Adds a `$blue-light` background and white font.

#### **`_discussion.scss`**
This file is for styling the discussions displayed on the right panel. Do not mistake for `pages/discussion.scss`. The latter is meant for styling the entire discussions page.

`.user-container`
Used globally throughout the website to group user profile pictures, user names, and date posted.
#### **`_dropdown.scss`**
Styles the dropdown menu for profile in the navigation bar.

To create a dropdown, make a parent `div` container and add the `.dropdown` class. Add two child `div` containers to the parent. The first will be the button that triggers the dropdown, so add the `.dropbtn` class to this. The second will be the actual dropdown content that appears, so add the `.dropdown-content` class to this.

#### **`_forms.scss`**
This file styles all form elements, such as text fields, text areas, check boxes and radio buttons.

Here is the proper way to format input labels and input fields:
```
<form>
    <div class=“input-field”>
        <label></label>
        <input></input>
    </div>
</form>
```

Standard check box and radio button styles are overridden by using the `.control` class. Example:
```
<form>
    <div class=“input-field”>
        <label class=“control control—checkbox”>Insert checkbox text here!
            <input type=“checkbox” class=“input-checkbox”/>
            <div class=“control__indicator”></div>
        </label>
    </div>
</form>
```
#### **`_loading.scss`**
Styles loading indicator (bus gif).

#### **`_modal.scss`**
Styles modal components.

#### **`_module.scss`**
Styles each toolkit item on 'Start Your Service' page (used to be called "modules").

#### **`_nav.scss`**
Styles navigation bar on top. Also styles for mobile navigation bar (responsiveness).

#### **`_response.scss`**
Styles discussion responses. The parent container has the class `response-container`.
#### **`_signup.scss`**
Styling for **`registration_modal.es6.jsx`** component.
#### **`_tooltip.scss`**
Styles tooltips for user badges (volunteer, seeking volunteers).

Ex:
```
<div class="tooltip">
    <img class="badge"/>
    <span class="tooltiptext"></span>
</div>
```

### Pages
#### **`about.scss`**
Styles About Lava Mae page (**`views/pages/about.html.erb`**).
#### **`admin.scss`**
Styles Admin Dashboard page (**`views/pages/admin_dashboard.html.erb`**).
#### **`discussion.scss`**
Styles Discussion page components (**`discussion_page.es6.jsx`** and **`discussion_index.es6.jsx`**).
#### **`home.scss`**
Styles landing home page (**`views/pages/home.html.erb`**).
#### **`map.scss`**
Styles 'Our Network' map page (**`views/maps/map.html.erb`**).
#### **`module.scss`**
Styles 'Start Your Service' page (**`resource_page.es6.jsx`**).

Note: This page used to be called 'Modules', then 'Resources,' and now 'Start Your Service'.
#### **`user.scss`**
Styles the user profile page (**`views/users/show.html.erb`**). Used for both My Profile and other users' profiles.

### Partials
#### **`_fonts.scss`**
Use this file to import any fonts. Main font used throughout site is the Google Font '<a href="https://fonts.google.com/specimen/Hind">Hind</a>'. Also used to style headers like `h1`, `h2`, etc.
#### **`_layouts.scss`**
Contains general styles for word-wrap and sizes. Note: This isn't used as much as other style sheets.

#### **`_mixins.scss`**
Mixins let you make groups of CSS declarations that you want to reuse throughout your site. For example, it handles vendor prefixes for different web browsers (`-webkit-`, `-moz-`, `-ms-`, `-o-`).
#### **`_reset.scss`**
Resets all margins, borders, padding to 0. Also styles `section` and `.container` class, which are used for almost every page.

Every page should have a parent `section` container that adds padding to account for the height of the nav bar and adds the standard light gray background (`$bg-color`). `section` should then contain a `.container` div that contains the `width: 90vw`.

Ex:
```
<section>
    <div class="container">
    </div>
</section>
```
#### **`_variables.scss`**
Use this file to declare any variables, such as color, font stacks and sizes.

This file holds all color variables (`$blue-light`, `$white-20`).








