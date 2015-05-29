// 


// Funktion der sætter fødder på store I'er og små l'er:: 
function replace_letters(div_container){


    return replaced_string;
}


/// Jeg spammer lige med en footer (Burde ligge i egen fil..):

function footer() {
    $(".container, .container-fluid").append("<div class='col-xs-12 vuc_footer'><h2>Digitale læringsmaterialer på voksenuddannelser</h2><h6 class='footerText'>Udviklet af et produktionsfællesskab mellem otte VUC’er til anvendelse på de deltagende skoler: <br/> Hf og VUC Nordsjælland, VUC Hvidovre-Amager, VUC Roskilde, VUC Vestegnen, VUF, VUC Storstrøm, VUC Aarhus og Københavns VUC (KVUC).</h6> <h6 class='footerCopywrite'> Copyright 2015 </h6></div >");
}


/// INDLEJRINGS    FUNKTIONALITET  ///////

function embedlink(obj) {

    // alert($(".tab").length);

    var embedFronter = '<iframe height="570" width="820" src="http://eundervisning-wp.dk/pf_eng2015/' + obj.parent().parent().find("a").eq(0).attr("href") + '"></iframe>';
    var embedMoodle = '<embed height="670" width="970" src="http://eundervisning-wp.dk/pf_eng2015/' + obj.parent().parent().find("a").eq(0).attr("href") + '"></embed>';

    var embedArray = [embedMoodle, embedFronter];

    var embedwrapping = "<div class='embedToggle'><p>Indsæt dette link i dit LMS eller på din webside</p><div class='tabcontainer'><div class='tab_1 tab activetab'>Fronter(embed)</div><div class='tab_2 tab'>Moodle(iframe)</div></div><div class='togglecontainer'><input class='embedtext' type='text' value='" + embedArray[0] + "'></input><a class='MetaDataLink' href='https://www.youtube.com/watch?v=vjh6z6EACqQ'>Hjælp til indlejring (embedding) </a></div></div>";

    var embedWidth;
    var embedHeight;


    // Klik på embedding knapper funktionalitet:

    //Hvis den man klikker på allerede har en parent...: 
    if (obj.parent().parent().find(".embedToggle").length > 0) {
        $(".embedToggle").slideUp(150, function() {

            $(".embedToggle").remove();
            // Animation complete.
        });

    } else {
        if ($(".embedToggle").length > 0) {
            // console.log("indeks: " + obj.parent().parent().index());
            $(".embedToggle").slideUp(150, function() {

                $(".embedToggle").remove();
                // Animation complete.
                obj.parent().parent().append(embedwrapping);
                $(".embedToggle").slideUp(0);
                $(".embedToggle").slideDown("slow");
                $(".tab").click(function() {

                    var indeks = $(this).index();
                    $(".tab").removeClass("activetab");
                    $(this).addClass("activetab");
                    //alert (indeks);
                    changeLink(indeks);
                });

            });
            //

        } else {
            //console.log("indeks: " + obj.parent().parent().index());
            obj.parent().parent().append(embedwrapping);
            $(".embedToggle").slideUp(0);
            $(".embedToggle").slideDown("slow");
            $(".tab").click(function() {

                var indeks = $(this).index();
                $(".tab").removeClass("activetab");
                $(this).addClass("activetab");
                //alert (indeks);
                changeLink(indeks);
            });
        }
        //alert(obj.parent().html());
    }


//<p><iframe width="100%" height="800" frameborder="0" src="http://eundervisning-wp.dk/pf_eng2015/vid_set_da.html"></iframe></p>
//<p><embed height="800px" src="http://eundervisning-wp.dk/pf_eng2015/vid_set_da.html" width="100%"></embed></p>


    function changeLink(indeks) {

        console.log("clickede på noget")

        $(".embedtext").val(embedArray[indeks]);

    }

    $(".embedtext").click(function () {
   $(this).select();
});
}



// This function surrounds all letters (or clusters of letters) in LetterArray with span-tags with a class specified in LetterClassArray.
// NOTE: The delimiter should be a character (eg. "#"), or a combination of characters (eg. "-X-"), that does not exist in the target text.
// IMPORTANT: HTML-tags must not be present in the target-text. This could result in invalid/broken markup.
// EXAMPLE CALL:
//          MarkCertainCharactersAsSpecial([".AtomName", ".AtomSymbol"], ["H","L", "S"], ["FontGreen", "FontRed", "FontBlue"], "#");
// - which will make all L's red and all H's green in the text-strings associated with the target CSS classes ".AtomName" and ".AtomSymbol".
function MarkCertainCharactersAsSpecial(TargetSelectorArray, LetterArray, LetterClassArray, Delimiter){
    for (var TargetSelector in TargetSelectorArray){
        $(TargetSelectorArray[TargetSelector]).each(function( index, element ) {
            for (var l in LetterArray){ // First surround all letters (or clusters of letters) in LetterArray with delimiters, eg. If letter = L and delimiter = #, then #L#.
                var ElementText = $(element).text();
                if (ElementText.indexOf(LetterArray[l]) !== -1){
                    $(element).html( ElementText.replace(LetterArray[l], Delimiter + LetterArray[l] + Delimiter) );
                }
            }

            for (var l in LetterArray){// second, replace all delimited letters, eg. #L#, with <span class="MyClass">L</span>
                var LetterClass = (LetterClassArray.length == LetterArray.length) ? LetterClassArray[l] : LetterClassArray[0]; 
                var ElementText = $(element).text();
                if (ElementText.indexOf(LetterArray[l]) !== -1){
                    $(element).html( ElementText.replace( Delimiter + LetterArray[l] + Delimiter, '<span class="'+LetterClass+'">'+LetterArray[l]+'</span>' ) );
                }
            }
        });
    }
}
 
// Example of use:
//      UserMsgBox(".FeedbackWrap", "Hurra - korrekt svar!");
// where the class FeedbackWrap is the target selector in which the UserMsgBox will appear.
function UserMsgBox(TargetSelector, UserMsg){

    var HTML = "<h6 id='UserMsgBox'>";
    HTML += '<span class="CloseClass right glyphicon glyphicon-remove"></span><span class="clear"></span>';
    HTML += UserMsg;
    HTML += "</h6> ";

    $(TargetSelector).html(HTML);  

    $("#UserMsgBox").fadeIn( "slow" );

    $( document ).on('click', "#UserMsgBox", function(event){
        event.preventDefault();  // Prevents sending the user to "href".
        $("#UserMsgBox").fadeOut( "slow" );
    });
}


/// INDLEJLRING SLUT !
