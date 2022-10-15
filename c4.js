function start() {
    alert('Choose your side: Red or Yellow')
}
window.addEventListener("DOMContentLoaded", start);

class Connect4 {
    constructor(selector) {
        this.rows = 6
        this.col = 7
        this.player = 'red'
        this.selector = selector
        this.isgameover = false
        this.onplayermove = function() {}
        this.creategrid()
        this.setupEventListeners()
    }
    creategrid() {
        const $board = $(this.selector)
        $board.empty();
        this.isgameover = false
        this.player = 'red'
        for (let row = 0; row < this.rows; row++) {
            const $row = $("<div>").addClass('row');
            for (let col = 0; col < this.cols; col++) {
                const $col = $("<div>")
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr("data-row", row);
                $row.append($col);
            }
            $board.append($row);
        }
    }
    setupEventListeners() {
        const $board = $(this.selector);
        const that = this

        function findLastEmptyCell(col) {
            const cells = $(`.col[data-col = '${col}']`);
            for (let i = cells.length - 1; i >= 0; i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }
        $board.on("mouseenter", ".col.empty", function() {
            if (that.isgameover) return;
            const col = $(this).data("col");
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addclass(`next-${that.player}`)
        })
        $board.on("mouseleave", ".col", function() {
            $(".col").removeClass(`next-${that.player}`);
        });
        $board.on("click", ".col.empty", function() {
            if (that.isgameover) return;
            const col = $(this).data("col");
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data("player", that.player);
            const winner=that.checkForWinner(
                $lastEmptyCell.data("row"),
                $lastEmptyCell.data("col")
            )
            if (winner){
                that.isgameover = true;
                alert ('Game over! $(that.player) has won this round!');
                $(".col.empty").removeClass('empty');
                return;
            }
            that.player = (that.player === 'red') ? 'yellow' : 'red' ;
            that.onplayermove()
            $this.trigger('mouseenter')
        })
    }

checkForWinner(row, col){
    const that= this;
    function $getCell (i,j){
        return $(`.col[data-row="${i}"][data-col = "${j}"]`);
    }    

    function checkDirection(direction){
        let total = 0
        let i = row + direction.i;
        let j = col + direction.j;
        let $next = $getCell (i,j);
        while (i >= 0 && 
        i < that.rows &&
        j >= 0 &&
        j < that.cols &&
        $next.data("player")===that.player) {
            total++;
            i += direction.i;
            j += direction.j;
            $next=$getCell(i,j);
        }
        return total;
       
    }
    function checkwin(directiona,directionb){
        const total=1+
            checkDirection(directiona)+
            checkDirection(directionb);
        if(total>=4){
            return that.player
        }else {
            return null;
        
    }}
    function checkbltotr(){
        return checkwin({i:1 , j:-1} , {i:1, j:1});
    }
    function checktltobr(){
        return checkwin({i:1 , j:1} , {i:-1, j:-1});
    }
    function checkverticals(){
        return checkwin({i:-1 , j:0} , {i:1, j:0});
    
    }    function checkhorizontals(){
        return checkwin({i:0 , j:-1} , {i:0, j:1});
    }
    return checkverticals()||
    checkhotizontals()||
    checktltobr()||
    checkbltotr()
}
restart(){
    this.creategrid();
    this.onplayermove();
}
}
$(document).ready(function(){
    const connect4 = new Connect4("#c4")
    connect4.onplayermove=function(){
        $("#turn").text(connect4.player);

    }
    $("#restart").click(function(){
        connect4.restart();

    })
})
console.log("hi")
