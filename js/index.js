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


/* section.choice */
const selectedSkills = new Set();

const dropdownSelections = {
  'all-project': 'all',
  'responsive-project': 'all',
  'team-project': 'all',
  'sort-order': 'new'
};
const skillButtons = document.querySelectorAll('.skill-buttons a');
// 기술버튼
skillButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();

    const tech = Array.from(button.classList).find(cls =>
      ['figma', 'scss', 'css', 'javascript', 'react'].includes(cls)
    );
    if (!tech) return;

    if (selectedSkills.has(tech)) {
      selectedSkills.delete(tech);
      button.classList.remove('active');
    } else {
      selectedSkills.add(tech);
      button.classList.add('active');
    }

    filterItems();
  });
});
//커스텀 드롭다운 이벤트
document.querySelectorAll(".dropdown").forEach(dropdown => {
  const selected = dropdown.querySelector(".selected");
  const options = dropdown.querySelector(".options");
  const type = dropdown.getAttribute("data-type");

  selected.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== dropdown) d.classList.remove("open");
    });
    dropdown.classList.toggle("open");
  });

  options.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      dropdownSelections[type] = value;
      selected.textContent = option.textContent;
      dropdown.classList.remove("open");
      filterItems(); 
    });
  });
});

document.addEventListener("click", e => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
  }
});
// 필터 함수
function filterItems() {
  const allProjectVal = dropdownSelections['all-project'];
  const responsiveVal = dropdownSelections['responsive-project'];
  const teamVal = dropdownSelections['team-project'];
  const sortOrderVal = dropdownSelections['sort-order'];

  const items = Array.from(document.querySelectorAll('.item'));

  items.forEach(item => {
    const itemClasses = item.classList;

    // 기술 스택 필터
    const skillMatch =
      selectedSkills.size === 0 ||
      [...selectedSkills].every(skill => itemClasses.contains(skill));

    // 대표 프로젝트 필터
    let allProjectMatch = true;
    if (allProjectVal === 'main') {
      allProjectMatch = item.dataset.projectType === 'main';
    }

    // 반응형 필터
    let responsiveMatch = true;
    if (responsiveVal === 'responsive') {
      responsiveMatch = itemClasses.contains('responsive');
    } else if (responsiveVal === 'basic') {
      responsiveMatch = !itemClasses.contains('responsive');
    }

    // 팀/싱글 필터
    let teamMatch = true;
    if (teamVal === 'team') {
      teamMatch = itemClasses.contains('team');
    } else if (teamVal === 'single') {
      teamMatch = itemClasses.contains('single');
    }

    if (skillMatch && allProjectMatch && responsiveMatch && teamMatch) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // 정렬
  if (sortOrderVal === 'new') {
    items.sort((a, b) => Number(b.dataset.date) - Number(a.dataset.date));
  } else {
    items.sort((a, b) => Number(a.dataset.date) - Number(b.dataset.date));
  }

  // 재배치
  const container = document.querySelector('.items');
  items.forEach(item => container.appendChild(item));
}

filterItems();


/* section.container */
document.querySelectorAll('.item').forEach(item => {
  const img = item.querySelector('.thumbnail-img img');
  if (!img) return;

  const originalSrc = img.src;
  const gifSrc = originalSrc
    .replace('-img.png', '.gif')  
    .replace('-img.PNG', '.gif'); 

  item.addEventListener('mouseenter', () => {
    img.src = gifSrc;
  });

  item.addEventListener('mouseleave', () => {
    img.src = originalSrc;
  });
});


/* section.modal */
const modalData = {
  movie: {
    title: "영화 (Movie)",
    skills: ["figma", "scss", "css", "javascript", "react"],
    imgSrc: "/Portfolio/images/modal07.gif",
    imgAlt: "영화",
    summary: [
      "모든 페이지가 클릭 가능하며 다양한 내용을 제공함.",
      "검색창 사용 시 검색어가 잘 분리되어 편리함.",
      "TMDB API를 활용해 풍부한 데이터를 이용할 수 있어 좋았음."
    ],
    contribution: [
      "기여도: 100% (정보 전달 중심 영역의 디자인 및 퍼블리싱 전체)",
      "메인 : 네비 / 배너 / 영화 슬라이드 / 푸터",
      "서브 : 무비즈 / 마이페이지 / 로그인 / 404페이지"
    ],
    period: ["2025.07.10. - 2025.07.16. (5h - 6h, weekdays only)"],
    detailUrl: "/Portfolio/pages/portfolio-sub7.html"
  },
  weather: {
    title: "날씨 앱 (Weather)",
    skills: ["figma", "css", "javascript", "react"],
    imgSrc: "/Portfolio/images/modal06.gif",
    imgAlt: "날씨 앱",
    summary: [
      "버튼 클릭 시 콘텐츠와 배경이 동시에 전환 가능.",
      "'더보기' 버튼을 통해 다양한 상세 정보를 확인할 수 있음.",
      "사용자는 여행 전에 필요한 정보를 미리 얻어 더욱 편리함."
    ],
    contribution: [
      "기여도: 100% (정보 전달 중심 영역의 디자인 및 퍼블리싱 전체)",
      "React를 활용하여 메인 페이지를 제작",
      "추후 '더보기' 버튼을 상세 페이지로 확장할 예정"
    ],
    period: ["2025.07.08. - 2025.07.14. (5h - 6h, weekdays only)"],
    detailUrl: "/Portfolio/pages/portfolio-sub6.html"
  },
  wildrift: {
    title: "와일드 리프트 (Wild Rift)",
    skills: ["figma", "scss", "css", "javascript"],
    imgSrc: "/Portfolio/images/modal05.gif",
    imgAlt: "와일드 리프트",
    summary: [
      "게임 콘텐츠 정보를 명확히 전달하기 위해 정보 계층을 재구성.",
      "최신 이벤트 및 콘텐츠를 시각적으로 부각.",
      "브랜드 아이덴티티를 강화하고, 유저 유입과 유지를 유도하는 디자인 목표를 달성."
    ],
    contribution: [
      "기여도 : 25% (정보전달 중심 영역 디자인)",
      "메인 : 게임 소개 / 이벤트 / 푸터",
      "서브 : 공지사항 리스트 / 상세 페이지(텍스트, 영상)"
    ],
    period: ["2025.06.17. - 2025.06.22. (5h - 6h, weekdays only)"],
    detailUrl: "/Portfolio/pages/portfolio-sub5.html"
  },
  lotteria: {
    title: "롯데리아 (Lotteria)",
    skills: ["figma", "scss", "css", "javascript"],
    imgSrc: "/Portfolio/images/modal04.gif",
    imgAlt: "롯데리아",
    summary: [
      "롯데리아의 독립적인 페이지 구축",
      "롯데리아의 메인 브랜드 컬러를 적극 활용함으로써 브랜드의 개성을 강조.",
      "영상, 포스터, 신규 행사 정보 등을 포함해 풍부하게 전달함으로써 브랜드의 매력을 전달."
    ],
    contribution: [
      "기여도 : 25% (정보전달 중심 영역 디자인)",
      "메인 : 크랩 얼라이브 버거 출시 / 스테디셀러 메뉴",
      "서브 대용 : 로그인 / 장바구니"
    ],
    period: ["2025.06.09. - 2025.06.17. (5h - 6h, weekdays only)"],
    detailUrl: "/Portfolio/pages/portfolio-sub4.html"
  },
  ghibli: {
    title: "스튜디오 지브리 (Studio Ghibli)",
    skills: ["figma", "scss", "css", "javascript"],
    imgSrc: "/Portfolio/images/modal03.gif",
    imgAlt: "스튜디오 지브리",
    summary: [
      "스튜디오 지브리'라는 브랜드의 이미지를 구체화.",
      "공식 정보뿐만 아니라, 문화 콘텐츠까지 전달하는 포털 역할.",
      "일본 국내 팬뿐만 아니라, 전세계 팬들이 쉽게 접근할 수 있는 글로벌 사이트 제작."
    ],
    contribution: [
      "기여도 : 33.33% (정보전달 / 인터랙션 중심 영역 디자인), 영어 번역",
      "메인 : 지브리 소식 / 지브리 인사이드 / 이메일 / 푸터 / 탑 버튼 / 페이지네이션",
      "서브 : 현실 속 지브리 / 지브리 뮤지엄 / 지브리 파크 / 지브리 이벤트 (날씨)"
    ],
    period: ["2025.05.12 - 2025.06.09. (5h - 6h, weekdays only)"],
    detailUrl: "/Portfolio/pages/portfolio-sub3.html"
  },
  inflearn: {
    title: "인프런 클론 코딩 (Inflearn)",
    skills: ["figma", "scss", "css", "javascript"],
    imgSrc: "/Portfolio/images/modal02.gif",
    imgAlt: "인프런 클론 코딩 (Inflearn)",
    summary: [
      "클래스101의 사이트의 디자인을 활용하여 리디자인한 웹 리뉴얼 작업.",
      "기존의 사이트 보다는 다양한 기능 적용.",
      "클론 코딩을 하며 전체적인 레이아웃에 대해 공부하게 됨."
    ],
    contribution: [
      "기여도 : 100% (웹 퍼블리싱)",
      "메인 : 헤더 / 메인 / 인사이트 / 베스트 강의 / 얼리버드 / 블로그 / 팁&테크 / 푸터",
      "서브 : 로그인 / 회원가입 / 상세페이지 / 장바구니"
    ],
    period: ["2025.05.13. - 2025.05.30. (5h - 6h, weekdays only)"],
    detailUrl: "/Portfolio/pages/portfolio-sub2.html"
  },
  artcenter: {
    title: "예술경영지원센터 (KAMS)",
    skills: ["figma", "scss", "css"],
    imgSrc: "/Portfolio/images/modal01.gif",
    imgAlt: "아트센터",
    summary: [
      "기존 사이트의 정보 과잉, 비직관적인 UI를 개선.",
      "사이트가 반응형이 아니어 모바일 사용자가 불편함을 고려한 반응형 제작.",
      "글이 많아 가독성이 떨어짐으로 시각적 구분 요소 추가."
    ],
    contribution: [
      "기여도 : 100% (정보전달 중심 영역 디자인 및 퍼블리싱)",
      "메인 : 헤더 / 메인 / 공지사항 / 사업소개 / 발간자료 / 오시는 길 / 푸터",
      "서브 : 로그인 / 공지사항"
    ],
    period: ["2025.03.24. - 2025.05.01. (5h - 6h, weekdays only)"],
    detailUrl: "/Portfolio/pages/portfolio-sub1.html"
  }
};
function updateModalContent(data) {
  const modal = document.querySelector(".modal");
  
  // 타이틀
  modal.querySelector(".in-title h1").textContent = data.title;

  // 스킬 영역 초기화 및 생성
  const skillsContainer = modal.querySelector(".in-skills");
  skillsContainer.innerHTML = ""; // 초기화
  data.skills.forEach(skill => {
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("each-skill", skill);
    skillDiv.innerHTML = `
      <img src="images/icon-${skill}.png" alt="${skill}">
      <p>${skill.charAt(0).toUpperCase() + skill.slice(1)}</p>
    `;
    skillsContainer.appendChild(skillDiv);
  });

  // 이미지 변경
  const imgElem = modal.querySelector(".left-img img");
  imgElem.src = data.imgSrc;
  imgElem.alt = data.imgAlt;

  // 요약 설명, 기여도, 제작 기간 텍스트 갱신
  const parnassusElements = modal.querySelectorAll(".right-text .parnassus");
  
  // 요약 설명
  const summaryUl = parnassusElements[0].querySelector("ul");
  summaryUl.innerHTML = "";
  data.summary.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    summaryUl.appendChild(li);
  });
  
  // 기여도
  const contributionUl = parnassusElements[1].querySelector("ul");
  contributionUl.innerHTML = "";
  data.contribution.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    contributionUl.appendChild(li);
  });

  // 제작 기간
  const periodUl = parnassusElements[2].querySelector("ul");
  periodUl.innerHTML = "";
  data.period.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    periodUl.appendChild(li);
  });

  // 자세히 보기
  const detailButton = document.querySelector(".in-button");
  if (detailButton && data.detailUrl) {
    detailButton.setAttribute("href", data.detailUrl);
    detailButton.setAttribute("target", "_blank"); 
  }
}

// 아이템들
const items = document.querySelectorAll(".container .item");
const modal = document.querySelector(".modal");
const closeBtn = modal.querySelector(".close-btn");

// 클릭 시 모달 내용 업데이트하고 모달 보이기
items.forEach(item => {
  item.addEventListener("click", () => {
    const id = item.getAttribute("data-id");
    if (modalData[id]) {
      updateModalContent(modalData[id]);
      modal.style.display = "block";
    }
  });
});

// 모달 닫기
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
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
