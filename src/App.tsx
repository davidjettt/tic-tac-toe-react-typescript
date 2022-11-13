import React, { useState, useEffect } from 'react';
import { winningCombos } from './winningCombos'

interface IState {
  board: string[]
  winner: string | null
  playerTurn: string
}


const App: React.FC = () => {
  const [ board, setBoard ] = useState<IState['board']>(['', '', '', '', '', '', '', '', ''])
  const [ winner, setWinner ] = useState<IState['winner']>(null)
  const [ playerTurn, setPlayerTurn ] = useState<IState['playerTurn']>('X')

  const checkWinner = (): void => {
    if (board[0] === board[1] && board[1] === board[2]) setWinner(board[0])
    else if (board[3] === board[4] && board[4] === board[5]) setWinner(board[3])
    else if (board[6] === board[7] && board[7] === board[8]) setWinner(board[6])
    else if (board[0] === board[4] && board[4] === board[8]) setWinner(board[0])
    else if (board[2] === board[4] && board[4] === board[6]) setWinner(board[2])
    else if (board[0] === board[3] && board[3] === board[6]) setWinner(board[0])
    else if (board[1] === board[4] && board[4] === board[7]) setWinner(board[1])
    else if (board[2] === board[5] && board[5] === board[8]) setWinner(board[2])
    else if (!board.includes('')) setWinner("It's a tie!")

    // for (const combo of winningCombos) {
    //   const p1 = combo[0]
    //   const p2 = combo[1]
    //   const p3 = combo[2]
    //   if (board[p1] === board[p2] && board[p2] === board[p3] && board[p1] === board[p3]) {
    //     setWinner(board[p1])
    //     return
    //   }
    //   if (!board.includes('')) setWinner("It's a tie!")
    // }
  }

  useEffect(() => {
    checkWinner()
  }, [board])


  const clickSquare = (idx: number): void => {
    if (winner) return
    if (!board[idx]) {
      let boardCopy: IState['board'] = board.slice()
      if (playerTurn === 'X') {
        boardCopy[idx] = playerTurn
        setBoard(boardCopy)
        setPlayerTurn('O')
      }
      else {
        boardCopy[idx] = playerTurn
        setBoard(boardCopy)
        setPlayerTurn('X')
      }
    }
  }

  const newGame = (): void => {
    setBoard(['', '', '', '', '', '', '', '', ''])
    setPlayerTurn('X')
  }

  const giveUp = (): void => {
    if (playerTurn === 'X') setWinner('O')
    else setWinner('X')
    setPlayerTurn('X')
  }


  return (
    <div className="main">
      <h1>Tic Tac Toe</h1>
      {winner && <h1>Winner: {winner}</h1>}
      <div className="board">
        {board.map((square, idx) => (
          <div
            onClick={() => clickSquare(idx)}
            key={idx}
            className={`square key${idx}`}
          >
            <h3 style={{fontSize: 46}}>
              {square}
            </h3>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button onClick={newGame} className="new-game">New Game</button>
        <button onClick={giveUp} className="give-up">Give Up</button>
      </div>
  </div>
  );
}

export default App;
