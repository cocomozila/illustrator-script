/////////////////////////////////////////////////////////////////
// Divide TextFrame v1.0 -- Adobe Illustrator CC 2025
// 
// - 작성자: 조세윤
// - 작성날짜: 2025.04.14
// - GitHub: github.com/cocomozila
// 
// - 문의
// - Email: joseyun94@gmail.com
//
// 설명: 선택된 여러 텍스트 프레임의 내용을 하나의 텍스트 프레임으로 합칩니다.
//       합칠 때 각 텍스트 프레임의 내용은 줄바꿈("\r")으로 구분됩니다.
/////////////////////////////////////////////////////////////////

if (activeDocument.selection.length < 2) {
    alert("최소 2개의 텍스트 프레임을 선택해 주세요.");
} else {
    // 선택한 항목 중 텍스트프레임인 것만 배열에 담기
    var frames = [];
    for (var i = 0; i < activeDocument.selection.length; i++) {
        if (activeDocument.selection[i].typename === "TextFrame") {
            frames.push(activeDocument.selection[i]);
        }
    }
    
    if (frames.length < 2) {
        alert("선택된 객체 중 텍스트 프레임이 2개 이상 있어야 합니다.");
    } else {
        // 텍스트 프레임들을 top 값 기준(상단 우선)으로 정렬
        // Illustrator에서는 top 값이 작을수록 페이지 상단에 위치한 것으로 간주합니다.
        frames.sort(function(a, b) { 
            return a.top - b.top; 
        });
        
        // 첫 번째 텍스트 프레임을 기준으로 텍스트 합치기
        var mainFrame = frames[0];
        var joinedText = mainFrame.contents.toString();
        
        // 두 번째 프레임부터 각 텍스트를 줄바꿈(\r)으로 구분하여 연결
        for (var j = 1; j < frames.length; j++){
            joinedText += "\r" + frames[j].contents.toString();
        }
        
        // 합쳐진 텍스트를 첫 번째 텍스트 프레임에 설정
        mainFrame.contents = joinedText;
        
        // 합친 후 나머지 텍스트 프레임 삭제 (역순으로 삭제)
        for (var k = frames.length - 1; k > 0; k--){
            frames[k].remove();
        }
        
        alert("텍스트 프레임이 하나로 합쳐졌습니다.");
    }
}