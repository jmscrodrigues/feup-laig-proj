:- consult('board.pl').


startGame(1,2):-
    board(B),
    fillBoard(B,Board),
    printBoard(Board),
    L1 = [],
    L2 = [],
    gameLoop(Board,1,2,L1,L2).

startGame('AI1','AI2'):-
    board(B),
    fillBoard(B,Board),
    printBoard(Board),
    L1=[],
    L2=[],
    gameLoop(Board,'AI1','AI2',L1,L2).


startGame(1,0,'AI'):-
    board(B),
    fillBoard(B,Board),
    printBoard(Board),
    L1 = [],
    L2 = [],
    gameLoop(Board,1,'AI',L1,L2,0).


startGame(1,1,'AI'):-
    board(B),
    fillBoard(B,Board),
    printBoard(Board),
    L1 =[],
    L2 =[],
    gameLoop(Board,1,'AI',L1,L2,1).



gameLoop(BoardIn,1,'AI',L1,L2,0):-
    valid_moves(BoardIn,List),
    checkList(List,L1,L2),
    makePlay(1,BoardIn,BoardMed,L1,Lfin1),
    printBoard(BoardMed),nl,
    format('Player 1 List: ~w', [Lfin1]),nl,

    valid_moves(BoardMed,List2),
    checkList(List2,Lfin1,L2),
    makePlayAI('AI',BoardMed,BoardFin,L2,Lfin2,List2,0),
    printBoard(BoardFin),nl,
    format('AI List: ~w', [Lfin2]),
    nl,

    gameLoop(BoardFin,1,'AI',Lfin1,Lfin2,0).




gameLoop(BoardIn,1,'AI',L1,L2,1):-
    valid_moves(BoardIn,List),
    checkList(List,L1,L2),
    makePlay(1,BoardIn,BoardMed,L1,Lfin1),
    printBoard(BoardMed),nl,
    format('Player 1 List: ~w', [Lfin1]),nl,

    valid_moves(BoardMed,List2),
    checkList(List2,Lfin1,L2),
    makePlayAI('AI',BoardMed,BoardFin,L2,Lfin2,List2,1),
    printBoard(BoardFin),nl,
    format('AI List: ~w', [Lfin2]),
    nl,

    gameLoop(BoardFin,1,'AI',Lfin1,Lfin2,1).


gameLoop(BoardIn,1,2,L1,L2):-
   valid_moves(BoardIn,List),
   checkList(List,L1,L2),
   makePlay(1,BoardIn,BoardMed,L1,Lfin1),
   printBoard(BoardMed),nl,
   format('Player 1 List: ~w', [Lfin1]),nl,
    
   valid_moves(BoardMed,List2),
   checkList(List2,Lfin1,L2),
   makePlay(2,BoardMed,BoardFin,L2,Lfin2),
   printBoard(BoardFin),nl,
   format('Player 2 List: ~w', [Lfin2]),
   nl,

   gameLoop(BoardFin, 1, 2, Lfin1, Lfin2).


gameLoop(BoardIn,'AI1','AI2',L1,L2):-
    valid_moves(BoardIn,List),
    checkList(List,L1,L2),
    makePlayAI('AI',BoardIn,BoardMed,L1,Lfin1,List,0),
    printBoard(BoardMed),nl,
    format('AI 1 List: ~w', [Lfin1]),nl,

    valid_moves(BoardMed,List2),
    checkList(List2,Lfin1,L2),
    makePlayAI('AI',BoardMed,BoardFin,L2,Lfin2,List2,0),
    printBoard(BoardFin),nl,
    format('AI 2 List: ~w', [Lfin2]),
    nl,

    gameLoop(BoardFin, 'AI1', 'AI2', Lfin1, Lfin2).



makePlayAI('AI',BoardAI,BoardOutAI,L,Lfinal,ValidMoves,0):-
    write('CPU turn:'), nl,nl,
    choose_move(ValidMoves, X, Y),
    format('X: ~d', [X]),nl,
    format('Y: ~d', [Y]),nl,
    move(X,Y,BoardAI,BoardOutAI,Peca),
    addToList(L,Peca,Lfinal).



makePlayAI('AI',BoardAI,BoardOutAI,L,Lfinal,ValidMoves,1):-
    write('CPU turn:'), nl,nl,
    choose_moveHard(ValidMoves, L, X, Y, BoardAI),
    format('X: ~d', [X]),nl,
    format('Y: ~d', [Y]),nl,
    move(X,Y,BoardAI,BoardOutAI,Peca),
    addToList(L,Peca,Lfinal).



makePlay(1,Board1,BoardOut1,L,Lfinal):-
    write('Player 1 turn:'), nl,
    write('Insert the position from which you want to remove the piece (X. ENTER Y.)'),
    read(InputX),
    read(InputY),
    InputX > -1,
    InputX < 8,
    InputY > -1,
    InputY < 8,
    move(InputX,InputY,Board1,BoardOut1,Peca),
    addToList(L,Peca,Lfinal).



makePlay(2,Board2,BoardOut2,L,Lfinal):-
    write('Player 2'), nl,
    write('Insert the position from which you want to remove the piece (X. ENTER Y.)'),
    read(InputX),
    read(InputY),
    InputX > -1,
    InputX < 8,
    InputY > -1,
    InputY < 8,
    move(InputX,InputY,Board2,BoardOut2,Peca),
    addToList(L,Peca,Lfinal).


makePlay(Player,Board,BoardOut,L,Lfinal):-
    makePlay(Player,Board,BoardOut,L,Lfinal).
