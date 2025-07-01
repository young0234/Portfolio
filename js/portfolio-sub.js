/* header */
/* 공통 메시지 출력 함수 */
function showMessage(text) {
  const msg = document.getElementById('copy-msg');
  if (!msg) return;

  msg.textContent = text;
  msg.classList.add('show');

  setTimeout(() => {
    msg.classList.remove('show');
  }, 2000);
}

/* 이메일 복사 기능 */
function addEmailCopyHandler() {
  const emailCopyBtn = document.querySelector('.email-copy');
  if (!emailCopyBtn) return;

  emailCopyBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = 'pksoyg0407@naver.com';

    navigator.clipboard.writeText(email).then(() => {
      showMessage('이메일을 복사했습니다!');
    }).catch(() => {
      alert('클립보드 복사에 실패했습니다. 직접 이메일을 복사해주세요.');
    });
  });
}

/* 다운로드 클릭 메시지 기능 */
function addDownloadHandler() {
  const downloadBtn = document.querySelector('.download');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    showMessage('이력서를 다운로드했습니다!');
    // 브라우저가 href 경로에 따라 자동 다운로드 실행
  });
}

fetch('/Portfolio/include/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header-include').innerHTML = data;

    // 헤더 삽입 이후 버튼 이벤트 연결
    addEmailCopyHandler();
    addDownloadHandler();
  });



/* footer */
fetch('/Portfolio/include/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.footer-include').innerHTML = data;

    /* top-btn */
    const scrollBtn = document.querySelector('.scroll-top-btn');

    window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
    });

    scrollBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })