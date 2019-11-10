<h1>Messaging Application Prototype</h1>

<h6>Version 1.3.1</h6>

<p>This branch contains the Laravel (PHP Framework) and Vue JS build of the Messaging Application Prototype. It is to be integrated with the Vue JS build of our Advising Application once everything else is working smoothly and integrated properly. Integrating this could either be as simple as connecting it to the DataBase in the .env file, and then grabbing the files we need and routing to the proper views, or it could be extremely complex. In the latter case, I will simply curl up into a ball and cry. Have your fingers crossed that the former will turn out to be true.</p>

<p><b>Future changes necessary:</b></p>
<ul>
<!--     <li>The list of contacts in ContactsList.vue needs to be ordered by most to least recent messages. Currently it is ordered by most to least unread messages.</li> -->
<!--     <li>The list of contacts in ContactsList.vue needs to only include users that the user currently logged in has already started conversations with. Currently it contains all users in the mysql users table.</li> -->
    <li>A search bar that allows the user to search through the list of contacts for a specific contact needs to be added.</li>
    <li>An option to start a new conversation with a new user needs to be added.</li>
    <li>A button (temporarily routing nowhere) that will allow the user to go back to the previous page needs to be added.</li>
    <li>Distinguishing the differences in features of the message app for Advisors and Students (Students can only message their advisors, advisors can start conversationgs with students).</li>
    <li>Integrate this messenger application with the advising application.</li>
</ul>

<h3>Version History</h3>
<p><b>Version 1.3.1</b> -> Began the implementation of the SeachBar. It currently is present on screen and posts a query in the URL, but it does not yet function.</p>
<p><b>Version 1.3.0</b> -> The list of contacts in ContactsList.vue now only includes users that the current user has sent messages to or received messages from.</p>
<p><b>Version 1.2.1</b> -> Minor changes to the fake database backend. The unused 'phone' column was removed. The necessary column 'isStudent' for distinguishing the difference between a Student User and an Advisor User in future versions was added to the fake database. The factory UserFactory was updated to reflect these changes.</p>
<p><b>Version 1.2.0</b> -> The list of contacts in ContactsList.vue now renders whether a user is online or offline using an updateOnline() method and custom ActiveUser Middleware to temporarily link a user's online state to their Cache based on a 15 second expiration timer. It updates that a user is offline after 15 seconds of having logged out or closed their browser.</p>
<p><b>Version 1.1.0</b> -> The list of contacts in ContactsList.vue is now ordered by most to least recent messages.</p>
<p><b>Version 1.0.0</b> -> Fully built application; fake backend implementation; fake database placeholder data utilizaed; placeholder user authentication used (php artisan ui:auth scaffolding used for this);</p>
