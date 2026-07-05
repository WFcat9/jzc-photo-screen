const series = [
  {
    title: "夜景氛围",
    kicker: "烟花 / 城市 / 微光",
    cover: "assets/photos/night_fire_04.jpg",
    note: "夜景环境里建立人物和光源的关系。",
    images: ["night_fire_04", "night_fire_05", "night_fire_01", "night_fire_02", "night_fire_03"],
  },
  {
    title: "低调棚拍",
    kicker: "Low-key / 光比 / 肖像",
    cover: "assets/photos/lowkey_04.jpg",
    note: "用暗部、投影和侧光控制人物轮廓。",
    images: ["lowkey_04", "lowkey_05", "lowkey_01", "lowkey_02", "lowkey_03"],
  },
  {
    title: "主题策划",
    kicker: "场景 / 道具 / 情绪",
    cover: "assets/photos/story_snow_01.jpg",
    note: "让道具和场景承担叙事功能。",
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
    title: "季节人像",
    kicker: "春樱 / 秋枫 / 花海",
    cover: "assets/photos/season_cherry_02.jpg",
    note: "用前景、色相和动势组织自然环境。",
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
    title: "校园叙事",
    kicker: "窗光 / 阅读 / 日常",
    cover: "assets/photos/campus_02.jpg",
    note: "用安静姿态和空间留白形成生活片段。",
    images: ["campus_02", "campus_01", "campus_03", "daily_lake_01", "daily_lake_02", "daily_lake_03"],
  },
  {
    title: "风格造型",
    kicker: "国风 / 妆造 / 场景",
    cover: "assets/photos/style_hanfu_07.jpg",
    note: "在造型和复杂场景里保持视觉统一。",
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
    .map((id) => `<img src="assets/photos/${id}.jpg" alt="${item.title}作品" loading="lazy">`)
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

updateSlide();
