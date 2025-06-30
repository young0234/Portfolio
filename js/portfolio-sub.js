/* header */
function addEmailCopyHandler() {
  const emailCopyBtn = document.querySelector('.email-copy');
  if (!emailCopyBtn) return;

  emailCopyBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = 'pksoyg0407@naver.com';

    navigator.clipboard.writeText(email).then(() => {
      const msg = document.getElementById('copy-msg');
      msg.classList.add('show');  

      setTimeout(() => {
        msg.classList.remove('show');
      }, 2000);
    }).catch(() => {
      alert('클립보드 복사에 실패했습니다. 직접 이메일을 복사해주세요.');
    });
  });
}

fetch('/Portfolio/include/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header-include').innerHTML = data;
    addEmailCopyHandler();
  });

// 페이지 로드 시 이벤트 등록
document.addEventListener('DOMContentLoaded', addEmailCopyHandler);



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