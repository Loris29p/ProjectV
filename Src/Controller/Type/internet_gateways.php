<?php 
    require_once('Src/Controller/Read/Read.php');
    require_once('Src/Controller/SGBD/sgbd.php');

    class Internet_Gateways {
        private $internet_gateways_array;
        private $read;
        private $sgbd;

        public function __construct()
        {
            $this->read = new Read();
            $this->BuildArray();
            $this->sgbd = new SGBD();
        }

        public function BuildArray() {
            $internet_gateways_array = $this->read->ReadInternetGateway();
            foreach ($internet_gateways_array as $key => $value) {
                if ($key != 0 AND $key != count($internet_gateways_array)) {
                    $value = $value;
                    $name = $value[0];
                    $internet_gateway_id = $value[1];
                    $state = $value[2];
                    $vpc_id = $value[3];
                    $owner = $value[4];
                    $this->internet_gateways_array[] = ["name" => $name, "internet_gateway_id" => $internet_gateway_id, "state" => $state, "vpc_id" => $vpc_id, "owner" => $owner];
                }
            }
        }

        public function GetAllInternet_Gateways() {
            return $this->internet_gateways_array;
        }

        public function Update_SGDB() {
            $internet_gateways = $this->sgbd->get('internet_gateways');
            if ($internet_gateways != $this->internet_gateways_array) {
                echo "Une mise à jour des disponible";
                $this->sgbd->truncate("internet_gateways");
                sleep(1);
                foreach ($this->internet_gateways_array as $key => $value) {
                    $this->sgbd->insert('internet_gateways', $value);
                }
            } else {
                echo "Aucune mise à jour disponible";
            }
        }
    }