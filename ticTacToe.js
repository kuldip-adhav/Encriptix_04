let game = {
    board: [],
    currentPlayer: 'X',
    winner: null,
    gameOver: false,
  
    init: function() {
      for (let i = 1; i <= 9; i++) {
        this.board.push('');
      }
    },
  
    handleClick: function(cellId) {
      if (this.gameOver) return;
      let cellIndex = parseInt(cellId.replace('cell-', '')) - 1;
      if (this.board[cellIndex] === '') {
        this.board[cellIndex] = this.currentPlayer;
        document.getElementById(cellId).textContent = this.currentPlayer;
        this.checkWin();
        this.currentPlayer = this.currentPlayer === 'X'? 'O' : 'X';
      }
    },
  
    checkWin: function() {
      let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i];
        let symbol = this.board[condition[0]];
        if (symbol!== '' && symbol === this.board[condition[1]] && symbol === this.board[condition[2]]) {
          this.winner = symbol;
          this.gameOver = true;
          alert(`Player ${symbol} wins!`);
          return;
        }
      }
  
      if (!this.board.includes('')) {
        this.gameOver = true;
        alert('It\'s a draw!');
      }
    }
  };
  
  game.init();
  
  document.querySelectorAll('#game-board td').forEach(cell => {
    cell.addEventListener('click', function() {
      let cellId = this.id;
      game.handleClick(cellId);
    });
  });