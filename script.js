const series = [
  {
    title: "夜色微光",
    kicker: "烟火 / 城市 / 微光",
    cover: "assets/photos/night_fire_04.jpg",
    note: "烟火和城市光源留在背景里，人物面部保持安静，形成夜色中的呼吸感。",
    images: ["night_fire_04", "night_fire_05", "night_fire_01", "night_fire_02", "night_fire_03"],
  },
  {
    title: "暗室低调",
    kicker: "侧光 / 暗部 / 肖像",
    cover: "assets/photos/lowkey_04.jpg",
    note: "用侧光压住背景，让轮廓、眼神和手部动作成为主要信息。",
    images: ["lowkey_04", "lowkey_05", "lowkey_01", "lowkey_02", "lowkey_03"],
  },
  {
    title: "节日布景",
    kicker: "场景 / 道具 / 情绪",
    cover: "assets/photos/story_snow_01.jpg",
    note: "雪夜、圣诞与哥特主题都先建立场景，再让人物动作进入画面。",
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
    note: "用花枝、落叶和前景虚化包围人物，让季节成为画面的第一层情绪。",
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
    note: "保留阅读、窗边和水面这些日常细节，让照片有更轻的生活感。",
    images: ["campus_02", "campus_01", "campus_03", "daily_lake_01", "daily_lake_02", "daily_lake_03"],
  },
  {
    title: "国风造型",
    kicker: "国风 / 妆造 / 场景",
    cover: "assets/photos/style_hanfu_07.jpg",
    note: "在服饰、妆造和复杂场景中统一色调，让人物仍然是视觉中心。",
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
  "slide-05",
  "slide-08",
  "slide-13",
  "slide-15",
  "slide-16",
  "slide-18",
  "slide-19",
  "slide-20",
  "slide-22",
  "slide-27",
  "slide-28",
  "slide-29",
  "slide-30",
  "slide-31",
  "slide-32",
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
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const fullscreenButton = document.querySelector(".fullscreen-button");
let slideIndex = 12;

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
  slideImage.src = `assets/slides/${slide}.jpg`;
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
