<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

  <title>Remember5</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" type="text/css" href="createAccount.css" media="screen" />
</head>

<div class="header">
    <title>Remember5</title>
    <div class="inner_header">

        <div class="logo">
            
            <img class="MoonText" src="MoonText.png" alt="moon">
        </div>

        <img class = "Moon" src="Moon2.png" alt="moonTuring">

        <ul class="navigation">
            <a href="ActuallyHomePage.html"><li><button class="btn btn-home"> Home</button></li></a>
            <a href="About.html"><li><button class="btn btn-about"> About</button></li></a>
            <a href="Contact.html"><li><button class="btn btn-contact"> Contact</button></li></a>
        </ul>

    </div>
</div>

<div class="CreateAccount">  	
    <input type="checkbox" id="chk" aria-hidden="true">

        <div class="signup">
            <label for="chk" aria-hidden="true">Create Your Account</label>

            <form  method="post" action="createAccountInfo.php">
                <input type="text" name="name" placeholder="Name" required="">
                <input type="email" name="email" placeholder="Email" required="">
                <input type="password" name="password" placeholder="Password" required="">
                <button>Create Your Account</button>
                
            </form>
            <a href ="Login.html"> 
                <button> Login</button>
            </a>
        </div>

    
</div>


</body>
</html>