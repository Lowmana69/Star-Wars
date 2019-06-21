// Global variables

// Original Strength of Character beginning of the game
var originalStrength = 0; 

// Placeholder for the Player
var player; 

// Placeholder the current Opponent 
var opponent; 

// Stores the character choices in an array, and each character is an Object within itself
var characters = []; 

// Identify if the player has been chosen or not
var playerSelected = false; 

// Identify if the opponent has been chosen or not as well
var defenderSelected = false; 


// Character Constructor
function creatingCharacterObject(name, hp, ap, counter, picture, audio) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPoints = ap;
    this.attackCounter = counter;
    this.picture = picture;
    this.audio = audio;
}


// Increase the attack strength (Attack Points + Original Points)
creatingCharacterObject.prototype.increaseAttack = function () {
    this.attackPoints += originalStrength;
};

// Performs an attack
creatingCharacterObject.prototype.attack = function (Obj) {
    Obj.healthPoints -= this.attackPoints;
    $("#msg").html("You attacked " +
        Obj.name + "for " + this.attackPoints + " damage points.");
    this.increaseAttack();
};

// Performs a counter attack along with the attacking the opponent
creatingCharacterObject.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.attackCounter;
    $("#msg").append("<br>" + this.name + " counter attacked you for " + this.attackCounter + " damage points.");
};


// Initialize all the characters
function initCharacters() {
    var lukeSkywalker = new creatingCharacterObject(
        "Luke Skywalker", 100, 10, 5, 
        "../assets/images/Characters/Luke Skywalker.jpg",
        "../assets/audio/Luke Skywalker.mp3");
    var darthVader = new creatingCharacterObject(
        "Darth Vader", 200, 50, 30, 
        "../assets/images/Characters/Darth Vader.png",
        "../assets/audio/Darth Vader - Yes, My Master.mp3");
    var obiWanKenobi = new creatingCharacterObject(
        "Obi-Wan Kenobi", 150, 15, 2, 
        "../assets/images/Characters/",
        "../assets/audio/Obi wan Kenobi.mp3");
    var chewbaccaTheWookie = new creatingCharacterObject(
        "Chewbacca", 180, 30, 12, 
        "../assets/images/Characters/Chewbacca.png",
        "../assets/audio/Chewbacca Roar.mp3");
    var admiralAkbar = new creatingCharacterObject(
         "Admiral Akbar", 100, 10, 5, 
         "../assets/images/Characters/Admiral Akbar.jpg",
         "../assets/audio/Admiral Akbar.mp3");
    var maceWindu = new creatingCharacterObject(
         "Darth Vader", 200, 50, 30, 
         "../assets/images/Characters/Mace Windu.jpg",
        "../assets/audio/Mace Windu.mp3");
    var masterYoda = new creatingCharacterObject(
         "Master Yoda", 150, 15, 2, 
         "../assets/images/Characters/",
        "../assets/audio/Master Yoda.mp3");
    var anakinSkywalker = new creatingCharacterObject(
         "Anakin Skywalker", 180, 30, 12, 
         "../assets/images/Characters/Anakin Skywalker.jpg",
         "../assets/audio/Anakin Skywalker.mp3");
    var emperorPalpatine = new creatingCharacterObject(
         "Emperor Palpatine", 180, 30, 12, 
         "../assets/images/Characters/Emperor Palpatine.jpg",
         "../assets/audio/Emperor Palpatine.mp3");
     var hanSolo = new creatingCharacterObject(
        "Han Solo", 180, 30, 12, 
         "../assets/images/Characters/Han Solo.jpg",
         "../assets/audio/Han Solo.mp3");
    characters.push(lukeSkywalker, darthVader, obiWanKenobi, chewbaccaTheWookie, admiralAkbar, emperorPalpatine, maceWindu, anakinSkywalker, hanSolo, masterYoda);
}

// "Save" the original attack points
function setoriginalStrength(Obj) {
    originalStrength = Obj.attackPoints;
}

// Checks if character is alive
function isAlive(Obj) {
    if (Obj.healthPoints > 0) {
        return true;
    }
    return false;
}

// Checks if the player has won
function isWinner() {
    if (characters.length == 0 && player.healthPoints > 0)
        return true;
    else return false;
}

// Create the character cards onscreen
function characterCards(divID) {
    $(divID).children().remove();
    for (var i = 0; i < characters.length; i++) {
        $(divID).append("<div />");
        $(divID + " div:last-child").addClass("card");
        $(divID + " div:last-child").append("<img />");
        $(divID + " img:last-child").attr("id", characters[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", characters[i].picture);
        $(divID + " img:last-child").attr("width", 150);
        $(divID + " div:last-child").append("<audio />");
        $(divID + " audio: last-child").attr("src", characters[i].Audio);
        $(divID + " img:last-child").addClass("img-thumbnail");
        $(divID + " div:last-child").append(characters[i].name + "<br>");
        $(divID + " div:last-child").append("HP: " + characters[i].healthPoints);
        $(divID + " div:last-child").append();

    }
}

// Update the characters pictures location on the screen (move them between divs)
function updatePics(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < characters.length; i++) {
        $(toDivID).append("<img />");
        $(toDivID + " img:last-child").attr("id", characters[i].name);
        $(toDivID + " img:last-child").attr("src", characters[i].picture);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}

// Plays theme song at the beginning of the Demo screen
function playAudio() {
    var titleScreen = new Audio("/../assets/audio/Star Wars Theme Song.mp3");
    titleScreen.play();

}


// Change the view from the Title screen to the Demo screen
function changeScreen() {
    $("#title-screeen").empty();
    $("#demo-screen").show();
}

// Change the view from the Character screen to the Fight screen
function changeScreen() {
    $("#choose-character-screen").empty();
    $("#fight-screen").show();
}

$(document).click(, "img", function () {
    // Stores the user's choice for the Opponent Side
    if (playerSelected && !defenderSelected && (this.id != player.name)) {
        for (var j = 0; j < characters.length; j++) {
            if (characters[j].name == (this).id) {
                opponent = characters[j]; // sets opponent
                characters.splice(j, 1);
                defenderSelected = true;
                characters[j].play();
                $("#msg").html("Click the button to attack!");
            }
        }
        $("#defenderDiv").append(this); // appends the selected opponent to the div 
        $("#defenderDiv").addClass("animated zoomInRight");
        $("#defenderDiv").append("<br>" + opponent.name);
        $("#defenderHealthDiv").append("HP: " + opponent.healthPoints);
        $("#defenderHealthDiv").addClass("animated zoomInRight");
    }
    // Stores the character the user has chosen into the Player Section
    if (!playerSelected) {
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].name == (this).id) {
                player = characters[i]; // sets current player
                characters[i].play();// starts theme song
                $("body").css({
                    "background-image": "url('./assets/images/" + this.id[0] + ".jpg')"
                }); // changes the background picture according to the user selection
                setoriginalStrength(player);
                characters.splice(i, 1);
                playerSelected = true;
                changeView();
                $("#msg").html("Pick an enemy to fight!");
            }
        }
        updatePics("#game", "#defendersLeftDiv");
        $("#playerDiv").append(this); // appends the selected player to the div
        $("#playerDiv").addClass("animated zoomIn");
        $("#playerDiv").append(player.name);
        $("#playerHealthDiv").append("HP: " + player.healthPoints);
        $("#playerHealthDiv").addClass("animated zoomIn");
    }

});

// The attack button functionality
$(document).click("#attackBtn", function () {
    if (playerSelected && defenderSelected) {
        if (isAlive(player) && isAlive(opponent)) {
            player.attack(opponent);
            opponent.counterAttack(player);
            $("#playerHealthDiv").html("HP: " + player.healthPoints);
            $("#defenderHealthDiv").html("HP: " + opponent.healthPoints);
            if (!isAlive(opponent)) {
                $("#defenderHealthDiv").html("DEFEATED!");
                $("#playerHealthDiv").html("Enemy defeated!");
                $("#msg").html("Pick another enemy to battle...");
            }
            if (!isAlive(player)) {
                $("#playerHealthDiv").html("YOU LOST!");
                $("#msg").html("Try again...");
                $("#attackBtn").html("Restart Game");
                
                $(document).click("#attackBtn", function () { // Restarts the Game from the beginning
                    location.reload();
                });
            }
        }
        if (!isAlive(opponent)) {
            $("#defenderDiv").removeClass("animated zoomInRight");
            $("#defenderHealthDiv").removeClass("animated zoomInRight");
            $("#defenderDiv").children().remove();
            $("#defenderDiv").html("");
            $("#defenderHealthDiv").html("");
            defenderSelected = false;
            if (isWinner()) {
                $("#secondScreen").hide();
                $("#globalMsg").show();
            }
        }
    }
});

// EXECUTE
$(document).ready(function () {
    $("#demo-screen").hide();
    $("#globalMsg").hide();
    initCharacters();
    characterCards("#game");
    playAudio();
});

