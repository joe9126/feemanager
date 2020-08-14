<?php

class Students extends MY_Sessions{
    function __construct() {
        parent::__construct();
        $this->load->model('studentsmodel');
    }
    function index(){
        if(!$this->is_logged_in()){
            redirect('login');
        }
    }
    
    function students(){
        $this->load->view("students");
    }
    
    function register(){
        $regdata = json_decode(stripslashes($this->input->post("data")));
      $status = $this->studentsmodel->register($regdata);
    echo $status; 
    }
}
