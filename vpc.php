<?php
    require_once("./Config/Config.php");
    require_once("./Src/Controller/User/User.php");
    require_once('./Src/Model/functions.php');
    require_once('./Src/Controller/Mother.php');
    require_once('./Src/Controller/SGBD/sgbd.php');

    $mother = new Mother();
    $vpcArray = $mother->GetAllType()['vpc'];
    $transitGatewayArray = $mother->GetAllType()['transit_gateway'];

    $data_show_aside = "";

    function GetInfosOfVPC($vpcId) {
        $mother = new Mother();
        $vpcArray = $mother->GetAllType()['vpc'];
        foreach ($vpcArray as $vpc) {
            if ($vpc['vpc_id'] == $vpcId) {
                return $vpc;
            }
        }
    }

    if (isset($_GET['account'])) {
        if (isset($_GET['aside'])) {
            $data_show_aside = $_GET['aside'];
        }
        $account = $_GET['account'];
        $array = Array();
        foreach ($vpcArray as $vpc) {
            if ($vpc['souscription'] == $account) {
                $array[$vpc['vpc_id']] = $vpc;
            }
        }
        $vpcArray = $array;
    }
?>

<html>
    <head>
        <title>AWS</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="./Src/assets/css/gojs.css">
        <script src="https://unpkg.com/gojs/release/go-debug.js"></script>
        <link rel="stylesheet" href="./Src/assets/css/main.css"> 
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    </head>

    <body>

        <header>
            <nav class="navbar">
                <div class="navbar-ul">
                    <ul>
                        <li><a href="./index.php">Acceuil</a></li>
                        <li><a href="./vpc.php">Elements</a></li>
                        <li><a href="./update.php">Mise à jour</a></li>
                    </ul>
                </div>
            </nav>
            <div id="dropdown-cloud">
                <button class="dropbtn-cloud">
                    Cloud
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-cloud-content">
                    <div>
                        <i class="fa fa-caret-right"></i>
                        <a>AWS</a>
                        <ul>
                            <li>
                                <a href="./vpc.php?account=VESA PROD&aside=vpc">- VESA PROD</a>
                            </li>
                            <li>
                                <a href="./vpc.php?account=VESA ACCESS&aside=vpc">- VESA ACCESS</a>
                            </li>
                            <li>
                                <a href="./vpc.php?account=VESA MANAGEMENT&aside=vpc">- VESA MANAGEMENT</a>
                            </li>
                            <li>
                                <a href="./vpc.php?account=VESA TRANSIT&aside=vpc">- VESA TRANSIT</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <i class="fa fa-caret-right"></i>
                        <a>Azure</a>
                        <ul>
                            <li>
                                <a href="./vpc.php?account=VESA PROD&aside=vpc">- Aucun</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <?php if (isset($_GET['account'])) {
                ?>
                <div id="dropdown-elements">
                    <button class="dropbtn-elements">
                        Elements
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-elements-content">
                        <select onchange="location = this.value" onclick="location = this.value">
                            <option value="./vpc.php?account=<?php echo $_GET['account']; ?>&aside=vpc" <?php if ($data_show_aside != "" && $data_show_aside == "vpc") { echo "selected"; } ?>>VPC</option>
                            <option value="./vpc.php?account=<?php echo $_GET['account']; ?>&aside=transit_gateway" <?php if ($data_show_aside != "" && $data_show_aside == "transit_gateway") { echo "selected"; } ?>>Transit Gateway</option>
                        </select>
                        <ul>
                            <?php 
                                if ($data_show_aside != "transit_gateway") {
                                    foreach ($vpcArray as $vpc) {
                                        echo '<li>';
                                        echo '<a href="./vpc.php?vpc='.$vpc['vpc_id'].'&account='.$_GET['account'].'&aside='.$_GET['aside'].'">- ' . $vpc['vpc'] . '</a>';
                                        echo '</li>';
                                    }
                                } elseif ($data_show_aside == "transit_gateway") {
                                    foreach ($transitGatewayArray as $transit) {
                                        echo '<li>';
                                        echo '<a class="button_vpc_text" href="./vpc.php?transit_gateway='.$transit['gateway'].'&account='.$_GET['account'].'&aside='.$_GET['aside'].'">' . $transit['gateway'] . '</a>';
                                        echo '</li>';
                                    }
                                }
                            ?>
                        </ul>
                    </div>
                </div>
                <div class="account_name">
                    <a>Compte: <?php echo $_GET['account']; ?></a>
                </div>
                <?php
            }
            ?>


            <!-- Part for just draw the diagram -->
            <?php 
                if (isset($_GET['vpc'])) {
                    $vpc_id = "'".$_GET['vpc']."'";
                    ?>
                        <div id="vpc_show_aws">
                            <a>
                                <i class="fab fa-aws"></i>
                                AWS Cloud
                            </a>
                            <div class="zone_name">
                                <a>
                                    <i class="fal fa-flag"></i>
                                    <?php echo GetInfosOfVPC($_GET['vpc'])['region']; ?>
                                </a>
                                <div class="vpc_info">
                                    <a>
                                    <i class="fal fa-network-wired"></i>
                                        <?php echo GetInfosOfVPC($_GET['vpc'])['vpc']; ?>
                                        <p><?php echo GetInfosOfVPC($_GET['vpc'])['cidr']; ?></p>
                                    </a>
                                    <div id="myDiagramDiv"></div>
                                    <script src="./Src/assets/script/gojs.js"></script>
                                    <div>
                                        <script>
                                            Construct(<?php echo json_encode($vpcArray); ?>, <?php echo json_encode($transitGatewayArray); ?>);
                                            ConstructFirstPartVPCId(<?php echo $vpc_id; ?>);
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php
                } elseif (isset($_GET['account']) && !isset($_GET['vpc']) && !isset($_GET['transit_gateway'])) {
                ?>
                    <div id="vpc_show_aws">
                        <a>
                            <i class="fab fa-aws"></i>
                            AWS Cloud
                        </a>
                        <div id="myDiagramDiv"></div>
                        <script src="./Src/assets/script/gojs.js"></script>
                        <div>
                            <script>
                                Construct(<?php echo json_encode($vpcArray); ?>, <?php echo json_encode($transitGatewayArray); ?>, true);
                            </script>
                        </div>
                    </div>
                <?php
                } elseif (isset($_GET['transit_gateway'])) {
                    $transit_gateway_id = "'".$_GET['transit_gateway']."'";
                    ?>
                        <div id="vpc_show_aws">
                            <a>
                                <i class="fab fa-aws"></i>
                                AWS Cloud
                            </a>
                            <div id="myDiagramDiv"></div>
                            <script src="./Src/assets/script/gojs.js"></script>
                            <div>
                                <script>
                                    Construct(<?php echo json_encode($vpcArray); ?>, <?php echo json_encode($transitGatewayArray); ?>);
                                    ConstructFirstPartTransitGatewayId(<?php echo $transit_gateway_id; ?>);
                                </script>
                            </div>
                        </div>
                    <?php
                }
            ?>
        </header>
    </body>