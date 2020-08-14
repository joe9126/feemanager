<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Sessions {

function __construct() {
    parent::__construct();
    $this->load->model("loginmodel");
        $this->load->model("homemodel");
}
	public function index(){
	 if(!$this->is_logged_in()){
              redirect('login');
            } else{
                 $this->load->view('dashboard');
            }    
	}
        
        function userlogin(){
            $this->load->view('login');
        }
        function authenticate(){
            $username = $this->input->post("username");
            $password = $this->input->post("password");
           $userinfo = $this->loginmodel->authenticate($username,$password); 
            $status ="invalidlogin";
            if($userinfo['username']===$username && $userinfo['password']=== md5($password)){
               $sessiondata = array("userid"=>$userinfo['userid'],"staffname"=>$userinfo['staffname'],"role"=>$userinfo["role"],
                   "title"=>$userinfo["title"],"schoolid"=>$userinfo["schoolid"],"logged_in"=>TRUE);
               $this->session->set_userdata($sessiondata);  
               $status = "loggedin";
            }
             $data = array("status"=>$status,"staffname"=>$userinfo['staffname']);
            echo json_encode($data);
        }
        
        
        
        
        function dashboard(){
             $this->load->view('dashboard');
        }
        
        function getclasses(){
            $schoolid = $this->session->userdata("schoolid");
            $data = $this->homemodel->getclasses($schoolid);
            echo json_encode($data);
        }
        function getstreams(){
            $schoolid = $this->session->userdata("schoolid");
            $data = $this->homemodel->getstreams($schoolid);
            echo json_encode($data);
        }
        
        function error_404(){
            redirect('pagenotfound');
        }
}
