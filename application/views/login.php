<?php include 'header.php';?>

<div id="logindiv">
    <div id="usericondiv"></div>
    <div id="logininputsdiv">
        <form id="loginform" name="loginform" action="" method="post">
            <input type="text" placeholder="Username" id="username" name="username"/>
        <input type="password" placeholder="Password" id="password" name="password"/>
         <input type="submit" value="Login" id="loginbtn"/>
        </form>
         <a id="resetpwordspan" href="<?php echo base_url();?>index.php/resetpassword">Forgot password?</a>
    </div>
</div>


<div id="dialogoverlay"></div>

<div id="alertdialogbox">
  <div>
    <div id="alertdialogboxhead"></div>
    <div id="alertdialogboxbody"></div>
    <div id="alertdialogboxfoot"></div>
  </div>
</div>
