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
// - 설명: 선택한 멀티라인 텍스트 프레임의 내용을 각 줄마다 별도의 텍스트 프레임으로 분리합니다.
//        예시: "HTML5\nCSS5\nJavascript\nReact\nFlutter" → 각 줄이 독립된 텍스트 프레임 생성
//        예시결과: "HTML5", "CSS5", "Javascript", "React", "Flutter"
/////////////////////////////////////////////////////////////////

if (activeDocument.selection.length > 0 && activeDocument.selection[0].typename == "TextFrame") {
    var sel = activeDocument.selection[0];
    var originalText = sel.contents;

    // 텍스트 안에 개행 문자가 없으면 경고 후 중단
    if (originalText.indexOf("\n") == -1 && originalText.indexOf("\r") == -1) {
        alert("이미 한 줄짜리 객체입니다!");
    } else {
        // 원본 텍스트 프레임의 위치와 부모 컨테이너(레이어, 그룹 등) 설정
        var tfTop = sel.top;
        var tfLeft = sel.left;
        var parentContainer = sel.parent;

        // 텍스트 프레임의 내용을 엔터키 기준으로 분리
        var lineArr = fieldToArray(sel);
        
        // 원본 텍스트 프레임에는 첫 번째 줄을 그대로 남김
        sel.contents = lineArr[0];

        // 텍스트 프레임의 leading 값을 가져옴 (leading 값이 0이면 기본값 14 포인트 사용)
        var tr = sel.story.textRange;
        var vSpacing = tr.leading;
        if (!vSpacing || vSpacing == 0) {
            vSpacing = 14;
        }
        
        // 두 번째 줄부터 각 줄마다 duplicate를 통해 새 텍스트 프레임 생성
        for (var j = 1; j < lineArr.length; j++){
            var dupTextFrame = sel.duplicate(parentContainer, ElementPlacement.PLACEATBEGINNING);
            dupTextFrame.contents = lineArr[j];
            // 각 텍스트 프레임을 원본 위치에서 vSpacing만큼 오프셋하여 배치합니다.
            dupTextFrame.top = tfTop - (vSpacing * j);
            dupTextFrame.left = tfLeft;
            dupTextFrame.selected = false;
        }
    }
} else {
    alert("텍스트 프레임을 선택해 주세요.");
}

//----------------------------------------------------------
// 텍스트 프레임의 내용을 엔터키(모든 개행문자 종류 포함)를 기준으로 분리하는 함수
//----------------------------------------------------------
function fieldToArray(textFrame) {
    if (textFrame.typename == "TextFrame") {
        return textFrame.contents.toString().split(/(?:\r\n|\r|\n)+/);
    }
}