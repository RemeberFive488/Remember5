<?php
            echo "Registration Successfullly";
            $name = $_POST['name'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            
            print "Name: $name";
            print "<br>";
            print "email: $email";
            print "<br>";
            print "password: ";
            print $password;

            $conn = mysqli_connect("localhost","root","","createaccount");
            $q ="inert into registration value(NULL,' $name','$email','$password')";

if (!$conn) {
    die("Connection Failed: " .mysqli_connect_error());
}
echo "Connected, database works";
            
?>