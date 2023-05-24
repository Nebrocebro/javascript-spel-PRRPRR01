"Minechecker" är en spinoff på den kända klassikern "Minesweeper". Minechecker har 3 st svårighetsgrader: Easy, Medium och Hard. Spelet har även gjorts med idén att det ska vara frustrerande, och ganska svårt. 

Funktionen changeEasy() ändrar svårighetsgraden till "Lätt" genom att uppdatera arrayen med värden känd som components. Detta gör bl. a. att spelplanens storlek och antal/andel bomber på fältet ändras.

Funktionen changeMedium() ändrar svårighetsgraden till "Medium" på samma sätt som changeEasy().

Funktionen changeHard() ändrar svårighetsgraden till "Svår" på samma sätt som changeEasy().

Funktionen diffChecker() kontrollerar vilken svårighetsgrad som är vald och startar spelet med den svårighetsgraden.

Funktionen startGame() startar spelet genom att dölja startknappen, visa omstartsknappen och skapa spelplanen. Den håller även koll på ifall det är det första klicket av matchen och ifall det är true och en bombruta är på rutan i första klicket så flyttas bomben till en annan plats. 

Funktionen placeBombs() placerar ut bomber slumpmässigt på spelplanen och returnerar en matris som representerar bombpositionerna. Den gör detta i en loop genom alla rader och kolumner.

Funktionen placeSingleBomb() placeras ut en enskild bomb på den position på spelplanen som är kallad i loopen.

Funktionen cellID() genererar en unik ID-sträng för varje spelcell baserat på dess rad och kolumnposition.

Funktionen createTable() skapar en HTML-table som representerar spelplanen och returnerar den som ett HTML-element.

Funktionen addCellListeners() lägger till händelselyssnare för musklick och högerklick på varje cell.

Funktionen handleCellClick() hanterar klick på den klickade cellen genom att avslöja innehållet (bomb eller antal närliggande bomber). Den kallar gamelost() ifall du klickar på en bomb och gameWon() ifall alla oöppnade celler som är kvar är lika många som antalet bomber för components.num_of_bombs.

Funktionen adjacentBombs() räknar antalet närliggande bomber för en given spelcell.

Funktionen adjacentFlags() räknar antalet närliggande flaggor för en given spelcell. 

Funktionen clickAdjacentBombs() klickar på alla närliggande celler som inte har flaggor eller redan har blivit klickade.

Funktionen performMassClick() utför ett massklick på närliggande celler om den klickade cellen inte har några närliggande bomber. 

Funktionen gameOver() deklarerar spelet som förlorat genom att visa "lostText", en bomb i den klickade bombrutan och en GIF-animation.

Funktionen gameWon() deklarerar spelet som vunnet genom att visa en "wonText".

Funktionen reload() laddar om sidan för att starta om spelet. 
