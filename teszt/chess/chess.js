
/* EZT A KÓDOT INKÁBB NE NÉZD MEG, DE A HTML-T SE.... */

var selected_piece
var selected_color
var selected_square
var is_selected = false
var next_move = 'w'

var checking = false
var all_move = []

var from_square
var from2_square

var is_check = false
var dead_piece
var good_squares = []

var move_square
var move2_square
var move_color

var squares = [['11', '21', '31', '41', '51', '61', '71', '81'],
              ['12', '22', '32', '42', '52', '62', '72', '82'],
              ['13', '23', '33', '43', '53', '63', '73', '83'],
              ['14', '24', '34', '44', '54', '64', '74', '84'],
              ['15', '25', '35', '45', '55', '65', '75', '85'],
              ['16', '26', '36', '46', '56', '66', '76', '86'],
              ['17', '27', '37', '47', '57', '67', '77', '87'],
              ['18', '28', '38', '48', '58', '68', '78', '88']]

var pieces = ['pawn1', 'pawn2', 'pawn3', 'pawn4', 'pawn5', 'pawn6', 'pawn7', 'pawn8', 'lrook', 'lknight', 'lbishop', 'queen', 'king', 'rbishop', 'rknight', 'rrook']

function select(piece) {
    if (piece.charAt(0) == next_move) {
        if (selected_square != null && selected_square != from_square) {
            selected_square.style.background = selected_color;
        }
    
        selected_piece = document.getElementById(piece)
        selected_square = selected_piece.parentElement
        selected_color = selected_square.style.background;
        
        selected_square.style.background = 'orange'

        is_selected = true;
        check(piece)
    }
}

function move(square) {
    if (is_selected && good_squares.includes(square)) {
        if (square != selected_square.id) {
            if (move_square != null && from_square != null) {
                move_square.style.background = move_color
                from_square.style.background = selected_color

                move2_square = move_square
                from2_square = from_square
            }

            if (selected_piece.id.includes('w_pawn') && square.charAt(0) != selected_square.id.charAt(0) && document.getElementById(square).innerHTML == '') {
                document.getElementById(square.charAt(0) + (square.charAt(1) -1)).innerHTML = ''
                console.log('en passant!')
            }

            if (selected_piece.id.includes('b_pawn') && square.charAt(0) != selected_square.id.charAt(0) && document.getElementById(square).innerHTML == '') {
                document.getElementById(square.charAt(0) + (Number(square.charAt(1)) +1)).innerHTML = ''
                console.log('en passant!')
            }

            move_square = document.getElementById(square);
            move_color = move_square.style.background;
            dead_piece = move_square.innerHTML;
            move_square.innerHTML = selected_square.innerHTML;
            selected_square.innerHTML = '';
            is_selected = false

            from_square = selected_square
            move_square.style.background = 'darkorange'

            if (next_move == 'w') {
                next_move = 'b'
            } else {
                next_move = 'w'
            }
        }

        if (check_if_check(document.getElementById('w_king').parentElement.id, 'b') && next_move == 'b') {
            undo_move()
        } 
        
        if (check_if_check(document.getElementById('b_king').parentElement.id, 'w') && next_move == 'w') {
            undo_move()
        }

        checkmate(next_move)
    }
}

function check(piece) {
    good_squares = []
   
    var rook_u = true
    var rook_d = true
    var rook_r = true
    var rook_l = true

    var bishop_u = true
    var bishop_d = true
    var bishop_r = true
    var bishop_l = true

    if (piece.includes('knight') || piece.includes('pawn') || piece.includes('king')) {
        for (var i in squares) {
            for (var e in squares[i]) {
                s = squares[i][e]

                if (piece.includes('knight')) {
                    x = s.charAt(0) - selected_square.id.charAt(0)
                    y = s.charAt(1) - selected_square.id.charAt(1)
    
                    if (x < 0) x *= -1
                    if (y < 0) y *= -1
    
                    if (x != 0 && y != 0) {
                        if (x + y == 3) {
                            if (document.getElementById(s).innerHTML != '') {
                                if (document.getElementById(s).childNodes[0].id.charAt(0) != piece.charAt(0)) {
                                    good_squares.push(s)
                                }
                            } else good_squares.push(s)
                        }
                    }
                }
    
                if (piece.includes('pawn')) {
                    x = s.charAt(0) - selected_square.id.charAt(0)
                    y = s.charAt(1) - selected_square.id.charAt(1)
    
                    if (x < 0) x *= -1
                    if (y < 0) y *= -1
    
                    if (next_move == 'w') {
                        if (x == 0 && y == 1 && selected_square.id.charAt(1) < s.charAt(1) && document.getElementById(s).innerHTML == '') {
                            good_squares.push(s)
                        }

                        if (x == 0 && y == 2 && document.getElementById(squares[2][e]).innerHTML == '' && document.getElementById(squares[3][e]).innerHTML == '' && selected_square.id.charAt(1) == '2') {
                            good_squares.push(s)
                        }

                        if (x == 1 && y == 1 && selected_square.id.charAt(1) < s.charAt(1) && document.getElementById(s).innerHTML != '') {
                            if (document.getElementById(s).childNodes[0].id.charAt(0) == 'b') {
                                good_squares.push(s)
                            }    
                        }
    
                        if (x == 1 && y == 0 && selected_square.id.charAt(1) == '5' && document.getElementById(s).innerHTML.includes('b_pawn') && move_square.id == s && from_square.id.charAt(1) == '7') {
                            good_squares.push(squares[Number(i) + 1][e])
                        }
                    }
    
                    if (next_move == 'b') {
                        if (x == 0 && y == 1 && selected_square.id.charAt(1) > s.charAt(1) && document.getElementById(s).innerHTML == '') {
                            good_squares.push(s)
                        }

                        if (x == 0 && y == 2 && document.getElementById(squares[5][e]).innerHTML == '' && document.getElementById(squares[4][e]).innerHTML == '' && selected_square.id.charAt(1) == '7') {
                            good_squares.push(s)
                        }    

                        if (x == 1 && y == 1 && selected_square.id.charAt(1) > s.charAt(1) && document.getElementById(squares[i][e]).innerHTML != '') {
                            if (document.getElementById(s).childNodes[0].id.charAt(0) == 'w') {
                                good_squares.push(s)
                            }   
    
                        }

                        if (x == 1 && y == 0 && selected_square.id.charAt(1) == '4' && document.getElementById(s).innerHTML.includes('w_pawn') && move_square.id == s && from_square.id.charAt(1) == '2') {
                            good_squares.push(squares[Number(i) - 1][e])
                        }
                    }
                }

                if (piece.includes('king')) {
                    x = s.charAt(0) - selected_square.id.charAt(0)
                    y = s.charAt(1) - selected_square.id.charAt(1)
    
                    if (x < 0) x *= -1
                    if (y < 0) y *= -1

                    if (x + y == 1 || x == 1 && y == 1) {
                        if (document.getElementById(s).innerHTML != '') {
                            if (document.getElementById(s).childNodes[0].id.charAt(0) != piece.charAt(0)) {
                                good_squares.push(s)
                            }
                        }
                        else good_squares.push(s)
                    }
                }
            }    
        }
    }
    if (piece.includes('rook') || piece.includes('queen')) {
        for (var i = (Number(selected_square.id.charAt(0)) + 1); i < 9; i++) {
            if (rook_r) {
                if (document.getElementById(String(i) + selected_square.id.charAt(1)).innerHTML != '') {
                    if (document.getElementById(String(i) + selected_square.id.charAt(1)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        rook_r = false
                    }
                    else {
                        good_squares.push(String(i) + selected_square.id.charAt(1))
                        rook_r = false
                    }
                }
                else good_squares.push(String(i) + selected_square.id.charAt(1))
            }
        }

        for (var i = (Number(selected_square.id.charAt(0)) - 1); i > 0; i--) {
            if (rook_l) {
                if (document.getElementById(String(i) + selected_square.id.charAt(1)).innerHTML != '') {
                    if (document.getElementById(String(i) + selected_square.id.charAt(1)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        rook_l = false
                    }
                    else {
                        good_squares.push(String(i) + selected_square.id.charAt(1))
                        rook_l = false
                    }
    
                }
                else good_squares.push(String(i) + selected_square.id.charAt(1))
            }
        }
    
        for (var i = (Number(selected_square.id.charAt(1)) + 1); i < 9; i++) {
            if (rook_u) {
                if (document.getElementById(selected_square.id.charAt(0) + String(i)).innerHTML != '') {
                    if (document.getElementById(selected_square.id.charAt(0) + String(i)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        rook_u = false
                    }
                    else {
                        good_squares.push(selected_square.id.charAt(0) + String(i))
                        rook_u = false
                    }
    
                }
                else good_squares.push(selected_square.id.charAt(0) + String(i))
            }
        }
    
        for (var i = (Number(selected_square.id.charAt(1)) - 1); i > 0; i--) {
            if (rook_d) {
                if (document.getElementById(selected_square.id.charAt(0) + String(i)).innerHTML != '') {
                    if (document.getElementById(selected_square.id.charAt(0) + String(i)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        rook_d = false
                    }
                    else {
                        good_squares.push(selected_square.id.charAt(0) + String(i))
                        rook_d = false
                    }
    
                }
                else good_squares.push(selected_square.id.charAt(0) + String(i))
            }
        }
    }

    if (piece.includes('bishop') || piece.includes('queen')) {
        if (8 - Number(selected_square.id.charAt(0)) > 8 - Number(selected_square.id.charAt(1))) {
            e = 8 - Number(selected_square.id.charAt(1))
        }
        else e = 8 - Number(selected_square.id.charAt(0))

        for (var i = 1; i < e + 1; i++) {
            if (bishop_r) {
                if (document.getElementById(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) + i)).innerHTML != '') {
                    if (document.getElementById(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) + i)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        bishop_r = false
                    }
                    else {
                        good_squares.push(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) + i))
                        bishop_r = false
                    }
                }
                else {
                    good_squares.push(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) + i))
                }
            }
        }

        if (8 - Number(selected_square.id.charAt(0)) > Number(selected_square.id.charAt(1)) - 1) {
            e = Number(selected_square.id.charAt(1)) - 1
        }
        else e = 8 - Number(selected_square.id.charAt(0))

        for (var i = 1; i < e + 1; i++) {
            if (bishop_d) {
                if (document.getElementById(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) - i)).innerHTML != '') {
                    if (document.getElementById(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) - i)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        bishop_d = false
                    }
                    else {
                        good_squares.push(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) - i))
                        bishop_d = false
                    }

                }
                else good_squares.push(String(Number(selected_square.id.charAt(0)) + i) + String(Number(selected_square.id.charAt(1)) - i))
            }
        }

        if (Number(selected_square.id.charAt(0)) > Number(selected_square.id.charAt(1)) - 1) {
            e = Number(selected_square.id.charAt(1)) - 1
        }
        else e = Number(selected_square.id.charAt(0)) -1

        for (var i = 1; i < e + 1; i++) {
            if (bishop_l) {
                if (document.getElementById(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) - i)).innerHTML != '') {
                    if (document.getElementById(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) - i)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        bishop_l = false
                    }
                    else {
                        good_squares.push(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) - i))
                        bishop_l = false
                    }
                }
                else good_squares.push(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) - i))
            }
        }

        if  (Number(selected_square.id.charAt(0)) > 8 - Number(selected_square.id.charAt(1)) - 1) {
            e = 8 - Number(selected_square.id.charAt(1))
        }
        else e = Number(selected_square.id.charAt(0)) -1

        for (var i = 1; i < e + 1; i++) {
            if (bishop_u) {
                if (document.getElementById(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) + i)).innerHTML != '') {
                    if (document.getElementById(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) + i)).childNodes[0].id.charAt(0) == piece.charAt(0)) {
                        bishop_u = false
                    }
                    else {
                        good_squares.push(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) + i))
                        bishop_u = false
                    }
                }
                else good_squares.push(String(Number(selected_square.id.charAt(0)) - i) + String(Number(selected_square.id.charAt(1)) + i))
            }
        }
    }
}

function check_if_check(pos, c) {
    is_check = false
    if (c != 'w') {
        if (pos.charAt(1) != 8) {
            if (document.getElementById(String(Number(pos.charAt(0)) + 1) + String(Number(pos.charAt(1)) + 1)).innerHTML != '') {
                if (document.getElementById(String(Number(pos.charAt(0)) + 1) + String(Number(pos.charAt(1)) + 1)).childNodes[0].id.includes('b_pawn')) {
                    is_check = true
                }
            }
    
            if (document.getElementById(String(Number(pos.charAt(0)) - 1) + String(Number(pos.charAt(1)) + 1)).innerHTML != '') {
                if (document.getElementById(String(Number(pos.charAt(0)) - 1) + String(Number(pos.charAt(1)) + 1)).childNodes[0].id.includes('b_pawn')) {
                    is_check = true
                }
            }
        }
    }

    if (c != 'b') {
        if (pos.charAt(1) != 1) {
            if (document.getElementById(String(Number(pos.charAt(0)) + 1) + String(Number(pos.charAt(1)) - 1)).innerHTML != '') {
                if (document.getElementById(String(Number(pos.charAt(0)) + 1) + String(Number(pos.charAt(1)) - 1)).childNodes[0].id.includes('w_pawn')) {
                    is_check = true
                }
            }
    
            if (document.getElementById(String(Number(pos.charAt(0)) - 1) + String(Number(pos.charAt(1)) - 1)).innerHTML != '') {
                if (document.getElementById(String(Number(pos.charAt(0)) - 1) + String(Number(pos.charAt(1)) - 1)).childNodes[0].id.includes('w_pawn')) {
                    is_check = true
                }
            }
        }        
    }

    for (var i = Number(pos.charAt(0)) + 1; i < 9; i++) {
        if (document.getElementById(String(i) + pos.charAt(1)).innerHTML != '') {
            if (document.getElementById(String(i) + pos.charAt(1)).childNodes[0].id.includes((c))) {
                if (document.getElementById(String(i) + pos.charAt(1)).childNodes[0].id.includes(('queen')) || document.getElementById(String(i) + pos.charAt(1)).childNodes[0].id.includes('rook')) {
                    is_check = true
                }
                else break

            }
            else break            
        }
    }

    for (var i = Number(pos.charAt(0)) - 1; i > 0; i--) {
        if (document.getElementById(String(i) + pos.charAt(1)).innerHTML != '') {
            if (document.getElementById(String(i) + pos.charAt(1)).childNodes[0].id.includes((c))) {
                if (document.getElementById(String(i) + pos.charAt(1)).childNodes[0].id.includes(('queen')) || document.getElementById(String(i) + pos.charAt(1)).childNodes[0].id.includes('rook')) {
                    is_check = true
                }
                else break
            }
            else break            
        }
    }

    for (var i = Number(pos.charAt(1)) + 1; i < 9; i++) {
        if (document.getElementById(pos.charAt(0) + String(i)).innerHTML != '') {
            if (document.getElementById(pos.charAt(0) + String(i)).childNodes[0].id.includes((c))) {
                if (document.getElementById(pos.charAt(0) + String(i)).childNodes[0].id.includes(('queen')) || document.getElementById(pos.charAt(0) + String(i)).childNodes[0].id.includes('rook')) {
                    is_check = true
                }
                else break
            }
            else break    
        }
    }

    for (var i = Number(pos.charAt(1)) - 1; i > 0; i--) {
        if (document.getElementById(pos.charAt(0) + String(i)).innerHTML != '') {
            if (document.getElementById(pos.charAt(0) + String(i)).childNodes[0].id.includes((c))) {
                if (document.getElementById(pos.charAt(0) + String(i)).childNodes[0].id.includes(('queen')) || document.getElementById(pos.charAt(0) + String(i)).childNodes[0].id.includes('rook')) {
                    is_check = true
                }
                else break
            }
            else break      
        }
    }

    for (var i = 1; i < 8; i++) {
        if(Number(pos.charAt(0)) + i > 8 || Number(pos.charAt(1)) + i > 8) {
            break
        }

        if (document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) + i)).innerHTML != '') {
            if (document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) + i)).childNodes[0].id.charAt(0) == c) {
                if (document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) + i)).childNodes[0].id.includes('bishop') || document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) + i)).childNodes[0].id.includes('queen')) {
                    is_check = true
                }
                else break
            }
            else break
        }
    
    }

    for (var i = 1; i < 8; i++) {
        if(Number(pos.charAt(0)) - i < 1 || Number(pos.charAt(1)) + i > 8) {
            break
        }

        if (document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) + i)).innerHTML != '') {
            if (document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) + i)).childNodes[0].id.charAt(0) == c) {
                if (document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) + i)).childNodes[0].id.includes('bishop') || document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) + i)).childNodes[0].id.includes('queen')) {
                    is_check = true
                }
                else break
            }
            else break
        }
    }

    for (var i = 1; i < 8; i++) {
        if(Number(pos.charAt(0)) + i > 8 || Number(pos.charAt(1)) - i < 1) {
            break
        }

        if (document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) - i)).innerHTML != '') {
            if (document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) - i)).childNodes[0].id.charAt(0) == c) {
                if (document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) - i)).childNodes[0].id.includes('bishop') || document.getElementById(String(Number(pos.charAt(0)) + i) + String(Number(pos.charAt(1)) - i)).childNodes[0].id.includes('queen')) {
                    is_check = true
                }
                else break
            }
            else break
        }
    }

    for (var i = 1; i < 8; i++) {
        if(Number(pos.charAt(0)) - i < 1 || Number(pos.charAt(1)) - i < 1) {
            break
        }

        if (document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) - i)).innerHTML != '') {
            if (document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) - i)).childNodes[0].id.charAt(0) == c) {
                if (document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) - i)).childNodes[0].id.includes('bishop') || document.getElementById(String(Number(pos.charAt(0)) - i) + String(Number(pos.charAt(1)) - i)).childNodes[0].id.includes('queen')) {
                    is_check = true
                }
                else break
            }
            else break
        }
    }

    for (var i in squares) {
        for (var e in squares[i]) {
            s = squares[i][e]
            x = pos.charAt(0) - s.charAt(0)
            y = pos.charAt(1) - s.charAt(1)

            if (x < 0) x *= -1
            if (y < 0) y *= -1

            if (x != 0 && y != 0) {
                if (x + y == 3) {
                    if (document.getElementById(s).innerHTML != '') {
                        if (document.getElementById(s).childNodes[0].id.charAt(0) == c) {
                            if (document.getElementById(s).childNodes[0].id.includes('knight')) {
                                is_check = true
                            }
                        }   
                    }
                }
            }
        }
    }

    if (is_check) return true
}

function undo_move() {
    from_square.innerHTML = move_square.innerHTML;
    move_square.innerHTML = dead_piece;

    move_square.style.backgroundColor = move_color
    from_square = null

    from_square = from2_square
    move_square = move2_square

    from_square.style.background = 'orange'
    move_square.style.background = 'darkorange'

    if (next_move == 'w')  next_move = 'b'
    else next_move = 'w'

    select(selected_piece.id)
}

function checkmate(c) {
    all_move = []
    checking = true
    for (var p in pieces) {
        selected_square = document.getElementById(String(c + '_' + pieces[p])).parentNode;
        selected_piece = document.getElementById(String(c + '_' + pieces[p]));

        check(String(c + '_' + pieces[p]))
        all_move.push(good_squares)
    }

    checking = false
}