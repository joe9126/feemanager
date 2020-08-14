 <?php include 'header.php';?>
<!-- Load an icon library to show a hamburger menu (bars) on small screens -->
<div class="topnav" id="myTopnav">
  <a href="" class="active menuitem">Home</a>
  <a href="" class="menuitem" id="payments">Payments</a>
  <a href="" class="menuitem" id="statements">Statements</a>
  <a href="" class="menuitem" id="students">Students</a>
  <a href="" class="menuitem" id="settings">Settings</a>
  <a href="" id="login"><?php echo $this->session->userdata('staffname')." | ";?>
      <img class="logoutpng" src="<?php echo base_url();?>assets/images/icons/logout2.png"> 
                        </a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <div class="fa fa-bars">test</div>
  </a>
</div> 