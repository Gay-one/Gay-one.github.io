window.onload=()=>{
    var board = document.getElementById('board');
    var message = document.querySelector('.result');
    var currentPlayer = 'X';
    var gameActive = true;
    var coin = 0
    var O_s = 0
    var X_s = 0
    // สร้างบอร์ด และสร้างค่ารับ event
    for (let i = 0; i < 3; i++) {
        const row = board.insertRow(i);
        for (let j = 0; j < 3; j++) {
            var cell = row.insertCell(j);
            cell.addEventListener('click', () => makeMove(i, j));
        }
    }

    // ค่าตารางบอร์ด
    const state = [['', '', ''], ['', '', ''], ['', '', '']];
    // เดิน
    function makeMove(row, col) {
        if (gameActive && state[row][col] === '') {
            state[row][col] = currentPlayer;
            renderBoard(row, col);
            if (checkWinner()) {
                message.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                restart();
                if(currentPlayer=='O'){
                    O_s++
                    setTimeout(() => {
                    alert('โห่ ไอ้ควายแพ้ BOT')
                    document.getElementById("O").innerHTML = `BOT Score ${O_s}`
                }, 500);}
                if(currentPlayer=='X'){
                    X_s++
                    setTimeout(() => {
                    alert('Good Good Not Bad')
                    document.getElementById("X").innerHTML = `Player Score ${X_s}`
                }, 500);}
            } else if (isBoardFull()) {
                message.textContent = "It's a tie!";
                gameActive = false
                restart();
                setTimeout(() => {
                    alert('อย่ายอมแพ้ BOT มันโง่เล่นไปเรื่อยๆเดี่ยวก็ชนะ') 
                }, 500);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                coin++
                console.log(`ตำแหน่งที่ ${coin} ${currentPlayer}`)
                if (currentPlayer === 'O') {
                    makeBotMove();
                }
            }
        }
    }

    function renderBoard(i, j) {
        board.rows[i].cells[j].textContent = state[i][j];
    }
    // checkWinner
    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (state[i][0] !== '' && state[i][0] === state[i][1] && state[i][0] === state[i][2]) {
                return true; // แนวนอน
            }
            if (state[0][i] !== '' && state[0][i] === state[1][i] && state[0][i] === state[2][i]) {
                return true; // แนวตั้ง
            }
        }
        // แนวเฉียง
        if (state[0][0] !== '' && state[0][0] === state[1][1] && state[0][0] === state[2][2]) {
            return true;
        }
        if (state[0][2] !== '' && state[0][2] === state[1][1] && state[0][2] === state[2][0]) {
            return true;
        }
        return false;
    }
    //ตรวจสอบตารางเต็ม
    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }
    // BOT เดิน
    function makeBotMove() {
        let point = 0
        const emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] === '') {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
        // ตรรกะ BOT
        if (emptyCells.length > 0) {
            for (let i = 0; i < 3; i++) {
            //แนวเฉียง
            if ((state[0][0]=='O' && state[1][1]=='O' && state[2][2]=='') || (state[0][0]=='X' && state[1][1]=='X' && state[2][2]=='')) {
                makeMove(2, 2)
                console.log('N')
                break;
            }else if((state[0][0]=='O' && state[2][2]=='O' && state[1][1]=='') || (state[0][0]=='X' && state[2][2]=='X' && state[1][1]=='')){
                makeMove(1, 1)
                console.log('O')
                break;
            }else if((state[1][1]=='O' && state[2][2]=='O' && state[0][0]=='') || (state[1][1]=='X' && state[2][2]=='X' && state[0][0]=='')){
                makeMove(0, 0)
                console.log('T')
                break;
            }else if((state[0][2]=='O' && state[1][1]=='O' && state[2][0]=='') || (state[0][2]=='X' && state[1][1]=='X' && state[2][0]=='')){
                makeMove(2, 0)
                console.log('J')
                break;
            }else if((state[0][2]=='O' && state[2][0]=='O' && state[1][1]=='') || (state[0][2]=='X' && state[2][0]=='X' && state[1][1]=='')){
                makeMove(1, 1)
                console.log('M')
                break;
            }else if((state[2][0]=='O' && state[1][1]=='O' && state[0][2]=='') || (state[2][0]=='X' && state[1][1]=='X' && state[0][2]=='')){
                makeMove(0, 2)
                console.log('L')
                break;
            }
            //แนวนอน แนวตั้ง
            else if((state[i][0]=='O' && state[i][1]=='O' && state[i][2]=='') || (state[i][0]=='X' && state[i][1]=='X' && state[i][2]=='')){
                makeMove(i, 2)
                console.log('V')
                break;
            }else if((state[i][0]=='O' && state[i][2]=='O' && state[i][1]=='') || (state[i][0]=='X' && state[i][2]=='X' && state[i][1]=='')){
                makeMove(i, 1)
                console.log('K')
                break;
            }else if((state[i][1]=='O' && state[i][2]=='O' && state[i][0]=='') || (state[i][1]=='X' && state[i][2]=='X' && state[i][0]=='')){
                makeMove(i, 0)
                console.log('I')
                break;
            }else if((state[0][i]=='O' && state[1][i]=='O' && state[2][i]=='') || (state[0][i]=='X' && state[1][i]=='X' && state[2][i]=='')){
                makeMove(2, i)
                console.log('G')
                break;
            }else if((state[0][i]=='O' && state[2][i]=='O' && state[1][i]=='') || (state[0][i]=='X' && state[2][i]=='X' && state[1][i]=='')){
                makeMove(1, i)
                console.log('C')
                break;
            }else if((state[2][i]=='O' && state[1][i]=='O' && state[0][i]=='') || (state[2][i]=='X' && state[1][i]=='X' && state[0][i]=='')){
                makeMove(0, i)
                console.log('B')
                break;
            }else if(state[1][1]=='X' && (state[0][0]=='' &&state[0][1]=='' &&state[0][2]=='' &&state[1][0]=='' &&state[1][2]=='' &&state[2][0]=='' &&state[2][1]=='' &&state[2][2]=='')){
                let randoms = Math.floor(Math.random() * 4)
                console.log(randoms)
                switch (randoms) {
                    case 0:
                        makeMove(0, 0)
                        break;
                    case 1:
                        makeMove(0, 2)
                        break;
                    case 2:
                        makeMove(2, 0)
                        break;
                    case 3:
                        makeMove(2, 2)
                        break;
                    default:
                        break;
                }
            break;
            }else if((state[1][1]=='' && (state[1][0]=='X'||state[1][2]=='X'||state[0][0]=='X' ||state[0][1]=='X' ||state[0][2]=='X' ||state[2][0]=='X' ||state[2][1]=='X' ||state[2][2]=='X'))){
                makeMove(1, 1)
                console.log('E')
                break;
            }else if((state[1][0]=='X'&&state[2][1]=='X'&&state[2][0]=='')||(state[1][2]=='X'&&state[2][1]=='X'&&state[2][2]=='')||(state[1][0]=='X'&&state[0][1]=='X'&&state[0][0]=='')||(state[1][2]=='X'&&state[0][1]=='X'&&state[0][2]=='')){
                console.log('YEE')
                if(state[1][0]=='X'&&state[2][1]=='X'&&state[2][0]==''){
                    makeMove(2, 0)
                    break;
                }else if(state[1][2]=='X'&&state[2][1]=='X'&&state[2][2]==''){
                    makeMove(2, 2)
                    break;
                }else if(state[1][0]=='X'&&state[0][1]=='X'&&state[0][0]==''){
                    makeMove(0, 0)
                    break;
                }else if(state[1][2]=='X'&&state[0][1]=='X'&&state[0][2]==''){
                    makeMove(0, 2)
                    break;
                }else{
                    continue;
                }
            }else if((point==2)&&((state[1][0]=='X'&&state[1][1]=='X')||(state[1][2]=='X'&&state[1][1]=='X')&&(state[0][1]==''||state[2][1]==''))){
                console.log('H')
                if (state[0][1]=='') {
                    makeMove(0, 1)
                    break;
                }else if(state[2][1]==''){
                    makeMove(2, 1)
                    break;
                }else{
                    continue;
                }
            }
            else if (point==2){
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const { row, col } = emptyCells[randomIndex];
            makeMove(row, col)
            console.log('A')
            break;
            }
            point++
        }
        }
    }
    // button-restart
    restart=()=>{
                let div = document.createElement('form');
                let continue_div = document.createElement('input');
                continue_div.setAttribute("type", "button");
                continue_div.value='Restart'
                div.appendChild(continue_div);
                document.body.insertBefore(div, document.body.firstChild);
                continue_div.addEventListener('click', () => {
                    for (let i = 0; i < 3; i++) {
                      for (let j = 0; j < 3; j++) {
                        state[i][j] = '';
                        board.rows[i].cells[j].textContent = '';
                      }
                    }
                    gameActive=true;
                    div.remove();
                    message.textContent =''
                    currentPlayer = 'X';
                  });
    }
}