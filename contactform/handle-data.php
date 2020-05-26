<?php
// Check if the form is submitted
if ( isset( $_POST['submit'] ) ) {

// retrieve the form data by using the element's name attributes value as key

echo '<h2>form data retrieved by using the $_REQUEST variable<h2/>'

$firstname = $_REQUEST['firstname'];
$lastname = $_REQUEST['lastname'];

// display the results
echo 'Your name is ' . $lastname .' ' . $firstname;

// check if the post method is used to submit the form

if ( filter_has_var( INPUT_POST, 'submit' ) ) {

echo '<h2>form data retrieved by using $_POST variable<h2/>'

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];

// display the results
echo 'Your name is ' . $lastname .' ' . $firstname;
}

// check if the get method is used to submit the form

if ( filter_has_var( INPUT_GET, 'submit' ) ) {

echo '<h2>form data retrieved by using $_GET variable<h2/>'

$firstname = $_GET['firstname'];
$lastname = $_GET['lastname'];
}

// display the results
echo 'Your name is ' . $lastname .' ' . $firstname;
exit;
}

$value = $_GET['name'];
$formfield = $_GET['field'];
// Check Valid or Invalid user name when user enters user name in username input field.
if ($formfield == "name") {
if (strlen($value) < 4) {
echo "Must be 3+ letters";
} else {
echo "<span>Valid</span>";
}
}
// Check Valid or Invalid email when user enters email in email input field.
if ($formfield == "email") {
if (!preg_match("/([w-]+@[w-]+.[w-]+)/", $value)) {
echo "Invalid email";
} else {
echo "<span>Valid</span>";
}
}
/*
// Check Valid or Invalid password when user enters password in password input field.
if ($formfield == "Subject") {
if (strlen($value) < 6) {
echo "PLease enter at least 8 chars of subject";
}
}

// Check Valid or Invalid website address when user enters website address in website input field.
if ($formfield == "website") {
if (!preg_match("/b(?:(?:https?|ftp)://|www.)[-a-z0-9+&@#/%?=~_|!:,.;]*[-a-z0-9+&@#/%=~_|]/i", $value)) {
echo "Invalid website";
} else {
echo "<span>Valid</span>";
}
}*/
?>
