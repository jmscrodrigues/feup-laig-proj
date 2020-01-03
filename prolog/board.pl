:- use_module(library(lists)).
:- use_module(library(random)).
:- use_module(library(system)).

isValid(0).
isValid(1).
isValid(2).
isValid(3).
isValid(4).
isValid(5).
isValid(6).
isValid(7).


board([['*','*','*','*','*','*','*','*'],
['*','*','*','*','*','*','*','*'],
['*','*','*','*','*','*','*','*'],
['*','*','*','*','*','*','*','*'],
['*','*','*','*','*','*','*','*'],
['*','*','*','*','*','*','*','*'],
['*','*','*','*','*','*','*','*'],
['*','*','*','*','*','*','*','*']]).


printBoard(X) :-
    printMatrix(X, 1),
    nl.

printMatrix([], 9).

printMatrix([H|T], N) :-
    nl,
    N1 is N + 1,
    write(' | '),
    printLine(H),
    printMatrix(T, N1).

printLine([]).

printLine([H|T]) :-
    write(H),
    write(' | '),
    printLine(T).



findChar(X,Y, M) :-
    NX is X-1,
    NY is Y-1,
    nth0(NX,M,T),
    nth0(NY,T,'*').

confirmChar(X,Y,B,P):-
    nth0(X,B,T),
    nth0(Y,T,P),
    !.

removePeca(Nlinha, Ncoluna, Peca, TabIn, TabOut):-
    setLinha(Nlinha,Ncoluna,Peca,TabIn,TabOut).


setPeca(Nlinha, Ncoluna, Peca, TabIn, TabOut):-
    findChar(Nlinha,Ncoluna, TabIn),
    setLinha(Nlinha, Ncoluna, Peca, TabIn, TabOut).

setLinha(1, Ncoluna, Peca, [Linha|Resto],[NovaLinha|Resto]):-
    setColuna(Ncoluna, Peca, Linha, NovaLinha).


setLinha(N, Ncoluna, Peca, [Linha|Resto], [Linha|MaisLinhas]):-
    N > 1,
    Next is N-1,
    setLinha(Next,Ncoluna,Peca,Resto,MaisLinhas).


setColuna(1,Peca,[_|Resto], [Peca|Resto]).

setColuna(N, Peca, [X|Resto], [X|Mais]):-
    N > 1,
    Next is N-1,
    setColuna(Next,Peca,Resto,Mais).



defineAndSet(Peca,TabIn,TabMed):-
    repeat,
    random(1,9, X),
    random(1,9, Y),

    setPeca(X, Y, Peca, TabIn, TabMed).


fillingLoop(0, _Peca, TabOut, TabOut):-
    !.

fillingLoop(Max, Peca, TabIn, TabOut):-
    Max > 0,
    NewMax is Max - 1,

    defineAndSet(Peca, TabIn, TabMed),
    fillingLoop(NewMax, Peca, TabMed, TabOut).

fillBoard(TabInicial, TabFinal):-
    fillingLoop(21, r, TabInicial, TabMed1),
    fillingLoop(21, y, TabMed1, TabMed2),
    fillingLoop(21, b, TabMed2, TabFinal),
    !.



isSafe(X,Y,Tab):-
    confirmChar(X,Y,Tab,'*'),
    !.

isSafe(X,Y,Tab):-
    rodeado(Y,X,Tab,0).

notChar(X,Y,B):-
    nth0(X,B,T),
    nth0(Y,T,P),
    P \= '*'.



rodeado(0,0,Tab,Num):-
    checkPos(1,1,Tab,Num,N1),
    checkPos(0,1,Tab,N1,N2),
    checkPos(1,0,Tab,N2,N3),
    N3 - 1 >= 3,
    !.

rodeado(0,7,Tab,Num):-
    checkPos(0,6,Tab,Num,N1),
    checkPos(1,7,Tab,N1,N2),
    checkPos(1,6,Tab,N2,N3),
    N3 - 1 >= 3,
    !.

rodeado(7,0,Tab,Num):-
    checkPos(6,0,Tab,Num,N1),
    checkPos(6,1,Tab,N1,N2),
    checkPos(7,1,Tab,N2,N3),
    N3 - 1 >= 3,
    !.

rodeado(7,7,Tab,Num):-
    checkPos(7,6,Tab,Num,N1),
    checkPos(6,6,Tab,N1,N2),
    checkPos(6,7,Tab,N2,N3),
    N3 - 1 >= 3,
    !.

rodeado(0,Y,Tab,Num):-
    Y1 is Y-1,
    Y2 is Y+1,
    checkPos(0,Y1,Tab,Num,N1),
    checkPos(0,Y2,Tab,N1,N2),
    checkPos(1,Y1,Tab,N2,N3),
    checkPos(1,Y,Tab,N3,N4),
    checkPos(1,Y2,Tab,N4,N5),
    N5 - 1 >= 3,
    !.

rodeado(7,Y,Tab,Num):-
    Y1 is Y-1,
    Y2 is Y+1,
    checkPos(7,Y1,Tab,Num,N1),
    checkPos(7,Y2,Tab,N1,N2),
    checkPos(6,Y1,Tab,N2,N3),
    checkPos(6,Y,Tab,N3,N4),
    checkPos(6,Y2,Tab,N4,N5),
    N5 - 1 >= 3,
    !.

rodeado(X,0,Tab,Num):-
    X1 is X-1,
    X2 is X+1,
    checkPos(X1,0,Tab,Num,N1),
    checkPos(X2,0,Tab,N1,N2),
    checkPos(X1,1,Tab,N2,N3),
    checkPos(X,1,Tab,N3,N4),
    checkPos(X2,1,Tab,N4,N5),
    N5 - 1 >= 3,
    !.

rodeado(X,7,Tab,Num):-
    X1 is X-1,
    X2 is X+1,
    checkPos(X1,7,Tab,Num,N1),
    checkPos(X2,7,Tab,N1,N2),
    checkPos(X1,6,Tab,N2,N3),
    checkPos(X,6,Tab,N3,N4),
    checkPos(X2,6,Tab,N4,N5),
    N5 - 1 >= 3,
    !.

rodeado(X,Y,Tab,Num):-
    X > 0,
    X < 7,
    Y > 0,
    Y < 7,
    Y1 is Y-1,
    Y2 is Y+1,
    X1 is X-1,
    X2 is X+1,
    checkPos(X1,Y1,Tab,Num,N1),
    checkPos(X1,Y,Tab,N1,N2),
    checkPos(X1,Y2,Tab,N2,N3),
    checkPos(X,Y1,Tab,N3,N4),
    checkPos(X,Y2,Tab,N4,N5),
    checkPos(X2,Y1,Tab,N5,N6),
    checkPos(X2,Y,Tab,N6, N7),
    checkPos(X2,Y2,Tab,N7,N8),
    N8 - 1 >= 3,
    !.

verify(b,Num, NumFinal):-
    NumFinal is Num +1.

verify(r,Num, NumFinal):-
    NumFinal is Num +1.

verify(y,Num, NumFinal):-
    NumFinal is Num +1.


verify('*',Num, NumFinal):-
    NumFinal is Num.


checkPos(X,Y,Tab,Num,NumFinal):-
    nth0(Y,Tab,T),
    nth0(X,T,Var),
    verify(Var,Num, NumFinal),
    !.

f(X,Y,B):-
    isValid(X),
    isValid(Y),
    checkSafe(X,Y,B).




checkSafe(7,0,Board):-
    notChar(7,0,Board),
    !,
    isSafe(6,0, Board),
    !,
    isSafe(6,1, Board),
    !,
    isSafe(7,1, Board),
    !.



checkSafe(7,7,Board):-
    notChar(7,7,Board),
    !,
    isSafe(6,7, Board),
    !,
    isSafe(6,6, Board),
    !,
    isSafe(7,6, Board),
    !.




checkSafe(0,0,Board):-
    notChar(0,0,Board),
    !,
    isSafe(0,1, Board),
    !,
    isSafe(1,1, Board),
    !,
    isSafe(1,0, Board),
    !.




checkSafe(0,7,Board):-
    notChar(0,7,Board),
    !,
    isSafe(0,6, Board),
    !,
    isSafe(1,6, Board),
    !,
    isSafe(1,7, Board),
    !.




checkSafe(0,Y,Board):-
    isValid(Y),
    Y\=0,
    Y\=7,
    Y1 is Y-1,
    Y2 is Y+1,
    notChar(0,Y,Board),
    !,
    isSafe(0,Y1, Board),
    !,
    isSafe(0,Y2, Board),
    !,
    isSafe(1,Y1, Board),
    !,
    isSafe(1,Y, Board),
    !,
    isSafe(1,Y2, Board),
    !.


checkSafe(7,Y,Board):-
    isValid(Y),
    Y\=0,
    Y\=7,
    Y1 is Y-1,
    Y2 is Y+1,
    notChar(7,Y,Board),
    !,
    isSafe(7,Y1, Board),
    !,
    isSafe(7,Y2, Board),
    !,
    isSafe(6,Y1, Board),
    !,
    isSafe(6,Y, Board),
    !,
    isSafe(6,Y2, Board),
    !.


checkSafe(X,0,Board):-
    isValid(X),
    X\=0,
    X\=7,
    X1 is X-1,
    X2 is X+1,
    notChar(X,0,Board),
    !,
    isSafe(X1,0, Board),
    !,
    isSafe(X2,0, Board),
    !,
    isSafe(X1,1, Board),
    !,
    isSafe(X,1, Board),
    !,
    isSafe(X2,1, Board),
    !.


checkSafe(X,7,Board):-
    isValid(X),
    X\=0,
    X\=7,
    X1 is X-1,
    X2 is X+1,
    notChar(X,7,Board),
    !,
    isSafe(X1,7, Board),
    !,
    isSafe(X2,7, Board),
    !,
    isSafe(X1,6, Board),
    !,
    isSafe(X,6, Board),
    !,
    isSafe(X2,6, Board),
    !.


checkSafe(X,Y,Board):-
    isValid(X),
    isValid(Y),
    X\=0,
    X\=7,
    Y\=0,
    Y\=7,
    notChar(X,Y,Board),
    !,
    X1 is X-1,
    X2 is X+1,
    Y1 is Y-1,
    Y2 is Y+1,
    isSafe(X1,Y1, Board),
    !,
    isSafe(X1,Y, Board),
    !,
    isSafe(X,Y1, Board),
    !,
    isSafe(X,Y2, Board),
    !,
    isSafe(X2,Y1, Board),
    !,
    isSafe(X2,Y, Board),
    !,
    isSafe(X2,Y2, Board),
    !,
    isSafe(X1,Y2, Board),
    !.


gamerRemove(X,Y,Board,TabOut,P):-
    confirmChar(X,Y,Board,P),
    P \= '*',
    NX is X + 1,
    NY is Y + 1,
    removePeca(NX,NY,'*',Board,TabOut),
    !,
    nl.

move(X,Y,Board,TabOut,P):-
    checkSafe(X,Y,Board),
    !,
    gamerRemove(X,Y,Board,TabOut,P).

move(_X,_Y,_Board,_TabOut,_P):-
    write('Piece is unsafe'),nl,
    fail.

valid_moves(B,L):-
    findall([X,Y], f(X,Y,B),L).

checkList([_|_],_L1,_L2):-
   nl.

checkList([],L1,L2):-
    gameOver(L1,L2).


soma(X,Y,S):-
    S is X+Y.

checkDivisable(N,Q):-
    Q is div(N,5).


gameOver(L1,L2):-
    countL1(L1,X1,Y1,Z1),
    countL2(L2,X2,Y2,Z2),
    checkDivisable(X1,Q1),
    checkDivisable(X2,Q2),
    checkDivisable(Y1,Q3),
    checkDivisable(Y2,Q4),
    checkDivisable(Z1,Q5),
    checkDivisable(Z2,Q6),
    soma(Q1,Q3,Soma1),
    soma(Soma1,Q5,Soma2),
    soma(Q2,Q4,Soma3),
    soma(Soma3,Q6,Soma4),
    checkDraw(Soma2,Soma4),
    !,
    checkVictory(Soma2,Soma4),
    !,
    write('Player 1 wins!!!'), nl,
    halt.

checkVictory(Soma1,Soma2):-
    Soma1 > Soma2.

checkVictory(_Soma1,_Soma2):-
    write('Player 2 wins!!!!'), nl,
    halt.

checkDraw(Soma1,Soma2):-
    Soma1 =\= Soma2.

checkDraw(_Soma1,_Soma2):-
    write('It is a draw!!!!'), nl,
    halt.


countL1(L1,X1,Y1,Z1):-
  count(r,L1,X1),
  count(b,L1,Y1),
  count(y,L1,Z1).

countL2(L2,X2,Y2,Z2):-
  count(r,L2,X2),
  count(b,L2,Y2),
  count(y,L2,Z2).

count(_, [], 0).

count(X, [X | T], N) :-
  !, count(X, T, N1),
  N is N1 + 1.

count(X, [_ | T], N) :-
  count(X, T, N).


comparelisthead(<,  [A1,_], [A2,_]) :- compare(<, A1, A2).


choose_move(ValidMoves, X, Y):-
    random_member([X,Y], ValidMoves).


choose_moveHard(ValidMoves,List, X, Y, Board):-
    value_valid_moves(Board,ValidMoves,List,[],NewList),
    sort(NewList,FinalList),
    getXandY(FinalList, X, Y).


value(B,Pair,PlayerList,Val,FinalVal2) :-
    valuePreviousPlays(PlayerList,Pair, B, Val,FinalVal),
    valueBoardMostFrequent(B, Pair, FinalVal, FinalVal1),
    valueBoardLeastFrequent(B,Pair, FinalVal1, FinalVal2).


valuePreviousPlays(PlayerList, [H|[T|[]]], Board, Val,FinalVal) :-
    Val is 0,
    confirmChar(H,T,Board,P),
    checkPieceList(PlayerList,P,Val, FinalVal).
    
valueBoardMostFrequent(Board, [H|[T|[]]], Val,FinalVal) :-
    confirmChar(H,T,Board,P),
    checkBoardMostPiece(Board,P,Val,FinalVal).

valueBoardLeastFrequent(Board, [H|[T|[]]], Val,FinalVal):-
    confirmChar(H,T,Board,P),
    checkBoardLeastPiece(Board,P,Val,FinalVal).


value_valid_moves(_, [], _, NewFinalMovesList,NewFinalMovesList):-
    !.

value_valid_moves(B,[H|T],PlayerList, NewMovesList,NewFinalMovesList):-
    value(B, H, PlayerList,_Val,FinalVal2),
    addToList(H, FinalVal2, NewPair),

    addToList(NewMovesList,NewPair,NewMovesList1),
    
    value_valid_moves(B, T, PlayerList, NewMovesList1, NewFinalMovesList),
    !.




addToList(L,Peca,Lfinal):-
    append([Peca],L,Lfinal).

countInBoard(_,[],8,Result,Result).

countInBoard(X,[H|T],Y, Soma,Result):-
    Y1 is Y + 1,
    count(X,H,N),
    Soma1 is Soma + N,
    countInBoard(X,T,Y1,Soma1,Result).



checkMod5(N,Val,FinalVal):-
    0 is mod(N,5),
    FinalVal is Val.


checkMod5(_N,Val,FinalVal):-
    FinalVal is Val - 5.

checkPieceList(PlayerList,P,Val,FinalVal):-
    count(P,PlayerList,N),
    checkMod5(N,Val,FinalVal),
    !.


mostRepeatedPiece(X,Y,_Val,_FinalVal):-
    X > Y.

mostRepeatedPiece(X,Y, Z,Val, FinalVal):-
    mostRepeatedPiece(X,Y, Val, FinalVal),
    mostRepeatedPiece(X,Z, Val, FinalVal).


compareRepeatedPiece(X,Y, Z,Val, FinalVal):-
    mostRepeatedPiece(X,Y, Z,Val, FinalVal),
    !,
    FinalVal is Val.

compareRepeatedPiece(_X,_Y, _Z,Val, FinalVal):-
    FinalVal is Val-3.



countInBoardAllPieces(Board,Result1,Result2,Result3):-
    countInBoard(r,Board,0,0,Result1),
    countInBoard(b,Board,0,0,Result2),
    countInBoard(y,Board,0,0,Result3).


checkBoardMostPiece(Board, X, Val,FinalVal):-
    countInBoardAllPieces(Board,Result1,Result2,Result3),
    checkBoardMostPiece1(Board, X, Val,Result1,Result2,Result3,FinalVal).

checkBoardMostPiece1(_Board, X, Val,Result1,Result2,Result3,FinalVal):-
    X = r,
    !,
    compareRepeatedPiece(Result1,Result2,Result3,Val,FinalVal).


checkBoardMostPiece1(_Board, X, Val,Result1,Result2,Result3,FinalVal):-
    X = b,
    !,
    compareRepeatedPiece(Result2,Result1,Result3,Val,FinalVal).

checkBoardMostPiece1(_Board, _X, Val,Result1,Result2,Result3,FinalVal):-
    compareRepeatedPiece(Result3,Result1,Result2,Val,FinalVal).


checkBoardLeastPiece(Board,P,Val,FinalVal):-
    countInBoard(P,Board,0,0,Result),
    Result < 5,
    !,
    FinalVal is Val + 8.

checkBoardLeastPiece(_Board,_rcP,Val,FinalVal):-
    FinalVal is Val.

getXandY([H|_T], X,Y):-
    parsePair(H,X,Y).

parsePair([_V|[U|T]],X,Y):-
    X is U +0,
    Y is T +0.
