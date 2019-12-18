<html>
    <head>

        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">

        <meta charset="utf-8">

        <link rel="stylesheet" type="text/css" href="css/style.css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">

    </head>

    <body>
        <div class="split left" style="margin-left: 4px;">

            <label>
                Pickup Location 
                <span>:</span>
            </label>
                <input style="border-radius: 15px; border: 1px solid black;width: 250px;height: 28px;text-align: center;margin-left: 15px" placeholder="Pickup Location" type="text"  name="address"  onFocus="initializeAutocomplete()" id="locality" ><br><br>
            <label>
                Drop Location 
                <span style="margin-left: 10px;">:</span>
            </label>
            <div class="inc">
                <span style="margin-left: 1px;"><button id="append">+</button></span>
                <input style="border-radius: 25px; border: 1px solid black;width: 180px;height: 28px;text-align: center;margin-left: 50px; " onFocus="call1()" data-ids="2" type="text" name="drop_location" id="drop_location2" placeholder="Drop Location"><br>
            </div>
            <p>
                Distance 
                <span style="margin-left: 46px;">: </span>
                <span id="dist" style="margin-left: 22px;"> </span>
            </p>

        </div>

        <div class="vl"></div>

        <div class="split2 right">
            <div id="googleMap" style="width:100%;height:100%;margin-top: -21px;"></div>
        </div>

        <script src="js/google_map_location.js"></script>

        <script type="text/javascript">


                // Functions to Call autocomplete methods for Each Fields
                function call1()
                {
                    var id= $("#drop_location2").data('ids');
                    initializeAutocompletee(id);
                }

                function call3()
                {
                    var id= $("#drop_location3").data('id');
                    initializeAutocompletee(id);
                }

                function call4()
                {
                    var id= $("#drop_location4").data('id');
                    initializeAutocompletee(id);
                }

                function call5()
                {
                    var id= $("#drop_location5").data('id');
                    initializeAutocompletee(id);
                }

                // Functions to delete the stoping Locations

                function deleteData3()
                {
                    var id= $("#drop_loc3").data('id');
                    deletes(id);
                }

                function deleteData4()
                {
                    var id= $("#drop_loc4").data('id');
                    deletes(id);
                }

                function deleteData5()
                {
                    var id= $("#drop_loc5").data('id');
                    deletes(id);
                }


                // function to delete the corressponding location array element in the array

                function deletes(index)
                {
                    for (var i = 0; i < dropdata.length; i++) 
                    {
                        var array = dropdata[i];
                        console.log(index);
                        var n = array.includes(index);
                        if(n)
                        {
                            dropdata.splice(i,1);
                            del=true;
                        }
                    }
                    pickup();
                    return false;
                }

                // Function to append new Drop locations into the file

             jQuery(document).ready( function () {
                    $("#append").click( function(e) {

                    var count = $(".inc").children().length;

                    if(count <= 5 )
                    {
                        $(".inc").append('<div id="des" class="controls" style="padding : 2px;">\
                            <button data-id="'+count+'" onclick="deleteData'+count+'()" id="drop_loc'+count+'" class="remove_this">x</button>\
                            <input class="new" onFocus="call'+count+'()" style="border-radius: 25px;border: 1px solid black;width: 180px;height: 28px;text-align: center;margin-left: 50px;" type="text" name="drop_location" data-id="'+count+'" id="drop_location'+count+'" placeholder="Drop Location">\
                            <br>\
                        </div>');
                    }
                    else
                    {
                        event.preventDefault();
                    }
                    return false;
                    });

                // Function to remove the multiple droplocation field 

                jQuery(document).on('click', '.remove_this', function() {
                    jQuery(this).parent().remove();
                    return false;
                    });
                $("input[type=submit]").click(function(e) {
                  e.preventDefault();
                  $(this).next("[name=textbox]")
                  .val(
                    $.map($(".inc :text"), function(el) {
                      return el.value
                    }).join(",\n")
                  )
                })
              });              
        </script>

<!--         script to load map api     -->

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsxnyCpmnavMzyK6L-KUNFG5wtOgNVgnM&libraries=places&callback=initializeAutocomplete"
        async defer></script>
    </body>

</html>
