Funktionen changeEasy() ändrar svårighetsgraden till "Lätt" genom att uppdatera komponenterna och ändra stilen på svårighetsgradsknapparna.

Funktionen changeMedium() ändrar svårighetsgraden till "Medium" på samma sätt som changeEasy().

Funktionen changeHard() ändrar svårighetsgraden till "Svår" på samma sätt som changeEasy().

Funktionen diffChecker() kontrollerar vilken svårighetsgrad som är vald och startar spelet med den svårighetsgraden.

Funktionen startGame() startar spelet genom att dölja startknappen, visa omstartsknappen och skapa spelplanen.

Funktionen placeBombs() placeras ut bomber slumpmässigt på spelplanen och returnerar en matris som representerar bombpositionerna.

Funktionen placeSingleBomb() placeras ut en enskild bomb på en slumpmässig position på spelplanen.

Funktionen cellID() genererar en unik ID-sträng för varje spelcell baserat på dess rad och kolumnposition.

Funktionen createTable() skapar en HTML-tabell som representerar spelplanen och returnerar den som ett HTML-element.

Funktionen addCellListeners() lägger till händelselyssnare för musklick och högerklick på en spelcell.

Funktionen handleCellClick() hanterar klick på en spelcell genom att avslöja innehållet (bomb eller antal närliggande bomber).

Funktionen adjacentBombs() räknar antalet närliggande bomber för en given spelcell.

Funktionen adjacentFlags() räknar antalet närliggande flaggor för en given spelcell.

Funktionen clickAdjacentBombs() klickar på alla närliggande celler som inte har flaggor eller redan har blivit klickade.

Funktionen performMassClick() utför ett massklick på närliggande celler om den klickade cellen inte har några närliggande bomber.

Funktionen gameOver() markeras spelet som förlorat genom att visa en förlorad text och en GIF-animation.

Funktionen gameWon() markeras spelet som vunnet genom att visa en vinsttext.

Funktionen reload() laddar om sidan för att starta om spelet.
