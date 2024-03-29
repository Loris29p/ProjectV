const diagram = go.GraphObject.make;

const myDiagram = diagram(go.Diagram, "schema_vpc", // must name or refer to the DIV HTML element
    {
        "animationManager.initialAnimationStyle": go.AnimationManager.None,
        "InitialAnimationStarting": e => {
            var animation = e.subject.defaultAnimation;
            animation.easing = go.Animation.EaseOutExpo;
            animation.duration = 500;
            animation.add(e.diagram, 'scale', 0.1, 1);
            animation.add(e.diagram, 'opacity', 0, 1);
        },

        "commandHandler.copiesTree": true,
        "commandHandler.deletesTree": true,
        "linkingTool.archetypeLinkData": { category: "Mapping" },
        "undoManager.isEnabled": true,
        positionComputation: function(diagram, pt) {
            return new go.Point(Math.floor(pt.x), Math.floor(pt.y));
        }
    });

var VPC = []
var TransitGateway = []

var nodeDataArray = []
var linkDataArray = []

myDiagram.nodeTemplate = diagram(go.Node, "Horizontal", {
        background: "rgb(228, 228, 228)",
        locationSpot: go.Spot.Center,
        width: 200,
        height: 30,
        movable: false,
    },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    diagram(go.Picture, {
            margin: 5,
            width: 30,
            height: 30,
            background: "transparent"
        },
        new go.Binding("source", "source")),
    diagram(go.TextBlock, {
            font: "bold small-caps 8pt helvetica, bold arial, sans-serif",
            // margin: 7,
            stroke: "rgba(0, 0, 0, .87)",
        },
        new go.Binding("text").makeTwoWay(),
        new go.Binding("stroke", "stroke"))
);

myDiagram.linkTemplate =
    new go.Link({ routing: go.Link.Orthogonal, corner: 5 })
    .add(new go.Shape({ strokeWidth: 3, stroke: "#555" }))

myDiagram.addDiagramListener("ObjectDoubleClicked", function(e) {
    var clicked = e.subject.part;
    if (clicked instanceof go.Node) {
        var node = clicked.data;
        if (String(node.key).includes("vpc")) {
            ConstructFirstPartVPCId(node.key);
        } else if (String(node.key).includes("tgw") && !String(node.key).includes("tgw-attach")) {
            ConstructFirstPartTransitGatewayId(node.key);
        }
    }
});

myDiagram.addDiagramListener("ObjectSingleClicked",
    function(e) {
      var clicked = e.subject.part;
      if (!(clicked instanceof go.Link)) {
        var node = clicked.data;
        var navbar_dropdown_infos_elements = document.getElementById("navbar-dropdown-infos-elements");
        if (navbar_dropdown_infos_elements != null) {
            var list_navbar_dropdown_infos_elements = document.getElementById("list-navbar-dropdown-infos-elements");
            var icon_menu_shwo_more_infos_element = document.getElementById("icon-menu-shwo-more-infos-element");

            var show_more_elements_navbar_cloud = document.getElementById("show_more_elements_navbar_cloud");
            var show_more_elements_navbar_vpc = document.getElementById("show_more_elements_navbar_vpc");
            var show_more_elements_navbar_transit_gateway = document.getElementById("show_more_elements_navbar_transit_gateway");
            var show_more_elements_navbar_subnets = document.getElementById("show_more_elements_navbar_subnets");
            var show_more_elements_navbar_route_table = document.getElementById("show_more_elements_navbar_route_table");
            var show_more_elements_navbar_vpn = document.getElementById("show_more_elements_navbar_vpn");

            var vpc_show_aws = document.getElementById("vpc_show_aws");
            if (node.url != null) {
                icon_menu_shwo_more_infos_element.setAttribute("href", node.url);
            }
            var data = Object.entries(node.data);
            var table = document.createElement("table");

            data.forEach(function(element, index) {
                var cell = document.createElement("tr");
                var cell_key = document.createElement("td");
                var cell_value = document.createElement("td");  
                var label = element[0];
                LabelElement.forEach(function(element) {
                    if (element.name == label) {
                        label = element.label;
                    }
                });
                cell_key.innerHTML = label + " : ";
                cell_value.innerHTML = element[1];
                cell.appendChild(cell_key);
                cell.appendChild(cell_value);
                table.appendChild(cell);
            });

            list_navbar_dropdown_infos_elements.innerHTML = "";
            list_navbar_dropdown_infos_elements.appendChild(table);
            navbar_dropdown_infos_elements.style.display = "flex";
            if (icon_menu_click) {
                icon_menu_click = false;
                show_more_elements_navbar_cloud.style.display = "none";
                show_more_elements_navbar_vpc.style.display = "none";
                show_more_elements_navbar_transit_gateway.style.display = "none";
                show_more_elements_navbar_subnets.style.display = "none";
                show_more_elements_navbar_route_table.style.display = "none";
                show_more_elements_navbar_vpn.style.display = "none";
                if (vpc_show_aws) {
                    vpc_show_aws.style.marginLeft = "90px";
                    vpc_show_aws.style.width = "1800px";
                }
            }
            if (vpc_show_aws) {
                if (vpc_show_aws.style.width != "1400px") {
                    vpc_show_aws.animate([
                        { transform: 'translateX(-400px)' },
                    ], {
                        duration: 150,
                    });
                    setTimeout(function() {
                        vpc_show_aws.style.width = "1400px";
                    }, 150);
                }
            }
        }
      }
    });

myDiagram.addDiagramListener("ObjectContextClicked", function(e) {
    var clicked = e.subject.part;
    if (clicked instanceof go.Node) {
        var node = clicked.data;
        if (node != null) {
            var navbar_dropdown_infos_elements = document.getElementById("navbar-dropdown-infos-elements");
            if (navbar_dropdown_infos_elements != null) {
                var list_navbar_dropdown_infos_elements = document.getElementById("list-navbar-dropdown-infos-elements");
                var data = Object.entries(node.data)
                var table = document.createElement("table");

                data.forEach(function(element, index) {
                    var cell = document.createElement("tr");
                    var cell_key = document.createElement("td");
                    var cell_value = document.createElement("td");  
                    var label = element[0];
                    LabelElement.forEach(function(element) {
                        if (element.name == label) {
                            label = element.label;
                        }
                    });
                    cell_key.innerHTML = label + " : ";
                    cell_value.innerHTML = element[1];
                    cell.appendChild(cell_key);
                    cell.appendChild(cell_value);
                    table.appendChild(cell);
                });

                list_navbar_dropdown_infos_elements.innerHTML = "";
                list_navbar_dropdown_infos_elements.appendChild(table);
                navbar_dropdown_infos_elements.style.display = "flex";
            }
        }
    }
});
var bluegrad = diagram(go.Brush, "Linear", { 0: "#00c3ff46", 1: "#22afda3b" });

myDiagram.groupTemplate = diagram(go.Group, "Auto",
    { deletable: false, layout: makeGroupLayout(), movable: false, isShadowed: true, shadowColor: "#888",  shadowOffset: new go.Point(2, 2),  },
    new go.Binding("position", "xy", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("layout", "width", makeGroupLayout),
    diagram(go.Shape, { fill: bluegrad, stroke: null }),
    diagram(go.Panel, "Vertical",
    { defaultAlignment: go.Spot.Left },
    diagram(go.TextBlock,
        { font: "bold 14pt sans-serif", margin: new go.Margin(5, 5, 0, 5), stroke: "#177592a8", margin: new go.Margin(5, 0, 0, 50) },
        new go.Binding("text")),
    diagram(go.Placeholder, { padding: 5 })
    )
);

var ROUTINGSTYLE = "ToGroup";

function makeGroupLayout() {
    return diagram(go.TreeLayout,  // taken from samples/treeView.html
      {
        alignment: go.TreeLayout.AlignmentStart,
        angle: 0,
        compaction: go.TreeLayout.CompactionNone,
        layerSpacing: 16,
        layerSpacingParentOverlap: 1,
        nodeIndentPastParent: 1.0,
        nodeSpacing: 0,
        setsPortSpot: false,
        setsChildPortSpot: false,
        // after the tree layout, change the width of each node so that all
        // of the nodes have widths such that the collection has a given width
        commitNodes: function() {  // overriding TreeLayout.commitNodes
          go.TreeLayout.prototype.commitNodes.call(this);
          if (ROUTINGSTYLE === "ToGroup") {
            updateNodeWidths(this.group, this.group.data.width || 100);
          }
        }
      });
}

function updateNodeWidths(group, width) {
    if (isNaN(width)) {
      group.memberParts.each(n => {
        if (n instanceof go.Node) n.width = NaN;  // back to natural width
      });
    } else {
      var minx = Infinity;  // figure out minimum group width
      group.memberParts.each(n => {
        if (n instanceof go.Node) {
          minx = Math.min(minx, n.actualBounds.x);
        }
      });
      if (minx === Infinity) return;
      var right = minx + width;
      group.memberParts.each(n => {
        if (n instanceof go.Node) n.width = Math.max(0, right - n.actualBounds.x);
      });
    }
}

function updateNodeHeights(group) {
    var maxy = 0;
    group.memberParts.each(n => {
        if (n instanceof go.Node) {
            maxy = Math.max(maxy, n.actualBounds.y);
        }
    });
    if (maxy === 0) return;
    group.memberParts.each(n => {
        if (n instanceof go.Node) {
            n.height = maxy - n.actualBounds.y;
        }
    });
}

// Calculer la taille du plus grand groupe et l'appliquer à tous les autres
function CalculateSize(node) {
    var maxWidth = 0;
    var maxHeight = 0;

    node.memberParts.each(function(part) {
        if (part instanceof go.Group) {
            CalculateSize(part);
            maxWidth = Math.max(maxWidth, part.data.width);
            maxHeight = Math.max(maxHeight, part.data.height);
        } else {
            maxWidth = Math.max(maxWidth, part.actualBounds.width);
            maxHeight = Math.max(maxHeight, part.actualBounds.height);
        }
    }.bind(this));
    node.data.width = maxWidth;
    node.data.height = maxHeight;
}

var vpc_array = []
var transit_gateway_array = []
var ZonesSubnets = [
    {x: 250, y: 0, group: 1},
    {x: 550, y: 0, group: 2},
    {x: 850, y: 0, group: 3},
    {x: 550, y: 400},
    {x: 250, y: 800},
    {x: 550, y: 800},
]

var ZonesGroups = [
    {loc: "0 0", group: 1},
    {loc: "300 0", group: 2},
    {loc: "600 0", group: 3},
]

function ConstructFirstPartVPCId(vpc_id, account, cloud) {
    var vpc = vpc_array[vpc_id];

    if (!vpc) {
        alert("Le VPC avec l'id " + vpc_id + " n'existe pas");
    }
    nodeDataArray = []
    linkDataArray = []

    var LastidRoutage = "";
    var LastIdEndpoint = "";
    var LastPeeringConnection = "";
    var LastInternetGateway = "";
    var LastNatGateway = "";
    var LastNetworkAlias = "";
    var LastSubnetZone = [];
    var LastLocSubnetY = [];

    var TableRoutage = [];
    var Endpoints = [];
    var PeeringConnections = [];
    var InternetGateways = [];
    var NatGateways = [];
    var Networks = [];
    var SubnetZones = [];

    var array = Object.entries(vpc)
    array.forEach(function(element) {
        if (element[0] == 'table_routages') {
            element.forEach(function(item) {
                if (item != 'table_routages') {
                    var array2 = Object.entries(item)
                    array2.forEach(function(item2) {
                        if (LastidRoutage != item2[1]['id']) {
                            LastidRoutage = item2[1]['id'];
                            TableRoutage.push(item2[1])
                            var node = {
                                key: item2[1]['id'],
                                text: item2[1]['name'],
                                source: "Src/assets/img/aws/Res_Amazon-Route-53_Route-Table_48_Light.png",
                                description: "Nom: " + item2[1]['name'] + "\nId: " + item2[1]['id'] + "\nDestination: " + item2[1]['detination'] + "\nPrivate Gateway: " + item2[1]['private_gateway'] + "\nPropagé: " + item2[1]['propagated'] + "\nStatus" + item2[1]['status'] + "\nCible: " + item2[1]['target'],
                                data: item2[1],
                                loc: "0 150",
                                url: "./informations.php?account="+account+"&cloud="+cloud+"&type=ROUTE_TABLES_ARRAY&id="+item2[1]['id'],
                            }
                            nodeDataArray.push(node)
                        }
                    });
                }
            });
        } else if (element[0] == 'endpoints') {
            element.forEach(function(item) {
                if (item != 'endpoints') {
                    var array2 = Object.entries(item)
                    array2.forEach(function(item2) {
                        if (LastIdEndpoint != item2[1]['endpoint_id']) {
                            LastIdEndpoint = item2[1]['endpoint_id'];
                            Endpoints.push(item2[1])
                            var node = {
                                key: item2[1]['endpoint_id'],
                                text: item2[1]['endpoint_id'],
                                source: "Src/assets/img/aws/Res_Amazon-VPC_Endpoints_48_Light.png",
                                description: "Nom: " + item2[1]['name'] + "\nEndpoint Id: " + item2[1]['endpoint_id'] + "\nVpc Id:" + item2[1]['vpc_id'] + "\nNom du service: " + item2[1]['service_name'] + "\nType: " + item2[1]['endoint_type'] + "\nNetwork Interfaces: " + item2[1]['network_interfaces'] + "\nTable de routage: " + item2[1]['route_tables'] + "\nSubnets: " + item2[1]['subnets'],
                                data: item2[1],
                                loc: "0 200",
                                url: "./informations.php?account="+account+"&cloud="+cloud+"&type=ENDPOINTS_ARRAY&id="+item2[1]['endpoint_id'],
                            }
                            nodeDataArray.push(node)
                        }
                    });
                }
            });
        } else if (element[0] == 'peering_connections') {
            element.forEach(function(item) {
                if (item != 'peering_connections') {
                    var array2 = Object.entries(item)
                    array2.forEach(function(item2) {
                        if (LastPeeringConnection != item2[1]['name']) {
                            LastPeeringConnection = item2[1]['name'];
                            PeeringConnections.push(item2[1])
                            var node = {
                                key: item2[1]['peering_connection_id'],
                                text: item2[1]['name'],
                                source: "Src/assets/img/Res_Amazon-VPC_Peering-Connection_48_Light.png",
                                description: "Nom: " + item2[1]['name'] + "\nPeering Connection Id: " + item2[1]['peering_connection_id'] + "\nMain: " + item2[1]['main'] + "\nStatus: " + item2[1]['status'] + "\nVpc Id: " + item2[1]['vpc_id'] + "\nTable de Routage: " + item2[1]['route_table_id'] + "\nRequester CIDR: " + item2[1]['requester_cidr'] + "\nRequester Owner: " + item2[1]['requester_owner_id'] + "\nRequester VPC: " + item2[1]['requester_vpc'] + "\nAccepter CIDR: " + item2[1]['accepter_cidr'] + "\nAccepter Owner: " + item2[1]['accepter_owner_id'] + "\nAccepter VPC: " + item2[1]['accepter_vpc'] + "\nAssocié avec: " + item2[1]['associated_with'],
                                data: item2[1],
                                loc: "0 250",
                                url: "./informations.php?account="+account+"&cloud="+cloud+"&type=PEERING_CONNECTIONS_ARRAY&id="+item2[1]['peering_connection_id'],
                            }
                            nodeDataArray.push(node)
                        }
                    });
                }
            });
        } else if (element[0] == 'internet_gateways') {
            element.forEach(function(item) {
                if (item != 'internet_gateways') {
                    var array2 = Object.entries(item)
                    array2.forEach(function(item2) {
                        if (LastInternetGateway != item2[1]['name']) {
                            LastInternetGateway = item2[1]['name'];
                            InternetGateways.push(item2[1])
                            var node = {
                                key: item2[1]['internet_gateway_id'],
                                text: item2[1]['name'],
                                source: "Src/assets/img/aws/Res_Amazon-VPC_Internet-Gateway_48_Light.png",
                                description: "Nom: " + item2[1]['name'] + "\nId: " + item2[1]['internet_gateway_id'] + "\nOwner: " + item2[1]['owner'] + "\nStatus: " + item2[1]['state'] + "\nVpc Id: " + item2[1]['vpc_id'],
                                data: item2[1],
                                loc: "0 50",
                                url: "./informations.php?account="+account+"&cloud="+cloud+"&type=INTERNET_GATEWAYS_ARRAY&id="+item2[1]['internet_gateway_id'],
                            }
                            nodeDataArray.push(node)
                        }
                    });
                }
            });
        } else if (element[0] == 'nat_gateways') {
            element.forEach(function(item) {
                if (item != 'nat_gateways') {
                    var array2 = Object.entries(item)
                    array2.forEach(function(item2) {
                        if (LastNatGateway != item2[1]['nat_gateway_id']) {
                            LastNatGateway = item2[1]['nat_gateway_id'];
                            NatGateways.push(item2[1])
                            var node = {
                                key: item2[1]['nat_gateway_id'],
                                text: item2[1]['nat_gateway_id'],
                                source: "Src/assets/img/aws/Res_Amazon-VPC_NAT-Gateway_48_Light.png",
                                description: "Nom: " + item2[1]['name'] + "\nNat Gateway Id: " + item2[1]['nat_gateway_id'] + "\nConnectivity Type: " + item2[1]['connectivity_type'] + "\nCreated: " + item2[1]['created'] + "\nDeleted: " + item2[1]['deleted'] + "\nElastic Ip Adress: " + item2[1]['elastic_ip_address'] + "\nNetwork Interface Id: " + item2[1]['network_interface_id'] + "\nPrivate Ip Adresse: " + item2[1]['private_ip_address'] + "\nStatus: " + item2[1]['state'] + "\nMessage Status: " + item2[1]['state_message'] + "\nSubnet: " + item2[1]['subnet'] + "\nVPC: " + item2[1]['vpc'],
                                data: item2[1],
                                loc: "0 300",
                                url: "./informations.php?account="+account+"&cloud="+cloud+"&type=NAT_GATEWAYS_ARRAY&id="+item2[1]['nat_gateway_id'],
                            }
                            nodeDataArray.push(node)
                        }
                    });
                }
            });
        } else if (element[0] == 'network') {
            var LastIndex3 = null;
            var LastIndex2 = null;
            element.forEach(function(item) {
                if (item != 'network') {
                    var array2 = Object.entries(item)
                    array2.forEach(function(item2, index2) {
                        if (LastNetworkAlias != item2[1]['network_id']) {
                            LastNetworkAlias = item2[1]['network_id'];
                            Networks.push(item2[1])
                            var HasFindZone = false;
                            SubnetZones.forEach(function(item3) {
                                if (item3['zone_disponibility_id'] == item2[1]['zone_disponibility_id']) {
                                    HasFindZone = true;
                                }
                            });
                            if (HasFindZone == false) {
                                SubnetZones.push({
                                    zone_disponibility_id: item2[1]['zone_disponibility_id'],
                                })
                            }

                            SubnetZones.forEach(function(item3, index3) {

                                var indexPlusOne = index3+1
                                if (LastIndex2 != indexPlusOne && !LastSubnetZone[indexPlusOne]) {
                                    LastIndex2 = indexPlusOne;
                                    LastSubnetZone[indexPlusOne] = indexPlusOne;
                                    var node = {
                                        isGroup: true, 
                                        key: indexPlusOne, 
                                        text: "Availability Zone", 
                                        loc: ZonesGroups[index3].loc,
                                        width: 250,
                                    }
                                    nodeDataArray.push(node)
                                }

                                if (item2[1]['zone_disponibility_id'] == item3['zone_disponibility_id']) {
                                    var loc = "" + ZonesSubnets[index3].x + " " + ZonesSubnets[index3].y + "";
                                    var IsChanngingIndex = false;
                                    var stroke = "black";
                                    if (LastIndex3 != index3 && !LastLocSubnetY[index3]) {
                                        LastIndex3 = index3;
                                        LastLocSubnetY[index3] = ZonesSubnets[index3].y;
                                        IsChanngingIndex = true;
                                    }

                                    if (index2 > 0 && !IsChanngingIndex) {
                                        LastLocSubnetY[index3] = LastLocSubnetY[index3] + 35;
                                        loc = "" + ZonesSubnets[index3].x + " " + LastLocSubnetY[index3] + "";
                                    }

                                    if (item2[1]['name'].search("Pub") != -1 || item2[1]['name'].search("pub") != -1 || item2[1]['name'].search("PUB") != -1 || item2[1]['name'].search("public") != -1) {
                                        stroke = "green";
                                    } else if (item2[1]['name'].search("Pri") != -1 || item2[1]['name'].search("INT") != -1 || item2[1]['name'].search("PRI") != -1 || item2[1]['name'].search("EXT") != -1) {
                                        stroke = "blue";
                                    }

                                    var node = {
                                        key: item2[1]['network_id'],
                                        text: item2[1]['network_id'] + " - " + item2[1]['zone_disponibility'],
                                        source: "Src/assets/img/aws/Res_Amazon-VPC_NAT-Gateway_48_Light.png",
                                        description: "Nom: " + item2[1]['name'] + "\nNetwork Id: " + item2[1]['network_id'] + "\nVpc Id: " + item2[1]['vpc_id'] + "\nCIDR IPV4: " + item2[1]['cidr_ipv4'] + "\nIPV4 Available: " + item2[1]['ipv4_available'] + "\nAcl Network: " + item2[1]['acl_network'] + "\nAuto Private IPV4: " + item2[1]['auto_ipv4_private'] + "\nAuto Public IPV4: " + item2[1]['auto_ipv4_public'] + "\nDefault Subnet: " + item2[1]['default_subnet'] + "\nTable de Routage" + item2[1]['table_routage'] + "\nZone Disponibilité: " + item2[1]['zone_disponibility'] + "\nZone Disponibilité Id: " + item2[1]['zone_disponibility_id'],
                                        data: item2[1],
                                        loc: loc,
                                        group: ZonesSubnets[index3].group,
                                        stroke: stroke,
                                        url: "./informations.php?account="+account+"&cloud="+cloud+"&type=NETWORK_ARRAY&id="+item2[1]['network_id'],
                                    }
                                    nodeDataArray.push(node)
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    var transit_gateway = TransitGateway
    var transit_gateway_array = []
    var array2 = Object.entries(transit_gateway)
    array2.forEach(function(element) {
        if (element[1]['gateway_attachments']) {
            var array3 = element[1]['gateway_attachments']
            array3.forEach(function(element2) {
                if (element2['resource_ID'] == vpc_id) {
                    var node = {
                        key: element[0],
                        text: element[0],
                        source: "Src/assets/img/aws/Arch_AWS-Transit-Gateway_64@5x.png",
                        description: "Nom: " + element2['name'] + "\nTransit Gateway Attachments Id" + element2['transit_gateway_attachment_ID'] + "\nTransit Gateway Id" + element2['transit_gateway_ID'] + "\nId Table Routage Associé: " + element2['association_route_table_ID'] + "\nStatus Associé: " + element2['association_state'] + "\nResource ID: " + element2['resource_ID'] + "\nResource Type: " + element2['resource_type'] + "\nStatus: " + element2['state'],
                        data: element2,
                        loc: "0 100",
                        url: "./informations.php?account="+account+"&cloud="+cloud+"&type=TRANSIT_GATEWAY_ATTACHMENTS_ARRAY&id="+element2['transit_gateway_attachment_ID'],
                    }
                    transit_gateway_array.push(element[0])
                    nodeDataArray.push(node)
                }
            });
        }
    });

    var node = {
        key: "internet",
        text: "internet",
        source: "Src/assets/img/aws/Arch_Amazon-Virtual-Private-Cloud_64@5x.png",
        loc: "0 0",
    }
    nodeDataArray.push(node)

    nodeDataArray.forEach(function(element) {
        transit_gateway_array.forEach(function(element2) {
            if (String(element.key).includes("rtb")) {
                var link = {
                    from: element.key,
                    to: element2,
                    color: "black",
                    thickness: 2,
                }
                linkDataArray.push(link)
            }
            if (String(element.key).includes("igw")) {
                var link = {
                    from: element2,
                    to: element.key,
                    color: "black",
                    thickness: 2,
                }
                linkDataArray.push(link)
            }
        });
        InternetGateways.forEach(function(element2) {
            if (String(element.key).includes("internet")) {
                var link = {
                    from: element.key,
                    to: element2['internet_gateway_id'],
                    color: "black",
                    thickness: 2,
                }
                linkDataArray.push(link)
            }
        });
    });

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

function ConstructFirstPartTransitGatewayId(transit_gateway_id) {
    var transit_gateway = transit_gateway_array[transit_gateway_id];
    nodeDataArray = []
    linkDataArray = []

    if (!transit_gateway) {
        alert("La Transit Gateway avec l'id " + transit_gateway_id + " n'existe pas");
    }

    var LastIdTransitGatewayAttachments = "";
    var array = Object.entries(transit_gateway)
    array.forEach(function(element) {
        if (element[0] == 'gateway_attachments') {
            element.forEach(function(item) {
                if (item != 'gateway_attachments') {
                    var array2 = Object.entries(item)
                    array2.forEach(function(item2) {
                        if (LastIdTransitGatewayAttachments != item2[1]['transit_gateway_attachment_ID']) {
                            LastIdTransitGatewayAttachments = item2[1]['transit_gateway_attachment_ID'];
                            console.log(item2[1]['transit_gateway_attachment_ID'])
                            var node = {
                                key: item2[1]['transit_gateway_attachment_ID'],
                                text: item2[1]['name'],
                                source: "Src/assets/img/aws/Arch_AWS-Transit-Gateway_64@5x.png",
                                description: "Nom: " + item2[1]['name'] + "\nTransit Gateway Attachments Id" + item2[1]['transit_gateway_attachment_ID'] + "\nTransit Gateway Id" + item2[1]['transit_gateway_ID'] + "\nId Table Routage Associé: " + item2[1]['association_route_table_ID'] + "\nStatus Associé: " + item2[1]['association_state'] + "\nResource ID: " + item2[1]['resource_ID'] + "\nResource Type: " + item2[1]['resource_type'] + "\nStatus: " + item2[1]['state'],
                                data: item2[1],
                                url: "./informations.php?&account="+account+"&cloud="+cloud+"&type=TRANSIT_GATEWAY_ATTACHMENT_ARRAY&id="+item2[1]['transit_gateway_attachment_ID'],
                            }
                            nodeDataArray.push(node)
                        }
                    });
                }
            });
        }
    });

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

function Construct(vpc, transit_gateway, home_page, account, cloud) {
    VPC = vpc
    TransitGateway = transit_gateway
    var array = Object.entries(vpc)
    array.forEach(function(element) {
        element.forEach(function(item) {
            vpc_array[item['vpc_id']] = element[1];
            if (home_page) {
                if (item['vpc_id'] != undefined) {
                    var node = {
                        key: item['vpc_id'],
                        text: item['vpc'],
                        source: "Src/assets/img/aws/Arch_Amazon-Virtual-Private-Cloud_64@5x.png",
                        description: "Souscription: " + item['souscription'] + "\nVPC: " + item['vpc'] + "\nVPC ID:" + item['vpc_id'] + "\nRegion: " + item['region'] + "\nCIDR: " + item['cidr'] + "\nACL: " + item['id_acl'] + "\nTable de routage: " + item['id_table_routage'],
                        data: item,
                        url: "./informations.php?account="+account+"&cloud="+cloud+"&type=VPC_ARRAY&id="+item['vpc_id'],
                    }
                    nodeDataArray.push(node)
                }
            }
        });
    });

    var array2 = Object.entries(transit_gateway)
    array2.forEach(function(element) {
        element.forEach(function(item) {
            transit_gateway_array[item['gateway']] = element[1];
            if (home_page) {
                if (item['gateway'] != undefined) {
                    var node = {
                        key: item['gateway'],
                        text: item['gateway'],
                        source: "Src/assets/img/aws/Arch_AWS-Transit-Gateway_64@5x.png",
                        description: "Nom: " + item['name'] + "\nGateway: " + item['gateway'] + "\nOwner" + item['owner'] + "\nStatus: " + item['state'],
                        data: item,
                        url: "./informations.php?account="+account+"&cloud="+cloud+"&type=TRANSIT_GATEWAY_ARRAY&id="+item['gateway'],
                    }
                    nodeDataArray.push(node)
                }
            }
        });
    });

    if (home_page) {
        myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    }
}