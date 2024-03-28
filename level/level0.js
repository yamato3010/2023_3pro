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
// loc は [x, y]
mondai[0].quiz =
  [
    { kagi: "あきらって誰？", ans: "a ki ra", loc: [0, 0], direction: "vertical" },
    { kagi: "あいうえ", ans: "a i u e", loc: [4, 0], direction: "horizontal" },
    { kagi: "かきくけ", ans: "ka ki ku ke", loc: [1, 3], direction: "horizontal" },
    { kagi: "チョコレートうまい", ans: "a i u", loc: [1, 7], direction: "vertical" }
  ];

const board = document.querySelector("#board");

{/* <div class="cell">
<span class="cell-number">1</span>
<div class="cell-content" data-correct-letter="a" id="cell-1"></div>
</div> */}

let cellNum = 0;

for (let cy = 0; cy < mondai[0].board.length; cy++) {
  for (let cx = 0; cx < mondai[0].board[cy].length; cx++) {
    cellNum++;
    console.log(mondai[0].board[cy][cx]);
    let cell_elm = document.createElement("div");
    cell_elm.className = "cell";
    let span_elm = document.createElement("span");
    span_elm.className = "cell-number";
    if (mondai[0].board[cy][cx]) {
      span_elm.innerHTML = mondai[0].board[cy][cx];
    }
    let cell_con_elm = document.createElement("div");
    // class名とセル番号を追加
    cell_con_elm.className = "cell-content";
    cell_con_elm.id = "cell-" + cellNum;
    cell_elm.appendChild(span_elm);
    cell_elm.appendChild(cell_con_elm);
    board.appendChild(cell_elm);
  }
}

const vertical_key = document.querySelector("#vertical");
const horizontal_key = document.querySelector("#horizontal");
// ゲームのメイン処理に使用される正誤判定用のdataCheckGroupsを定義
let dataCheckGroups = []

for (let q of mondai[0].quiz) {
  console.log(q);
  // ヒントエリアの描画
  let q_elm = document.createElement("li");
  q_elm.innerHTML = mondai[0].board[q.loc[0]][q.loc[1]] + "." + q.kagi;
  if (q.direction == "vertical") {
    vertical_key.appendChild(q_elm);
  } else if (q.direction == "horizontal") {
    horizontal_key.appendChild(q_elm);
  }

  // dataCheckGroupsに枠組みを追加
  dataCheckGroups.push({
    specificCells: [],
    alertShown: false
  })

  // cellのdata-correct-letterプロパティに正解の文字を追加
  let ansArr = q.ans.split(" ");
  // 縦の場合
  if (q.direction == "vertical") {
    let y = q.loc[1];
    // 答えの配列でループ
    for (let i = 0; i < ansArr.length; i++) {
      // 十の位が0の場合、先頭に0をつけないように
      if (y == 0) {
        console.log("答えを追加：#cell-" + (q.loc[0] + 1) + ":" + ansArr[i])
        let element = document.getElementById("cell-" + (q.loc[0] + 1));
        element.setAttribute("data-correct-letter", ansArr[i]);
        // dataCheckGroupsのspecificCells配列にcell名を追加
        dataCheckGroups[dataCheckGroups.length - 1].specificCells.push("#cell-" + (q.loc[0] + 1));
      } else {
        console.log("答えを追加：#cell-" + y + (q.loc[0] + 1) + ":" + ansArr[i])
        let element = document.getElementById("cell-" + y + (q.loc[0] + 1));
        element.setAttribute("data-correct-letter", ansArr[i]);
        // dataCheckGroupsのspecificCells配列にcell名を追加
        dataCheckGroups[dataCheckGroups.length - 1].specificCells.push("#cell-" + y + (q.loc[0] + 1));
      }
      y++;
    }
    // 横の場合  
  } else if (q.direction == "horizontal") {
    let x = q.loc[0];
    let y = q.loc[1];
    // 答えの配列でループ
    for (let i = 0; i < ansArr.length; i++) {
      // 十の位が0の場合、先頭に0をつけないように
      if (y == 0) {
        console.log("答えを追加：#cell-" + (x + 1) + ":" + ansArr[i])
        let element = document.getElementById("cell-" + (x + 1));
        element.setAttribute("data-correct-letter", ansArr[i]);
        // dataCheckGroupsのspecificCells配列にcell名を追加
        dataCheckGroups[dataCheckGroups.length - 1].specificCells.push("#cell-" + (x + 1))
      } else {
        console.log("答えを追加：#cell-" + y + (x + 1) + ":" + ansArr[i])
        let element = document.getElementById("cell-" + y + (x + 1));
        element.setAttribute("data-correct-letter", ansArr[i]);
        // dataCheckGroupsのspecificCells配列にcell名を追加
        dataCheckGroups[dataCheckGroups.length - 1].specificCells.push("#cell-" + y + (x + 1))
      }
      x++;
    }
  }
  // bodyタグのdata-check-groupsプロパティにJSON形式の文字列を追加
  // bodyタグを取得
  let body_elm = document.querySelector("body");
  // data-check-groupsプロパティを追加
  body_elm.setAttribute("data-check-groups", JSON.stringify(dataCheckGroups));

}
"あいうえおかきくけこ…"