(() => {
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');    
    let currentItem = graphicElems[0]; // 활성화된(.visible) graphic-item
    let ioIndex;

    // observe 등록된 요소가 나타나고 사라질 때마다 실행
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(entries);
    });

    // 이미지-텍스트 쌍 맞추기
    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate() {
        currentItem.classList.add('visible');
    };

    function inactivate() {
        currentItem.classList.remove('visible');
    };

    // 스크롤 이벤트: visible 클래스 제어
    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        let loopCnt = 0;

        //for (let i = 0; i < stepElems.length; i++) {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];

            if (!step)
                continue;

            boundingRect = step.getBoundingClientRect();

            loopCnt++;

            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {
                inactivate();
                currentItem = graphicElems[step.dataset.index];
                activate();
            }
        }

        console.log(loopCnt);
    });

    activate();
})();