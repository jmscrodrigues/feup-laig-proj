



printGameMenu :-
    clear,
    nl,
    write('        **  GAME MODES  **        '), nl, nl,
    write('** Select one option: **'), nl,
    write('-> 1 - PLAY vs. CPU'), nl,
    write('-> 2 - PLAYER vs. PLAYER'), nl,
    write('-> 3 - CPU vs. CPU'),nl,
    write('-> 4 - BACK'),nl.


printMenu :-
    clear,
    nl,
    write('        **  ASTERISMO  **        '), nl, nl,
    write('** Select one option:'), nl,
    write('-> 1 - PLAY'), nl,
    write('-> 2 - HELP'), nl,
    write('-> 3 - QUIT'),nl.

printCPUGameMenu :-
    clear,
    nl,
    write('** Select one option: **'), nl,
    write('-> 1 - NORMAL MODE'), nl,
    write('-> 2 - HARD MODE'), nl,
    write('-> 3 - BACK'),nl.



printInformation:-
    clear,
    write('Welcome to ASTERISMO. In this game, you will have a board with'),nl,
    write('63 pieces (21 yellow, Y, 21 blue, B, and 21 red, R.'),nl,
    write('A piece is considered safe when it has connection (vertical,'),nl,
    write('horizontal or diagonal with 3 different pieces. A piece can'),nl,
    write('be removed when it doe not affect the safeness of the piecesfrom the board.'),nl,
    write('it. A player gets a point when he collects 5 pieces of the'),nl,
    write('same colour. The game ends when every piece on the board is'),nl,
    write('safe. Enjoy the game!'),nl,nl,nl,
    write('Type 1. to exit!'),
    read(Input),
    parseInputInfo(Input).



gameMenu :-
    clear,
    printGameMenu,
    read(Input), 
    parseInputGameMenu(Input).


mainMenu :-
    now(Ts),
    setrand(Ts),
    clear,
    printMenu,
    read(Input),
    parseInputMainMenu(Input).

cpuGameMenu :-
    clear,
    printCPUGameMenu,
    read(Input),
    parseInputCPUGame(Input).


enterKey:-
	write('Press Enter.'), nl,
	get_char(_), 
    !.


clear :- write('\33\[2J').

parseInputMainMenu(1):- gameMenu.
parseInputMainMenu(2):- printInformation.
parseInputMainMenu(3):- halt.

parseInputGameMenu(1):- cpuGameMenu.
parseInputGameMenu(2):- startGame(1,2).
parseInputGameMenu(3):- startGame('AI1','AI2').
parseInputGameMenu(4):- mainMenu.

parseInputCPUGame(1):-  startGame(1,0,'AI').
parseInputCPUGame(2):-  startGame(1,1,'AI').
parseInputCPUGame(3):-  gameMenu.


parseInputInfo(1):- mainMenu.


