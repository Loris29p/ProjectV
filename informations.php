<?php
    require_once('./Src/Model/functions.php');
    require_once('./Src/Controller/SGBD/SGBD.class.php');
    require_once('./Config/Config.php');
    require_once('./Src/Controller/Informations/Informations.class.php');

    $informations = new Informations();

    session_start();

    $vpcArray = constant("VPC_ARRAY");
    $transitGatewayArray = constant("TRANSIT_GATEWAY_ARRAY");
    $subnetsArray = constant("NETWORK_ARRAY");
    $routeTablesArray = constant("ROUTE_TABLES_ARRAY");
    $vpnArray = constant("VPN_ARRAY");

    $accounts = [
        ["name"=> "VESA PROD"],
        ["name"=> "VESA ACCESS"],
        ["name"=> "VESA MANAGEMENT"],
        ["name"=> "VESA TRANSIT"],
    ];

    if (isset($_GET['account'])) {
        $account = $_GET['account'];
        $array = Array();
        foreach ($vpcArray as $vpc) {
            if ($vpc['souscription'] == $account) {
                $array[] = $vpc;
            }
        }
        $vpcArray = $array;
    }

    $infos_to_show = $informations->getInformations($_GET['type'], $_GET['id']);
?>

<html>
    <head>
        <title>AWS</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="./node_modules/jquery/dist/jquery.js"></script>
        <link rel="stylesheet" href="./Src/assets/css/navbar.css">
        <link rel="stylesheet" href="./Src/assets/css/main.css"> 
        <link rel="stylesheet" href="./Src/assets/css/informations.css"> 
        <script src="./Src/assets/scripts/config.js"></script>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    </head>

    <body>

        <main>
            <?php 
                if (isset($_SESSION['id'])) {
                ?>
                <div id="infos-elements">
                    <div class="top-class-infos-elements">
                        <h2>Informations</h2>
                    </div>
                    <div id="list-infos-elements">
                        <table>
                            <?php 
                            foreach ($infos_to_show as $key => $value) {
                                echo "<tr>";
                                echo "<td>$key</td>";
                                echo "<td>$value</td>";
                                echo "</tr>";
                            }
                            ?>
                        </table>
                    </div>
                </div>
                <?php
                }
            ?>
        </main>

        <header>

            <div class="navbar_top_right">
                <div id="account_top_right">
                    <img src="./Src/assets/img/companies/<?php echo constant("IMG_COMPANY"); ?>" alt=""/>
                    <i class="fad fa-user-circle"></i>
                </div>
                <a href=javascript:history.go(-1) class="icon_come_back">
                    <i class="fad fa-arrow-circle-left"></i>
                </a>
                <a class="icon-menu2" href="./index.php">
                    <i class="fad fa-home"></i>
                </a>
            </div>
            
            <div class="big_navbar">
            <?php 
                if (isset($_SESSION['id'])) {
                ?>
                <nav class="navbar2">
                    <a id="icon-menu">
                        <i class="fad fa-bars"></i>
                    </a>
                    <div class="navbar2-ul">
                        <ul>
                            <?php 
                            if (isset($_GET['cloud'])) {
                                ?>
                                <li id="navbar-dropdown-cloud-li">
                                    <i class="fad fa-cloud"></i>
                                    <a>Comptes</a>
                                </li>
                                <?php
                            }
                            ?>
                            <?php if (isset($_GET['account'])) {
                            ?>
                                <li id="navbar-dropdown-vpc-li">
                                    <i class="fad fa-server"></i>
                                    <a>VPC</a>
                                </li>
                                <li id="navbar-dropdown-subnets-li">
                                    <i class="fad fa-network-wired"></i>
                                    <a>Subnets</a>
                                </li>
                                <li id="navbar-dropdown-table-routage-li">
                                    <i class="fad fa-chart-network"></i>
                                    <a>Tables de routage</a>
                                </li>
                                <li id="navbar-dropdown-vpn-li">
                                    <i class="fad fa-wifi-2"></i>
                                    <a>VPN</a>
                                </li>
                                <li id="navbar-dropdown-transit-gateway-li">
                                    <i class="fal fa-ethernet"></i>
                                    <a>Transit Gateway</a>
                                </li>
                                <?php
                            }
                            ?>
                        </ul>
                    </div>
                </nav>
                <?php
                }
            ?>

                <div id="show_more_elements_navbar_cloud">
                    <div class="show_more_elements_navbar_cloud_2">
                        <h2>Comptes</h2>
                    </div>
                    <div class="show_more_elements_navbar_cloud_3">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php 
                                foreach ($accounts as $account) {
                                    ?>
                                    <li>
                                        <i class="fad fa-users"></i>
                                        <a href="./index.php?account=<?php echo $account['name']; ?>&cloud=<?php echo $_GET["cloud"]; ?>"><?php echo $account['name']; ?></a>
                                    </li>
                                    <?php
                                }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="show_more_elements_navbar_vpc">
                    <div class="show_more_elements_navbar_vpc_2">
                        <h2>VPC</h2>
                    </div>
                    <div class="show_more_elements_navbar_vpc_3">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php 
                                    foreach ($vpcArray as $vpc) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./index.php?vpc='.$vpc['vpc_id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'">' . $vpc['vpc'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="show_more_elements_navbar_transit_gateway">
                    <div class="show_more_elements_navbar_transit_gateway_2">
                        <h2>Transit Gateway</h2>
                    </div>
                    <div class="show_more_elements_navbar_transit_gateway_3">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php
                                    foreach ($transitGatewayArray as $transit) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./index.php?transit_gateway='.$transit['gateway'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'">' . $transit['gateway'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="show_more_elements_navbar_subnets">
                    <div class="show_more_elements_navbar_subnets_2">
                        <h2>Subnets</h2>
                    </div>
                    <div class="show_more_elements_navbar_subnets_3">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php
                                    foreach ($subnetsArray as $subnets) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./informations.php?id='.$subnets['network_id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'&type=NETWORK_ARRAY">' . $subnets['network_id'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="show_more_elements_navbar_route_table">
                    <div class="show_more_elements_navbar_route_table_2">
                        <h2>Table de routage</h2>
                    </div>
                    <div class="show_more_elements_navbar_route_table_3">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php
                                    foreach ($routeTablesArray as $route_table) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./informations.php?id='.$route_table['id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'&type=ROUTE_TABLES_ARRAY">' . $route_table['name'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="show_more_elements_navbar_vpn">
                    <div class="show_more_elements_navbar_vpn_2">
                        <h2>VPN</h2>
                    </div>
                    <div class="show_more_elements_navbar_vpn_3">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php
                                    foreach ($vpnArray as $vpn) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./informations.php?id='.$vpn['virutal_private_gateway_id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'&type=VPN_ARRAY">' . $vpn['virutal_private_gateway_id'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="show_more_elements_navbar_transit_gateway">
                    <div class="show_more_elements_navbar_transit_gateway_2">
                        <h2>Tables de routage</h2>
                    </div>
                    <div class="show_more_elements_navbar_transit_gateway_3">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php
                                    foreach ($transitGatewayArray as $transit) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./index.php?transit_gateway='.$transit['gateway'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'">' . $transit['gateway'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-cloud">
                    <div class="top-class-navbar-dropdown-cloud">
                        <h2>Comptes</h2>
                    </div>
                    <div class="list-navbar-dropdown-cloud">
                        <div>
                            <i class="fab fa-aws"></i>
                            <ul>
                                <?php 
                                foreach ($accounts as $account) {
                                    ?>
                                    <li>
                                        <i class="fad fa-users"></i>
                                        <a href="./index.php?account=<?php echo $account['name']; ?>&cloud=<?php echo $_GET["cloud"]; ?>"><?php echo $account['name']; ?></a>
                                    </li>
                                    <?php
                                }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-vpc">
                    <div class="top-class-navbar-dropdown-vpc">
                        <h2>VPC</h2>
                    </div>
                    <div class="list-navbar-dropdown-vpc">
                        <div>
                            <ul>
                                <?php 
                                    foreach ($vpcArray as $key=>$vpc) {
                                        if ($key > 10) {
                                            break;
                                        }
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./index.php?vpc='.$vpc['vpc_id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'">- ' . $vpc['vpc'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>   
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-transit-gateway">
                    <div class="top-class-navbar-dropdown-transit-gateway">
                        <h2>Transit Gateway</h2>
                    </div>
                    <div class="list-navbar-dropdown-transit-gateway">
                        <div>
                            <ul>
                                <?php
                                    foreach ($transitGatewayArray as $transit) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a class="button_vpc_text" href="./index.php?transit_gateway='.$transit['gateway'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'">' . $transit['gateway'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-subnets">
                    <div class="top-class-navbar-dropdown-subnets">
                        <h2>Subnets</h2>
                    </div>
                    <div class="list-navbar-dropdown-subnets">
                        <div>
                            <ul>
                                <?php 
                                    foreach ($subnetsArray as $key=>$subnets) {
                                        if ($key > 10) {
                                            break;
                                        }
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./informations.php?id='.$subnets['network_id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'&type=NETWORK_ARRAY">' . $subnets['network_id'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>   
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-route-table">
                    <div class="top-class-navbar-dropdown-route-table">
                        <h2>Table de routage</h2>
                    </div>
                    <div class="list-navbar-dropdown-route-table">
                        <div>
                            <ul>
                                <?php 
                                    foreach ($routeTablesArray as $key=>$route_table) {
                                        if ($key > 10) {
                                            break;
                                        }
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./informations.php?id='.$route_table['id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'&type=ROUTE_TABLES_ARRAY">' . $route_table['name'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>   
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-vpn">
                    <div class="top-class-navbar-dropdown-vpn">
                        <h2>VPN</h2>
                    </div>
                    <div class="list-navbar-dropdown-vpn">
                        <div>
                            <ul>
                                <?php 
                                    foreach ($vpnArray as $vpn) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./informations.php?id='.$vpn['virutal_private_gateway_id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'&type=VPN_ARRAY">' . $vpn['virutal_private_gateway_id'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>   
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-vpc">
                    <div class="top-class-navbar-dropdown-vpc">
                        <h2>VPC</h2>
                    </div>
                    <div class="list-navbar-dropdown-vpc">
                        <div>
                            <ul>
                                <?php 
                                    foreach ($vpcArray as $vpc) {
                                        echo '<li>';
                                        echo '<i class="fad fa-stream"></i>';
                                        echo '<a href="./index.php?vpc='.$vpc['vpc_id'].'&account='.$_GET['account'].'&cloud='.$_GET['cloud'].'">- ' . $vpc['vpc'] . '</a>';
                                        echo '</li>';
                                    }
                                ?>
                            </ul>  
                        </div>
                    </div>
                </div>

                <div id="navbar-dropdown-account">
                    <div class="message_advert_account">
                        <span class="message_advert_account_first_span">
                            Ce compte est géré par <span class="message_advert_account_first_span_2">veolia.com</span> 
                        </span>
                        <span data-et="14" data-dt="3" class="show_more_account_advert">
                            <a target="_blank" href="https://support.google.com/accounts/answer/181692?hl=fr&authuser=0">
                                En savoir plus
                            </a>
                        </span>
                    </div>
                    <div class="account_details_dropdown">
                        <?php 
                            if (isset($_SESSION['id'])) {
                                ?>
                                <div class="account_details_dropdown_img">
                                    <i class="fad fa-user-circle"></i>
                                </div>
                                <div class="first_last_name_dropdown">Loris Poilly</div>
                                <div class="mail_dropdown">loris.poilly@veolia.com</div>
                                <div>
                                    <a href="./account_parameters.php" class="manage_account_dropdown_a">
                                        Gérer votre compte
                                    </a>
                                </div>
                                <div class="logout_dropdown">
                                    <a href="./logout.php" class="logout_dropdown_a">
                                        <div class="logout_dropdown_div">
                                            Se déconnecter
                                        </div>
                                    </a>
                                </div>
                                <?php   
                            } else {
                                ?>
                                <div class="account_details_dropdown_img" style="opacity: 0.3;">
                                    <i class="fad fa-user-circle"></i>
                                </div>
                                <div class="first_last_name_dropdown" style="opacity: 0.3;">----- -----</div>
                                <div class="mail_dropdown" style="opacity: 0.3;">-------------------------</div>
                                <div>
                                    <a class="manage_account_dropdown_a" style="opacity: 0.3;">
                                        Gérer votre compte
                                    </a>
                                </div>
                                <div class="logout_dropdown">
                                    <a href="./login_form.php" class="logout_dropdown_a">
                                        <div class="logout_dropdown_div">
                                            Se connecter
                                        </div>
                                    </a>
                                    <a href="./register_form.php" class="logout_dropdown_a">
                                        <div class="logout_dropdown_div">
                                            S'enregistrer
                                        </div>
                                    </a>
                                </div>
                                <?php
                            }
                        ?>
                        <div class="bottom_account_details_dropdown">
                            <span>
                                <a class="bottom_account_details_dropdown_1" href="https://policies.google.com/terms?hl=fr" target="_blank">
                                    Règles de confidentialité
                                </a>
                            </span>
                            <span class="bottom_account_details_dropdown_2"> • </span>
                            <span>
                                <a class="bottom_account_details_dropdown_3" href="https://policies.google.com/privacy?hl=fr" target="_blank">
                                    Conditions d'utilisation
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <script src="./Src/assets/scripts/main.js"></script>
    </body>