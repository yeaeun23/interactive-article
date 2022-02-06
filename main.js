(() => {
  // 애니메이션 method 모음
  const actions = {
    birdFlies(key) {
      if (key) { // 이동        
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
      } else { // 원래 위치로 이동        
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
      }
    }
  }

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; // 활성화된 graphic-item
  let ioIndex;

  // observe 등록된 요소가 나타나고 사라질 때마다 실행
  const io = new IntersectionObserver((entries, observer) => {
    // string * int = int (아래 for문에서 int형으로 사용하기 위해)
    ioIndex = entries[0].target.dataset.index * 1;
    console.log(entries);
  });

  for (let i = 0; i < stepElems.length; i++) {
    // observe 등록
    io.observe(stepElems[i]);

    // 이미지-단락 쌍 맞추기
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  function activate(action) {
    currentItem.classList.add('visible');

    if (action) {
      actions[action](true);
    }
  };

  function inactivate(action) {
    currentItem.classList.remove('visible');

    if (action) {
      actions[action](false);
    }
  };

  // 스크롤 이벤트: visible 클래스 제어
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
    //let loopCnt = 0; // 효율성 체크

    //for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];

      // i가 음수일 때 에러 방지
      if (!step) continue;

      boundingRect = step.getBoundingClientRect();

      //loopCnt++;

      // 단락이 화면 가운데쯤 오면
      if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
        inactivate(currentItem.dataset.action); // 기존 이미지 가리기
        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action); // 다음 이미지 보이기
      }
    }

    //console.log(loopCnt);
  });

  // 새로고침 시 스크롤 맨위로
  window.addEventListener('load', () => {
    // 좀 늦춰줘야 제대로 동작함..
    setTimeout(() => scrollTo(0, 0), 100); // x, y, 0.1s
  });

  // 첫번째 이미지 보이기
  activate();
})();