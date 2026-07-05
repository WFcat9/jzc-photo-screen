const series = [
  {
    title: "夜色微光",
    kicker: "烟火 / 城市 / 微光",
    cover: "assets/photos/night_fire_04.jpg",
    note: "保留烟火和城市亮点，人物状态安静。",
    images: ["night_fire_04", "night_fire_05", "night_fire_01", "night_fire_02", "night_fire_03"],
  },
  {
    title: "暗室低调",
    kicker: "侧光 / 暗部 / 肖像",
    cover: "assets/photos/lowkey_04.jpg",
    note: "用侧光压住背景，突出轮廓和眼神。",
    images: ["lowkey_04", "lowkey_05", "lowkey_01", "lowkey_02", "lowkey_03"],
  },
  {
    title: "节日布景",
    kicker: "场景 / 道具 / 情绪",
    cover: "assets/photos/story_snow_01.jpg",
    note: "先建立场景，再让人物动作进入画面。",
    images: [
      "story_snow_01",
      "story_christmas_01",
      "story_christmas_02",
      "story_christmas_03",
      "story_christmas_04",
      "story_gothic_01",
      "story_gothic_02",
      "story_gothic_03",
    ],
  },
  {
    title: "季节流动",
    kicker: "春樱 / 秋枫 / 花海",
    cover: "assets/photos/season_cherry_02.jpg",
    note: "用前景和色调，让季节成为情绪。",
    images: [
      "season_cherry_02",
      "season_cherry_01",
      "season_cherry_03",
      "season_rape_01",
      "season_autumn_01",
      "season_autumn_02",
      "season_autumn_03",
      "season_autumn_04",
    ],
  },
  {
    title: "校园静叙",
    kicker: "窗光 / 阅读 / 日常",
    cover: "assets/photos/campus_02.jpg",
    note: "保留阅读、窗边和水面这些日常细节。",
    images: ["campus_02", "campus_01", "campus_03", "daily_lake_01", "daily_lake_02", "daily_lake_03"],
  },
  {
    title: "国风造型",
    kicker: "国风 / 妆造 / 场景",
    cover: "assets/photos/style_hanfu_07.jpg",
    note: "统一服饰、妆造和场景色调。",
    images: [
      "style_hanfu_07",
      "style_hanfu_01",
      "style_hanfu_02",
      "style_hanfu_03",
      "style_hanfu_04",
      "style_hanfu_05",
      "style_hanfu_06",
    ],
  },
];

const slides = [
  { id: "slide-05", name: "作品封面", desc: "摄影集开篇页" },
  { id: "slide-08", name: "旧室微光", desc: "室内光线原稿" },
  { id: "slide-13", name: "节日布景", desc: "主题场景原稿" },
  { id: "slide-15", name: "暗夜造型", desc: "人物造型原稿" },
  { id: "slide-16", name: "雪夜伞下", desc: "雪夜主题原稿" },
  { id: "slide-18", name: "花海侧影", desc: "外景花海原稿" },
  { id: "slide-19", name: "春日花影", desc: "春樱人像原稿" },
  { id: "slide-20", name: "秋日映画", desc: "秋季外景原稿" },
  { id: "slide-22", name: "湖边日常", desc: "日常叙事原稿" },
  { id: "slide-27", name: "烟火夜景", desc: "夜景微光原稿" },
  { id: "slide-28", name: "校园静叙", desc: "校园场景原稿" },
  { id: "slide-29", name: "胶片光感", desc: "电影感光线原稿" },
  { id: "slide-30", name: "暗调肖像", desc: "棚拍肖像原稿" },
  { id: "slide-31", name: "国风造型", desc: "国风场景原稿" },
  { id: "slide-32", name: "收束页面", desc: "摄影集结尾页" },
];

const chapterGrid = document.querySelector("#chapterGrid");
const modal = document.querySelector("#galleryModal");
const modalTitle = document.querySelector("#modalTitle");
const modalKicker = document.querySelector("#modalKicker");
const modalCount = document.querySelector("#modalCount");
const modalImages = document.querySelector("#modalImages");
const closeButton = document.querySelector(".modal-close");
const slideImage = document.querySelector("#slideImage");
const slideMeta = document.querySelector("#slideMeta");
const slideName = document.querySelector("#slideName");
const slideDesc = document.querySelector("#slideDesc");
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const fullscreenButton = document.querySelector(".fullscreen-button");
let slideIndex = 12;

window.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(() => document.body.classList.add("is-loaded"), 60);
});

series.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "chapter-card reveal";
  card.style.transitionDelay = `${index * 80}ms`;
  card.innerHTML = `
    <img src="${item.cover}" alt="${item.title}作品组" loading="lazy">
    <div class="chapter-card-content">
      <small>${item.kicker}</small>
      <h3>${item.title}</h3>
      <p>${item.note}</p>
      <button type="button">打开图库</button>
    </div>
  `;
  card.querySelector("button").addEventListener("click", () => openGallery(item));
  card.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") openGallery(item);
  });
  chapterGrid.appendChild(card);
});

function openGallery(item) {
  modalTitle.textContent = item.title;
  modalKicker.textContent = item.kicker;
  modalCount.textContent = `${item.images.length} 张作品`;
  modalImages.innerHTML = item.images
    .map(
      (id) => `
        <figure class="gallery-photo">
          <img src="assets/photos/${id}.jpg" alt="${item.title}作品" loading="lazy">
        </figure>
      `,
    )
    .join("");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeGallery() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function updateSlide() {
  const slide = slides[slideIndex];
  slideImage.src = `assets/slides/${slide.id}.jpg`;
  slideName.textContent = slide.name;
  slideDesc.textContent = slide.desc;
  slideMeta.textContent = `${slideIndex + 1} / ${slides.length}`;
}

function moveSlide(direction) {
  slideIndex = (slideIndex + direction + slides.length) % slides.length;
  slideImage.animate(
    [
      { opacity: 0.3, transform: "scale(0.985)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 320, easing: "cubic-bezier(.2,.8,.2,1)" },
  );
  updateSlide();
}

closeButton.addEventListener("click", closeGallery);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeGallery();
});
prevSlide.addEventListener("click", () => moveSlide(-1));
nextSlide.addEventListener("click", () => moveSlide(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowRight") moveSlide(1);
  if (event.key === "ArrowLeft") moveSlide(-1);
});

fullscreenButton.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
    fullscreenButton.textContent = "退出";
  } else {
    await document.exitFullscreen();
    fullscreenButton.textContent = "全屏";
  }
});

const toneSlider = document.querySelector("#toneSlider");
const toneCards = [...document.querySelectorAll(".tone-card")];

function updateToneStrip(value) {
  toneCards.forEach((card, index) => {
    const distance = Math.abs(index - value);
    const brightness = Math.max(0.28, 1.1 - distance * 0.28);
    const contrast = Math.min(1.18, 0.98 + Math.max(0, 1 - distance) * 0.14);
    card.style.setProperty("--tone-brightness", brightness.toFixed(2));
    card.style.setProperty("--tone-contrast", contrast.toFixed(2));
    card.classList.toggle("is-active", distance < 0.56);
  });
}

if (toneSlider && toneCards.length) {
  updateToneStrip(Number(toneSlider.value));
  toneSlider.addEventListener("input", (event) => updateToneStrip(Number(event.target.value)));
  toneCards.forEach((card, index) => {
    card.addEventListener("pointerenter", () => {
      toneSlider.value = index;
      updateToneStrip(index);
    });
    card.addEventListener("focusin", () => {
      toneSlider.value = index;
      updateToneStrip(index);
    });
  });
}

const conceptRows = [...document.querySelectorAll(".series-board .series-row")];

conceptRows.forEach((row) => {
  row.addEventListener("pointerenter", () => {
    conceptRows.forEach((item) => item.classList.remove("is-selected"));
    row.classList.add("is-selected");
  });
  row.addEventListener("focusin", () => {
    conceptRows.forEach((item) => item.classList.remove("is-selected"));
    row.classList.add("is-selected");
  });
});

document.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--y", `${event.clientY}px`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.22 },
);

document.querySelectorAll(".reveal, .method-map").forEach((element) => {
  revealObserver.observe(element);
});

const sceneObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-active", entry.isIntersecting && entry.intersectionRatio > 0.45);
    });
  },
  { threshold: [0, 0.45, 0.7] },
);

document.querySelectorAll(".scene").forEach((scene) => {
  sceneObserver.observe(scene);
});

function syncVisibleState() {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  document.querySelectorAll(".scene").forEach((scene) => {
    const rect = scene.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    scene.classList.toggle("is-active", visibleHeight > viewportHeight * 0.35);
  });

  document.querySelectorAll(".reveal, .method-map").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.08) {
      element.classList.add("is-visible");
    }
  });
}

window.addEventListener("load", () => requestAnimationFrame(syncVisibleState));
window.addEventListener("hashchange", () => window.setTimeout(syncVisibleState, 120));
window.setTimeout(syncVisibleState, 80);

const showcaseScene = document.querySelector("#scene-showcase");

if (showcaseScene) {
  const showcaseObserver = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle("showcase-view", entry.isIntersecting && entry.intersectionRatio > 0.2);
    },
    { threshold: [0, 0.2, 0.62] },
  );

  showcaseObserver.observe(showcaseScene);
}

updateSlide();
