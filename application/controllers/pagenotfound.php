<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Pagenotfound extends MY_Sessions{
    function __construct() {
        parent::__construct();
    }
    public function index(){
        $this->output->set_status_header("404");
      	$this->load->view('pagenotfound');
    }
}
