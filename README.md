<h1>Complete User Auth System</h1>
<br/>
<h3>1- Create Operation (SignUp):</h3>
<p>1.1- Creating a new user (username, email, password)</p>
<a href="">http://localhost:4000/api/users/signup</a>
<p>1.2- Verifying Email Address using OTP CODE sending to User-Email</p>
<a href="">http://localhost:4000/api/users/verifyemail</a>
<br/>
<a href="">http://localhost:4000/api/users/verifyotpcode</a>
<br/>
<br/>
<h3>2- Get Operation (Login):</h3>
<p>2.1- Getting single user (email, password) = Login</p>
<p>2.2- Getting single user (Token)</p>
<a href="">http://localhost:4000/api/users/login</a>
<br/>
<h3>3- Update Operation:</h3>
<p>3.1- Updating single user (username)</p>
<p>3.2- Updating single user (password) by sending OTP CODE to User-Email</p>
<p>3.3- Change Password (Changing Password of an Existing User)</p>
<a href="">http://localhost:4000/api/users/changepassword</a>
<p>3.4- Forget Password (Creating new Password for an Existing User)</p>
<a href="">http://localhost:4000/api/users/newpassword</a>
<p>3.4.1- Sending OTP CODE to an existing User-Email</p>
<p>3.5- Update password for admin without verification</p>
<a href="">http://localhost:4000/api/users/verifyadmin/admin</a>
<br/>
<a href="">http://localhost:4000/api/users/updateadmin/admin</a>
<br/>
<h3>4- Delete Operations:</h3>
<p>4.1- Deleting single user (by using system user {Token, email})</p>
<a href="">http://localhost:4000/api/users/email</a>
<p>4.2- Deleting all  users (by system admin {Token})</p>

