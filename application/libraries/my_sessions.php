<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Sessions
 *
 * @author jasewe
 */
class MY_Sessions extends CI_Controller{
   public function __construct() {
       parent::__construct();
   }
   public function is_logged_in(){
       $CI = & get_instance();
       $userdata = $CI->session->userdata();
       if(isset($userdata)){
            $loggedin = $userdata['logged_in'];
              return isset($loggedin); 
       }else{
           return FALSE;
       }
      
     
       
   }
}
