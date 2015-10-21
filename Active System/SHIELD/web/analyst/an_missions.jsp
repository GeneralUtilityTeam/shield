<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>SHIELD: Decision Support System</title>

        <!--Bootstrap-->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        <!--Data Table-->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.9/css/dataTables.bootstrap.min.css">
        <script src="https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.9/js/dataTables.bootstrap.min.js"></script>

        <!--Layout-->
        <link href="css/layout.css" rel="stylesheet" type="text/css">
        <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>

        <!--General Scripts-->
        <script src="js/util.js"></script>
        <script  src="js/alert.js"></script>

        <!--Page Script-->
        <script src="analyst/pagescripts/an_missions.js"></script>
        <script>
            var userFullName = '<%=session.getAttribute("userFullName")%>';
        </script>
        <style>
            @media print{
                .print{
                    width: 100%;
                    height:100%;
                }

            }
            .container{
                width:70%;
                height:95%;
                margin: auto;
                font-family: "Times New Roman", Times, serif;
                display:none;
            }
            .po{
                border-collapse:collapse;
                display:block;
                padding-bottom:5px;
                padding-top: 10px;
                font-size: 12pt;
                text-align:left;

            }
            .spo{
                border-collapse:collapse;
                display:block;
                padding-bottom:3px;
                padding-left: 30px;
                padding-top: 3px;
                font-size: 11pt;
                text-align:left;

            }


            .table-print{
                border-collapse: collapse;
                width: 100%;
                border: 1px solid #000000;
                padding-bottom: 10px;
            }
            .text-table-print{

                width: 100%;
                padding-bottom: 20px;
                font-family: "Times New Roman", Times, serif;
            }
            .carver-row{
                border-collapse: collapse;
                background-color: #FFFFFF;
                height: 20px;
                width: 100%;
                border: 1px solid;
            }
            .po-row{
                width: 100%;
                border: transparent;
            }

            .supporting-label{
                display: block;
                text-align:left;
                padding-top: 10px;
                padding-bottom: 10px;
                font-size: 13pt;
                font-weight: 700;
                width: 100%;
                font-family: "Times New Roman", Times, serif;
            }

            .supporting-info{
                display: block;
                text-align:center;
                padding-top: 30px;
                padding-bottom: 10px;
                font-size: 12pt;
                font-weight: 700;
                width: 100%;
                font-family: "Times New Roman", Times, serif;
            }

            .labels{
                display: block;
                text-align:left;
                padding-top: 10px;
                padding-bottom: 2px;
                font-size: 12pt;
                font-weight: 700;
                width: 100%;
                font-family: "Times New Roman", Times, serif;
            }

            .paragraphs{
                display: block;
                text-align:justify;
                padding-top: 2px;
                word-wrap: break-word;
                padding-bottom: 3px;
                margin-right:10px;
                padding-left: 15px;
                font-size: 11pt;
                font-family: "Times New Roman", Times, serif;
            }

            .cv{
                font-size: 12pt;
                font-weight:bold;
                width: 30%;
                font-family: "Times New Roman", Times, serif;

            }
            .CM{
                border-collapse: collapse;
                border: 1px solid;
                font-size: 11pt;
                font-family: "Times New Roman", Times, serif;
                text-align: center;
                width: 10%;
            }
            .criticalreq{
                background-color: #F5F5F5;
                text-align: center;
                font-weight:700;
                font-size: 13pt;
                width:100%;
                height: 30px;
                font-family: "Times New Roman", Times, serif;
            }
            .cvref{
                border-collapse:collapse;
                display:block;
                padding-bottom:3px;
                padding-left: 45px;
                padding-top: 3px;
                font-size: 10pt;
                text-align:left;
            }

            #mission-title{
                display: block;
                text-align:center;
                padding-top: 10px;
                padding-bottom: 20px;
                font-size: 18pt;
                font-weight: 700;
                width: 100%;
                font-family: "Times New Roman", Times, serif;
            }
        </style>
    </head>
    <body onload="initialize()">

        <!--Navigation Bar-->
        <script src="js/navigation.js"></script>

        <div id="container-fluid">
            <div id="content-shield" style="border-top: none;">
                <h4 style="font-weight: 700; text-align: center;">ALL MISSIONS</h4>
                <table id="mission-table" class="table table-bordered table-hover list-table" width="100%">
                    <thead style="background-color: #D3D3D3;">
                        <tr>
                            <th width="20%">Mission Title</th>
                            <th width="50%">Area of Operation</th>
                            <th width="20%">Progress</th>
                            <th width="10%">Print Report</th>
                        </tr>
                    </thead>
                    <tbody id="mission-table-body">

                    </tbody>
                </table>
            </div>
        </div>

        <!--Notification Alert-->
        <div class="alert-messages text-center">
        </div>


        <!-- Print Report Area -->
        <div id="container"class="print container">
            <label id="mission-title">Psychological Operations Plan </label>
            <label class="labels" id="situation-label">1. Situation: </label>
            <p class="paragraphs" id="situation-content">a.	Hostile. The insurgents in Barangay Mahirap has greatly established themselves by successfully organizing a Barangay revolutionary commitee (BRC). They continuously expand their armed and front organization through the use of arouse-organiza-mobilize (AOM) strategy with the poor community as their target capitalizing on their dire social and economic situation. The threat's armed group is capable of conducting military actions against government forces and establishments such as raids, harrassments, extortions, arson and other hostile actions. </p>
            <label class ="labels" id="objective-label">2. Mission: </label>
            <p class="paragraphs" id="objective-content">1203rd Infantry Brigade conducts Civil-Military Operations in support of 12ID Peace and Development Operations at the provinces of Mayaman and Masagana on 01 August 2011 to win the peace in order to establish a physically and psychologically secure environment conducive to socio-economic development.</p>
            <label class ="labels" id="execution-label">3. Execution: </label>
            <p class="paragraphs" id="execution-content">a.	Scheme of PSYOPS. 

                POT 1 will conduct PSYOPS by executing series that support each supporting PSYOPS Objectives. (See TAB A)
                b.	Tasks to Subordinate Units. 

                1)	Plans and Programs Team
                a.	Responsible for th formulation of PSYOPS programs in support of 1st IBâs mission.
                b.	Responsible for the development of PSYOP series.
                c.	Responsible for all contracts for airtime of audio and audiovisual products. 
                d.	Responsible for the coordination with Bde S7 and CMO Platoon for all PSYOPS requirements.
                e.	Responsible for advising the commanders on counter-propaganda  measures.

                2)	Target Audience Analyst Team 
                a.	Responsible for the analysis of target audiences
                b.	Responsible for the analysis of threat propaganda materials.
                c.	Responsible for coordination with the Bn S2 for all information requirements. 

                3)	Product Development Team 
                a.	Responsible for the development of PSYOPS products for all PSYOPS programs. 
                b.	Responsible for the development counter-propaganda  products and counterpropaganda measures. 

                c.	Coordinating Instructions. 

                1)	Themes to stress:
                â¢	Military will act decisively in response to attacks upon its forces, installations, or civilian agencies working in the area.
                â¢	Continued violence will not accomplish the objective of any organization or group.
                â¢	Commitment to peace is in the best long-term interests of the area.
                â¢	Those who advocate continued violence are acting against the interest of the people.

                2)	Themes to avoid:
                â¢	Any theme that implies support for or legitimizes the threat groups.
                â¢	Minority group independence.
                â¢	Any ultimatum that cannot be immediately carried out.
                â¢	Portrayal of favoritism or special treatment for a particular group.

                3)	Land transportation will be used in the distribution of PSYOPS products.
                4)	Captured or collected propaganda materials will be submitted to the Analyst Team for immediately analysis.
                5)	Additional POs, SPOs, PTAs, TAs, MOEs, can be added through change to this appendix as necessary.

            </p>
            <label class ="labels" id="admin-and-logistics-label">4. Admin and Logistics: </label>
            <p class="paragraphs" id="admin-and-logistics-content">a.	General  

                1)	BSA : Primary at 1203rd BDE HQs
                2)	Bn Trains : Bn Hqs
                3)	Priority of resources shall be the production of PSYOPS products.


                b.	Material and Services

                1)	Supply
                a.	Class I : Initial one (1) month ration. 
                b. Class III - POL requirements initially shouldered by 1203rd BDE
                (Diesel-200Li, V95-200 Li) 
                c.	Class V : to be provided by supported unit.

                2)	Transportation
                a.	To be provided by supported units.
                b.	Use of civilian vehicles is authorized.

                3)	Medical Evacuation and Hosp : supported unitâs SOP.
                4)	Personnel - No personnel replacement for the duration of the operation.
                5)	Miscellaneous - Other peculiar requirements needed to support the operations for submission to the 1st Bn and CMO BN.
            </p>
            <label class ="labels" id="command-and-signal-label">5. Command and Signal: </label>
            <p class="paragraphs" id="command-and-signal-content">a.	Command and Control

                1)	Commander 1st IB is the overall commander during this operation.
                2)	PSYOPS team commander is Cpt Magsaysay.
                3)	Succession of Command : follow SOP. 

                b.	Signal

                1)	Radio Net Diagram : supported unit radio net.
                2)	Use of Cellular phone is encouraged.
                3)	Countersign : supported unit SOP.
            </p>
            <div id="report-content">
                <label class="supporting-info">PSYCHOLOGICAL OPERATIONS OBJECTIVE</label>

                <table class="text-table-print">
                    <thead>
                        <tr class="po-row"><td class="po"><strong>PO1:</strong> Submit the system</td></tr>
                        <tr><td class="spo"><strong>SPO1.</strong> Make sure there are no errors</td></tr>
                        <tr><td class="cvref"><strong>CV:</strong> Error, This, Shit</td></tr>
                    </thead>
                </table>
                
                <label class="supporting-label">Supporting Information: </label>
                <label class="supporting-info">CARVER METHODOLOGY</label>
                <table class="table-print">
                    <thead>
                        <tr class="carver-row"><td class="criticalreq" colspan="8">Critical Requirement 1</td></tr>
                        <tr class="carver-row">
                            <td class="cv">Critical Vulnerability</td>
                            <td class="CARVER">C</td>
                            <td class="CARVER">A</td>
                            <td class="CARVER">R</td>
                            <td class="CARVER">V</td>
                            <td class="CARVER">E</td>
                            <td class="CARVER">R</td>
                            <td class="CARVER">Total</td>
                        </tr>
                        <tr class="carver-row">
                            <td class="cv">Fuck</td>
                            <td class="CARVER">10</td>
                            <td class="CARVER">7</td>
                            <td class="CARVER">8</td>
                            <td class="CARVER">4</td>
                            <td class="CARVER">5</td>
                            <td class="CARVER">8</td>
                            <td class="CARVER">56</td>
                        </tr>

                    </thead>
                </table>
                <label class="supporting-info">THREAT COURSES OF ACTION</label>
                <table class="text-table-print">
                    <thead>
                        <tr class="po-row"><td class="po"><strong>Propaganda: </strong>The threat will take advantage of this: </td></tr>
                        <tr><td class="spo"><strong>From: </strong> Date Today</td></tr>
                        <tr><td class="spo"><strong>To: </strong> Date Tomorrow</td></tr>
                        <tr><td class="spo"><strong>Location: </strong> De La Salle University Manila</td></tr>
                    </thead>
                </table>

            </div>

        </div>
    </body>
</html>
