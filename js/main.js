// グローバル変数
// ボタンを押して選択された文字を記憶する
var selectedLetter = null;
var selectedImage = null;
var getCheckGroupsDataFlag = false;
var checkGroups;
// 特定のセルが正しい文字で埋められているかチェックする
function checkCorrectness(group, alertMessage) {
  var allCorrect = true;
  for (var i = 0; i < group.specificCells.length; i++) {
    // cellを取得
    var cell = $(group.specificCells[i]);
    // cell内のimgタグを取得
    var img = cell.find('img');
    if (img.data('letter') !== cell.data('correct-letter')) {
      allCorrect = false;
      break;
    }
  }
  if (allCorrect && !group.alertShown) {
    alert(alertMessage);
    group.alertShown = true;
  }
}

// 文字選択ボタンをクリックしたときの処理
$('.letter-button').click(function () {
  // 選択された文字を記憶する
  selectedLetter = $(this).data('letter');
  selectedImage = $(this).data('img');
  console.log("selectedLetter: " + selectedLetter);
});

// マスをクリックしたときの処理
  $(document).on('click', '.cell-content', function() {
  // 緑色のマスは変更できないように
  var bgColor = $(this).css('background-color');
  // TODO:判定に背景色を使わないほうがいい
  if (bgColor === 'rgb(144, 238, 144)') {
    return;
  }

  // すでにマスに文字が配置されている場合、その文字のボタンを再表示する
  var img = $(this).find('img');
  var existingLetter = img.data('letter');
  if (existingLetter) {
    $('.letter-button[data-letter="' + existingLetter + '"]').show();
  }

  if (selectedLetter) {
    // マスに選択した文字を配置する（将来的には指文字画像を配置）
    $(this).text(selectedLetter);
    $(this).html('<img class="hand-syuwa-on-cell" data-letter="' + selectedLetter + '" src="' + selectedImage + '" alt="選択された画像">');
    // 選択した文字のボタンを非表示にする
    $('.letter-button[data-letter="' + selectedLetter + '"]').hide();
    // もし選択された文字が正しければ、マスの背景色を変更する
    if ($(this).data('correct-letter') === selectedLetter) {
      $(this).css('background-color', 'rgb(144 238 144)');
    } else {
      $(this).css('background-color', '');
    }
    selectedLetter = null;
    selectedImage = null;
    
    // 答え格納データを初回だけ更新するように
    if(!getCheckGroupsDataFlag) {
      console.log("更新")
      var checkGroupsData = $('body').attr('data-check-groups');
      if (checkGroupsData) {
          try {
              checkGroups = JSON.parse(checkGroupsData);
              getCheckGroupsDataFlag = true;
          } catch (e) {
              console.error('Invalid JSON:', checkGroupsData);
          }
      } else {
          console.error('No data-check-groups attribute found');
      }
    } 
    
    // 特定のセルが正しい文字で埋められているかチェックする
    for (var i = 0; i < checkGroups.length; i++) {
      if (checkGroups[i].alertShown) {
        continue;
      } else {
        checkCorrectness(checkGroups[i], (i + 1) + '、正解です！');
      }
    }

  } else {
    // マスに配置された文字のボタンを再表示する
    var letter = $(this).text();
    $('.letter-button[data-letter="' + letter + '"]').show();
    $(this).text('');
    // マスの背景色を元に戻す
    $(this).css('background-color', '');
  }
});