

//########################################################################
//                          Funktioner
//########################################################################

// Perodisk system på dansk og andre sprog:
// http://www.ptable.com/?lang=da

// JQuery-ui resources:
// https://jqueryui.com/resources/demos/droppable/revert.html


var JsonObj;

var Names;
var NameArray = [];

var DummyElement = '<div class="DummyElement"></div>';

var ElementDummyNumbers = "_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_21_22_23_24_25_26_27_28_29_30_39_40_41_42_43_44_45_46_47_48_";

function ElementBox(AtomNum, AtomSymbol, AtomName, AtomWeight){   
    var HTML = '<div class="ElementBox draggable">' + 
                    '<div class="AtomNum">' + AtomNum + '</div>' +
                    '<div class="AtomSymbol">' + AtomSymbol + '</div>' +
                    '<div class="AtomName">' + AtomName + '</div>' +
                    '<div class="AtomWeight">' + AtomWeight + '</div>' +
                '</div>';
    return HTML;
}

function AjaxCallback(JSONdata){
    console.log("JsonObj - AjaxCallback: " + JSON.stringify(JSONdata));
}

function loadData(url) {
    $.ajax({
        url: url,
        // contentType: "application/json; charset=utf-8",  // Blot en test af tegnsaettet....
        dataType: 'json', // <------ VIGTIGT: Saadan boer en angivelse til en JSON-fil vaere! 
        // dataType: 'text', // <------ VIGTIGT: Pga. ???, saa bliver vi noedt til at angive JSON som text. 
        async: false, // <------ VIGTIGT: Sikring af at JSON hentes i den rigtige raekkefoelge (ikke asynkront). 
        success: function(data, textStatus, jqXHR) {

            console.log("data: " + JSON.stringify(data));
            JsonObj = JSON.parse(JSON.stringify(data));
            console.log("JsonObj 1 : " + JSON.stringify(JsonObj));

            AjaxCallback(JsonObj);

            for(var key in data){
                console.log("JsonObj[key].name: " + JsonObj[key].name);
                NameArray.push( JsonObj[key].name );
            }

            console.log("NameArray 1: " + NameArray);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error!!!\njqXHR:" + jqXHR + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
        }
    });

}


function MakePeriodicTable(JsonObj){
    var Z = 0;
    var x = 0;
    var HTML = "";
    for (var r = 1; r <= 7; r++) {
        HTML += '<div class="row">';
        for (var i = 1; i <= 18; i++) {
            ++x;
            if (ElementDummyNumbers.indexOf( "_"+String(x)+"_" ) !== -1){
                HTML += DummyElement;
            } else {
                if (Z < 18){ // Midlertidig if-else-konstruktion:
                    console.log("Z: " + Z + ", JsonObj[Z].sym: " + JsonObj[Z].Z);
                    var AtomNum = String(JsonObj[Z].Z);
                    var AtomSymbol = JsonObj[Z].sym;
                    var AtomName = JsonObj[Z].name;
                    var AtomWeight = String(Math.round(10000*JsonObj[Z].A)/10000);
                    HTML += ElementBox(AtomNum, AtomSymbol, AtomName, AtomWeight);
                    ++Z;
                } else {
                    HTML += ElementBox("34", "X", "Xxxx", "34");
                }
            }
        };
        HTML += '</div>';
    };
    $(".PeriodicTableWrapper").append(HTML);
}


function FontSizeScaler(FontSizeStr, LineHeight, Selector){
    var FontSizeNum = parseInt(FontSizeStr.replace(/px/g, ''));
    var NativeWindowWidth = 1425;   // At WindowWidth = 1426px the .ElementBox font-size = 11px, and scaling linarly.
    var WindowWidth = $( window ).width();
    var Ratio = Math.round(1000*( WindowWidth/NativeWindowWidth ))/1000; // Rounded to 3 digit precision.

    $( Selector ).css("font-size", String(FontSizeNum*Ratio)+"px");

    // Ajust line-height
    // $( Selector ).css("line-height", String(parseInt(LineHeight)*Math.pow(1,Ratio));
    console.log("Ratio : " + Ratio);
    
    console.log("Ratio : " + Ratio);
    console.log("ElementBoxFontSizeNum : " + FontSizeNum);
}


function CreateNumberDivs(Min, Max, Class){
    var HTML = "";
    for (var i = Min; i <= Max; i++) {
        HTML += '<div class="'+Class+'">' + i + '</div>';
    };
    return HTML;
}


function SetAcceptedElements(AtomNumOk){
    $(".ElementBox").each(function( index, element ) {
        var AtomNum = parseInt($(".AtomNum", element).text());
        console.log("AtomNum: " + AtomNum);
        if(AtomNumOk == AtomNum){
            $(element).addClass("Elem_OK");
        }
    });
}

function SetAcceptedNumbers(NumOk, Selector, Class_OK){
    $(Selector).each(function( index, element ) {
        var Num = parseInt($(element).text());
        console.log("Num: " + Num);
        if(NumOk == Num){
            $(element).addClass(Class_OK);
        }
    });
}


//########################################################################
//                        Run code....
//########################################################################


$( document ).ready(function() {


    console.log("JsonObj: " + JSON.stringify(JsonObj));

    console.log("NameArray 2: " + NameArray);

    MakePeriodicTable(JsonObj);

    $(".IndexWrapper").html(CreateNumberDivs(1, 5, "IndexNum draggable"));  
    $(".ChargeWrapper").html(CreateNumberDivs(-4, 1, "ChargeNum draggable"));

    SetAcceptedElements(1);
    SetAcceptedNumbers(1, ".IndexNum", "Index_OK");
    SetAcceptedNumbers(-4, ".ChargeNum", "Char_OK");

    // Get CSS font-sizes
    var AtomSymbolFontSizeStr = $( ".AtomSymbol" ).css("font-size");
    var ElementBoxFontSizeStr = $( ".ElementBox" ).css("font-size");

    // Get CSS line-height
    var LineHeight = $( ".ElementBox" ).css("line-height");


    // Naar vinduet loader scales elementerne:
    $(window).load(function () {
        // Scale the height on all ElmentBox
        $( ".ElementBox" ).height( 4/3*$( ".ElementBox" ).width() );

        // Scale the height on all small and large boxes
        $( ".lbox" ).height( $( ".lbox" ).width() );
        $( ".xlbox" ).height( $( ".xlbox" ).width() );
        $( ".sbox" ).height( $( ".sbox" ).width() );

        FontSizeScaler(AtomSymbolFontSizeStr, LineHeight, ".AtomSymbol, .NumberHeading");
        FontSizeScaler(ElementBoxFontSizeStr, LineHeight, ".ElementBox, .IndexNum, .ChargeNum");

        console.log("WindowWidth: " + $( window ).width());

        // $( ".ElementBox" ).css( "font-size", String(50)+"%" );
    });

    // Naar vinduet resizes rescales elementerne:
    $(window).resize(function () {
        // Scale the height on all ElmentBox
        $( ".ElementBox" ).height( 4/3*$( ".ElementBox" ).width() );

        // Scale the height on all small and large boxes
        $( ".lbox" ).height( $( ".lbox" ).width() );
        $( ".xlbox" ).height( $( ".xlbox" ).width() );
        $( ".sbox" ).height( $( ".sbox" ).width() );

        FontSizeScaler(AtomSymbolFontSizeStr, LineHeight, ".AtomSymbol, .NumberHeading");
        FontSizeScaler(ElementBoxFontSizeStr, LineHeight, ".ElementBox, .IndexNum, .ChargeNum");
    });


    $( document ).on('mousedown', ".ElementBox", function(event){
        // $(".AtomNum, .AtomName, .AtomWeight", this).css("display", "none");
        // // $(".AtomNum, .AtomName, .AtomWeight", this).css("color", "#FFF");
        // $(".AtomSymbol", this).css("font-size", "400%");
    });


    $( ".draggable" ).draggable({ 
        revert: 'invalid'  // Makes the draggable revert back if does not have class "Elem_OK", "Coeff_OK", "Char_OK" or "Index_OK". 
    });

    $( ".DropElement" ).droppable({
        accept: ".Elem_OK",
        drop: function( event, ui ) {
            $( this ).addClass( "DropHighlight" );
            // console.log("event: " + JSON.stringify(event));
            // console.log("ui: " + JSON.stringify(ui));
        }
    });
    $( ".DropCoeff" ).droppable({
        accept: ".Coeff_OK",
        drop: function( event, ui ) {
            $( this ).addClass( "DropHighlight" );
        }
    });
    $( ".DropCharge" ).droppable({
        accept: ".Char_OK",
        drop: function( event, ui ) {
            $( this ).addClass( "DropHighlight" );
        }
    });
    $( ".DropIndex" ).droppable({
        accept: ".Index_OK",
        drop: function( event, ui ) {
            $( this ).addClass( "DropHighlight" );
        }
    });

    // console.log("inputObj 2: " + JSON.stringify(inputObj.NameArray));
});

