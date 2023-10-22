const roomMatrix = [
    [
        /*0.0*/ { heading: "Room 1", description: "Room 1", choices: [] },
        /*0.1*/ {},
        /*0.2*/ { heading: "Room 3", description: "Room 3", choices: [] }
    ],
    [
        /*1.0*/ { heading: "Room 4", description: "Room 4", choices: [] },
        /*1.1*/ { heading: "Room 5", description: "The room is dark.", choices: ["<button class=\"choice-button\" onclick='addInventory(0,\"Chipped Sword\",\"Slightly better than an old femur.\",\"onehand\",6,\"yes\",\"no\"); this.remove()'>Chipped Sword</button>", "<button class=\"choice-button\" onclick='addInventory(1,\"Cracked Shield\",\"You can see right through it.\",\"shield\",1,\"yes\",\"no\"); this.remove()'>Cracked Shield</button>", "<button class=\"choice-button\" onclick='addInventory(2,\"Rusty Chainmail\",\"Watch out for tetanus!\",\"armor\",2,\"no\",\"no\"); this.remove()'>Rusty Chainmail</button>"] },
        /*1.2*/ { heading: "Room 6", description: "Room 6", choices: [] }
    ],
    [
        /*2.0*/ { heading: "Room 7", description: "Room 7", choices: ["<button class=\"choice-button\" onclick='gold(0,5); this.remove()'>TAKE 5 GOLD</button>"] },
        /*2.1*/ {},
        /*2.2*/ { heading: "Room 9", description: "Room 9", choices: ["<button class=\"choice-button\" onclick='lightSwitch()'>LIGHT SWITCH</button>"] }
    ]
];

let gameState = {
    //Game starts with starting room declared as the current room
    currX: 1,
    currY: 1
};

let player = {
    name: 'Mr Choppy',
    gold: 0,
    handL: 'fist',
    handR: 'fist',
    torso: 'rags',
    inventory: []
};



//Basic move function
function move(dir) {
    //Updates current coordinates based on which button is pressed
    if (dir == 'north') { gameState.currX -= 1; };
    if (dir == 'south') { gameState.currX += 1 };
    if (dir == 'west') { gameState.currY -= 1 };
    if (dir == 'east') { gameState.currY += 1 };

    //Updates the innerHTML of all fields to that of new page
    updateContent();
}

//Updates content of current room
function updateContent() {
    let X = gameState.currX;
    let Y = gameState.currY;

    //Updates all player info divs
    document.getElementById('playerName').innerHTML = player.name;
    document.getElementById('gold').innerHTML = player.gold;
    document.getElementById('torso').innerHTML = player.torso;
    document.getElementById('inventory').innerHTML = player.inventory;

    //Only add item names to inventory
    document.getElementById('inventory').innerHTML = "";
    for (let item of player.inventory) {
        document.getElementById('inventory').innerHTML += "<div>" + item.itemName + "</div>";


    }

    //Creates array for drop down menu
    let equipHand = player.inventory.filter(item => item.combat === "yes" && (item.type === "onehand" || item.type === "shield") && item.equipped === "no");
    console.log(equipHand);

    //Empties inventory before populating it
    document.getElementById("leftHand").innerHTML = "";
    document.getElementById("rightHand").innerHTML = "";

    //Populates leftHand drop down with items equippable to hand slots
    for (let item of equipHand) {
        const o = document.createElement("option");
        o.text = item.itemName;
        o.value = item.itemName;
        document.getElementById("leftHand").appendChild(o);
    }

    //Populates leftHand drop down with items equippable to hand slots
    for (let item of equipHand) {
        const o = document.createElement("option");
        o.text = item.itemName;
        o.value = item.itemName;
        document.getElementById("rightHand").appendChild(o);
    }


    //Empties choice box to prevent duplicates
    document.getElementById('choice-box').innerHTML = "";

    //updates values of each room
    document.getElementById('heading-box').innerHTML = roomMatrix[X][Y].heading;
    document.getElementById('text-box').innerHTML = roomMatrix[X][Y].description;
    
    //Adds all buttons in the choices array for each room
    for (let button of roomMatrix[X][Y].choices) { 
        document.getElementById('choice-box').innerHTML += button;
    }

    //Disables buttons that lead to empty rooms or indices outside of roomMatrix
    if (X == (roomMatrix.length - 1) || roomMatrix[X + 1][Y].hasOwnProperty('description') == false) { document.getElementById("south-button").disabled = true; } else { document.getElementById("south-button").disabled = false; };
    if (X == 0 || roomMatrix[X - 1][Y].hasOwnProperty('description') == false) { document.getElementById("north-button").disabled = true; } else { document.getElementById("north-button").disabled = false; };
    if (Y == (roomMatrix[X].length - 1) || Object.keys(roomMatrix[X][Y + 1]).length === 0) { document.getElementById("east-button").disabled = true; } else { document.getElementById("east-button").disabled = false; };
    if (Y == 0 || Object.keys(roomMatrix[X][Y - 1]).length === 0) { document.getElementById("west-button").disabled = true; } else { document.getElementById("west-button").disabled = false; };
}



//Creates an alert when the player tries to leave the page
function leavePageAlert() {
    return "Leaving will cause you to lose any unsaved progress...";
}


//Turns the light on in Room 5
function lightSwitch() {
    roomMatrix[1][1].description = 'The room is well lit.';
}


function addInventory(choiceNumber,itemName,description,type,value,combat,equipped) {
    //Adds 'item' to inventory
    player.inventory.push({ itemName, description, type, value, combat, equipped });
    //Prevents button from being created in roomMatrix once collected
    roomMatrix[gameState.currX][gameState.currY].choices[choiceNumber] = "";
    //Update content so player dropdown shows up to date information
    updateContent(); 

}

//Allows player to pick up gold they find
function gold(choiceNumber, amount) {
    player.gold += amount;
    roomMatrix[gameState.currX][gameState.currY].choices[choiceNumber] = "";
    updateContent();
}

//Change theme
function changetheme(theme) {
    document.getElementById("page").className = theme;
}

//Temporarily shows the name of the color when hovered over
function themename(color) {
    document.getElementById("colorname").innerText = "[ " + color + " ]"
}

//Changes the name back to blank when mouse leaves color square
function resetcurrentcolor() {
    document.getElementById("colorname").innerHTML = "";
}




function updateInventory(item) {
    //find the first instance of item and change it to equipped
}