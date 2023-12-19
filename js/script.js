
// <!--
// File: index.html
// GUI Assignment: Homework 5 Scrabble WebPage
// This allows the used to drag letters into boxes to create a word and updates the score and total letters left.
// Used jquery's drag and drop and $(this).
// Mihir Parekh, UMass Lowell Computer Science,
// Mihir_Parekh@student.uml.edu
// Copyright (c) 2021 by Wenjin. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by WZ on December 18, 2023 at 11:30 PM
// -->

// This is the array of all the letters and 

var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
// ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

var score = 0;

var word = [];

var total_rem = 0;

for (var letter in ScrabbleTiles) {
    total_rem += ScrabbleTiles[letter]["original-distribution"];
}

// console.log("The total rem is: " , total_rem);



// This function gets the random tile from scrabble tiles array
function getRandomTile() {
    var keys = Object.keys(ScrabbleTiles);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    return {
        letter: randomKey,
        value: ScrabbleTiles[randomKey].value,
        image: "./img/Scrabble_Tiles/Scrabble_Tile_" + randomKey + ".jpg" // I append random letter to path
        
    };
}

//Simply reload the page to restart which clears everything

function restart() {

    location.reload();

    // score = 0;

}

//Next word button empties my rack of word_drags and updates the total tiles and score 
//Then updates html, clears array which stores the current word being checked 
// Finally goes through a for look to clear word_drops by calling .empty and setting its status to false.
// Finally I reinitialize the rack

function nextWord() {
        // Clear the current rack
    $(".rack").empty();

    // Reset the score
    update();

    $("#scoreText").text("The score is: " + score);

    $("#remaining").text("Letters Remaining: " + total_rem);    

    // score = 0;

    word.splice(0, word.length);

    $(".word_drop, .double_drop").each(function () {
        $(this).empty();
        $(this).data("occupied", false); 
    });

    initializeRack();
}
// Here I go through my current word array and do math accordingly to find score and total remaining

function update() {

    for (var i = 0; i < word.length; i++) {
        var num;
        // next account for double 
        if (i == 1 || i == 5) {
            num = ScrabbleTiles[word[i]].value * 2;
        }
        else {
            num = ScrabbleTiles[word[i]].value;
        }

        score += num;

        total_rem -= 1;
    
        console.log("The i index is: ", i);
        console.log("Letter: ", word[i]);
        console.log("Value: ", num);

        console.log("Score: ", score);
    }
    
}

//Here I call my getRandomTile function, and fill it for all seven word_drags, setting it to a specific image asssociated with letter

function initializeRack() {
    var rack = $(".rack");

    for (var i = 0; i < 7; i++) {
        var randomTile = getRandomTile();

        // Create a draggable div for each tile
        var tileDiv = $("<div>")
            .addClass("word_drag ui-draggable")
            .attr("letter", randomTile.letter)
            .css({
                "background-image": "url('" + randomTile.image + "')",
            });
            
        // Add div to rack
        rack.append(tileDiv);

        // Makes the div dragable
        tileDiv.draggable({
            revert: function (dropped) {
        // If not dropped on a valid word_dorop or word_drop is occupied, go back to intiial starting position
        var canDrop = dropped && !$(this).data("occupied");
        if (!canDrop) {
            // If it can't be dropped, return to start position
            return true;
        }
        return false;
    },
            zIndex: 1000,
            start: function () {
                // Set occupied to false when a new drag starts
                $(this).data("occupied", false);
            }
        });
    }

    // Make the word_drop and double_drop elements droppable
    $(".word_drop, .double_drop").droppable({
        accept: ".word_drag",
        drop: function (event, ui) {
            // Check if word_drop is already occupied
            if ($(this).data("occupied")) {
                return;
            }       

            // var isDoubleDrop = $(this).hasClass("double_drop");
            // console.log("Double or word drop? ", isDoubleDrop ? "double_drop" : "word_drop");

            var draggable = ui.draggable;
            var letter = draggable.attr("letter");
            console.log("Dropped letter: " + letter);

            // Here I add letter to word array
            word.push(letter);

            // Set occupied to true to prevent other word_drag elements from being dropped here
            $(this).data("occupied", true);

            //Taking dragged element and appending it to where it needs to be dropped
            ui.helper.appendTo($(this));

            // Reset the position
            ui.helper.css({
                top: 0,
                left: 0
            });
        }
    });
}


// Call the initializeRack function when the document is ready
$(document).ready(function () {
    initializeRack();
});