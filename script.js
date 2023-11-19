const gameContainer = document.getElementById("game");

const colors = ["red", "blue", "green", "orange", "purple", "gold"];

const doubleList = [...colors, ...colors];

const tileCount = doubleList.length;

let revealedList = 0;
let activeTile = null;
let waitEndMove = false;

function createDivsForColors(color) {
  const newDiv = document.createElement("div");
  // adds the class of tile in css to the new div
  newDiv.classList.add("tile");
  //record data when clicked on
  newDiv.setAttribute("data-color", color);
  newDiv.setAttribute("data-revealed", "false");

  newDiv.addEventListener("click", () => {
    if (waitEndMove) {
      return;
    }

    newDiv.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = newDiv;

      return;
    }

    //Waiting for second click.Active card must match second click
    waitEndMove = true;

    setTimeout(() => {
      // resetting if clicked not matching card
      newDiv.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      waitEndMove = false
      activeTile = null
    }, 1000);

  });

  return newDiv;
}

for (let i = 0; i < tileCount; i++) {
  const randomTile = Math.floor(Math.random() * doubleList.length);
  const color = doubleList[randomTile];
  const tile = createDivsForColors(color);
  // gives only a max of 2 colors
  doubleList.splice(randomTile, 1);

  gameContainer.appendChild(tile);
}
