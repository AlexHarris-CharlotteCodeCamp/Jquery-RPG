// Object Constructor
function character(name, image, health, attackPower, counterAttack, audio) {
    this.name = name;
    this.image = image;
    this.health = health;
    this.attackPower = attackPower;
    this.counterAttack = counterAttack;
    this.audio = audio;
} 

// Need to lower the main themes volume compared to other audios
// turn off main theme audio just before game start function is recalled 
// Add a display stats box that is floated right, display hidden
// reveal stats box when a character div is hovered and display that characters stats

var audioThemeArray = [""];

var startTheme = new Audio("assets/audio/Themes/Fates.mp3");
startTheme.muted = false;
startTheme.volume = 0.2;
var obiAudio = new Audio("assets/audio/Character-Quotes/obiwan-quote.mp3");
var anakinAudio = new Audio("assets/audio/Character-Quotes/anakin-quote.mp3");
anakinAudio.volume = 1;
var greviousAudio = new Audio("assets/audio/Character-Quotes/grevious-quote.wav");
var maceAudio = new Audio("assets/audio/Character-Quotes/mace-quote.mp3");

var obiWan = new character("Obi-Wan Kenobi", "https://media0.giphy.com/media/3ohuAkAS7Uzq20qzXW/200.gif#29-grid1", 150, 10, 15, obiAudio);
var anakin = new character("Anakin Skywalker", "https://media1.giphy.com/media/Ii3yAgfTEHPd6/200w.gif#22-grid1",175, 8, 30, anakinAudio);
var grevious = new character("General Grevious", "https://media2.giphy.com/media/kAUgtSozkruPC/200.gif#0-grid1",100, 20, 20, greviousAudio);
var windu = new character("Mace Windu", "https://media0.giphy.com/media/3ornjTfcat9eNI1wg8/200.gif#2-grid1",200, 8, 25, maceAudio);




var charArray = [obiWan, anakin, grevious, windu];
var value;
var index;
var playerCharacter;
var enemyCharacter;
var newDiv = $("<div>");
var nameP = $("<p>");
var healthP = $("<p>");
var newImg = $("<img>");

var objectCopyObi = Object.assign({}, obiWan);
var objectCopyAnakin = Object.assign({}, anakin);
var objectCopyGrevious = Object.assign({}, grevious);
var objectCopyWindu = Object.assign({}, windu);

function startGameState()  {
    //Audio repeats on a win or loss. So need to turn audio off at the end of a round
    var startTheme = new Audio("assets/audio/Themes/Fates.mp3");
    startTheme.volume = 0.2;
    startTheme.play();

    var copyArray = [objectCopyObi, objectCopyAnakin, objectCopyGrevious, objectCopyWindu];

    for(var i = 0; i < charArray.length; i++) {
        var newDiv = $("<div>");
        var nameP = $("<p>");
        var healthP = $("<p>");
        var newImg = $("<img>");
        newDiv.addClass("position character");
        newDiv.attr("value", i);
        nameP.text(charArray[i].name);
        nameP.addClass("centered");
        newImg.attr("src", charArray[i].image)
        newImg.addClass("image");
        healthP.text(charArray[i].health);
        nameP.append(newImg);
        nameP.append(healthP);
        newDiv.append(nameP);
        $("#characters").append(newDiv);
    }
    $(".character").on("click", function() {
        $(this).attr("id", "player");
        var playerValue = ($("#player").attr("value"));
        playerValue = parseInt(playerValue);
        var playerCharacter = copyArray[playerValue];
        playerCharacter.audio.play();



        $(".character").not(this).appendTo("#enemies");
        $(".character").not(this).addClass("enemyCharacter");
        $(".character").not(this).css("backgroundColor", "red");
        $(".character").off("click");
        console.log($("#defender").children().length);
    })
}
startGameState();


$("#enemies").on("click", ".enemyCharacter", function(){
    $(this).attr("id", "enemySelected");
    console.log("ID added");
})

$("#enemies").on("click", ".enemyCharacter", function(){
    enemySelected();
});

var objectCopyObi = Object.assign({}, obiWan);
objectCopyObi.health = obiWan.health;
objectCopyObi.attackPower = obiWan.attackPower;
var objectCopyAnakin = Object.assign({}, anakin);
objectCopyAnakin.health = anakin.health;
objectCopyAnakin.attackPower = anakin.attackPower;
var objectCopyGrevious = Object.assign({}, grevious);
objectCopyGrevious.health = grevious.health;
objectCopyGrevious.attackPower = grevious.attackPower;
var objectCopyWindu = Object.assign({}, windu);
objectCopyWindu.health = windu.health;
objectCopyWindu.attackPower = windu.attackPower;

var copyArray = [objectCopyObi, objectCopyAnakin, objectCopyGrevious, objectCopyWindu];

function enemySelected() {
    var copyArray = [objectCopyObi, objectCopyAnakin, objectCopyGrevious, objectCopyWindu];
    
    console.log("enemy clicked to defender");
    $("#enemySelected").appendTo("#defender");
    $("#enemySelected").attr("id", "enemyDefender");
    var enemyValue = ($("#enemyDefender").attr("value"));
    enemyValue = parseInt(enemyValue);
    var enemyCharacter = copyArray[enemyValue];
    enemyCharacter.audio.play();
    if($("#defender").has(".enemyCharacter")) {
        $("#enemies").off("click");     
        $("button").on("click", function() {
            var attackSound = new Audio("assets/audio/Actions/Light-saber.mp3");
            attackSound.play();
            var playerValue = ($("#player").attr("value"));
            var enemyValue = ($("#enemyDefender").attr("value"));
            playerValue = parseInt(playerValue);
            enemyValue = parseInt(enemyValue);
            playerCharacter = copyArray[playerValue];
            enemyCharacter = copyArray[enemyValue];
            console.log("Player Attack power:" + playerCharacter.attackPower);
            console.log("Enemy Counter attack power:" + enemyCharacter.counterAttack);
            playerCharacter.health -= enemyCharacter.counterAttack;
            enemyCharacter.health -= playerCharacter.attackPower;
            $("#player p").last().text(playerCharacter.health);
            $("#enemyDefender p").last().text(enemyCharacter.health);
            playerCharacter.attackPower += playerCharacter.attackPower;
            if(enemyCharacter.health <= 0) {
                $("#enemyDefender").remove();
                $("#enemies").on("click", ".enemyCharacter", function(){
                    $(this).attr("id", "enemySelected");
                    appendToDefend();
                });
                if($("#defender").children().length === 1) {
                    if($("#enemies").children().length === 0) {
                        $("#player").remove();
                        $("#win").text("Congratulations! You won last round.");
                        var objectCopyObi = Object.assign({}, obiWan);
                        var objectCopyAnakin = Object.assign({}, anakin);
                        var objectCopyGrevious = Object.assign({}, grevious);
                        var objectCopyWindu = Object.assign({}, windu);
                        copyArray = [objectCopyObi, objectCopyAnakin, objectCopyGrevious, objectCopyWindu];
                        // turn off main theme audio just before game start function is recalled 
                        startTheme.muted = true;
                        console.log(startTheme.muted);
                        startGameState();
                    } 
                }
            } 
            if(playerCharacter.health <= 0) {
                $("#win").text("You lost the previous round.");
                $("#player").remove();
                $(".enemyCharacter").remove();
                var objectCopyObi = Object.assign({}, obiWan);
                var objectCopyAnakin = Object.assign({}, anakin);
                var objectCopyGrevious = Object.assign({}, grevious);
                var objectCopyWindu = Object.assign({}, windu);
                copyArray = [objectCopyObi, objectCopyAnakin, objectCopyGrevious, objectCopyWindu];
                // turn off main theme audio just before game start function is recalled 

                startGameState();
            }
        }); 
    }
}


function appendToDefend () {
    $("#enemySelected").appendTo("#defender");
    $("#enemySelected").attr("id", "enemyDefender");
}


