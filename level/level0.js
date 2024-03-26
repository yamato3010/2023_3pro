let mondai = [];
mondai[0] = {
    board:
        [
            [1, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
};

mondai[0].quiz =
    [
        { kagi: "あきらって誰？", ans: "あきら", loc: [0, 0], direction: "vertical" },
        { kagi: "あいうえ", ans: "あいうえ", loc: [0, 0], direction: "horizontal" },
        { kagi: "かきくけ", ans: "あいうえ", loc: [3, 1], direction: "horizontal" },
        { kagi: "チョコレートうまい", ans: "あいうえ", loc: [3, 1], direction: "vertical" }
    ];

const board = document.querySelector("#board");

{/* <div class="cell">
<span class="cell-number">1</span>
<div class="cell-content" data-correct-letter="a" id="cell-1"></div>
</div> */}


for (let cy = 0; cy < mondai[0].board.length; cy++) {
    for (let cx = 0; cx < mondai[0].board[cy].length; cx++) {
        console.log(mondai[0].board[cy][cx]);
        let cell_elm = document.createElement("div");
        cell_elm.className = "cell";
        let span_elm = document.createElement("span");
        span_elm.className = "cell-number";
        if (mondai[0].board[cy][cx]) {
            span_elm.innerHTML = mondai[0].board[cy][cx];
        }
        let cell_con_elm = document.createElement("div");
        cell_elm.appendChild(span_elm);
        cell_elm.appendChild(cell_con_elm);
        board.appendChild(cell_elm);
    }
}

const vertical_key = document.querySelector("#vertical");
const horizontal_key = document.querySelector("#horizontal");

for (let q of mondai[0].quiz) {
    console.log(q);
    let q_elm = document.createElement("li");
    q_elm.innerHTML = mondai[0].board[q.loc[0]][q.loc[1]]+ "." + q.kagi;
    if (q.direction == "vertical") {
        vertical_key.appendChild(q_elm);
    } else if (q.direction == "horizontal") {
        horizontal_key.appendChild(q_elm);
    }
}
"あいうえおかきくけこ…"