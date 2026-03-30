<template>
  <div class="app">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="top-bar-left">
          <span>📞 联系电话：400-888-8888</span>
          <span>📧 邮箱：info@tonka.com</span>
        </div>
        <div class="top-bar-right">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Line</a>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header>
      <div class="header-content">
        <div class="logo">
          <img src="/images/Space-T-logo-去背W.png" alt="Tonka Logo" />
        </div>
        <nav>
          <ul>
            <li><a href="#home">首页</a></li>
            <li><a href="#products">产品中心</a></li>
            <li><a href="#services">服务项目</a></li>
            <li><a href="#about">关于我们</a></li>
            <li><a href="#news">最新消息</a></li>
            <li><a href="#contact">联系我们</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Hero Banner with Carousel -->
    <section class="hero" id="home">
      <div class="carousel-container">
        <!-- Slides with fade effect -->
        <div v-for="(slide, index) in slides" :key="index" class="carousel-slide" :class="{ active: currentSlide === index }">
          <img :src="slide.image" :alt="slide.title" />
          <div class="hero-overlay" @click.stop>
            <div class="hero-content">
              <h1>{{ slide.title }}</h1>
              <p>{{ slide.subtitle }}</p>
              <a :href="slide.link" class="hero-btn" @click.stop>{{ slide.buttonText }}</a>
            </div>
          </div>
        </div>

        <!-- Left Arrow -->
        <button class="carousel-arrow left" @click="prevSlide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <!-- Right Arrow -->
        <button class="carousel-arrow right" @click="nextSlide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <!-- Indicators -->
        <div class="carousel-indicators">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
      <div class="services-header">
        <h2 class="section-title">SPACE T LAB 超強特斯拉專門店</h2>
        <a href="#contact" class="services-btn">一站式服務中心</a>
      </div>
      <div class="car-services-container">
        <div class="car-image-wrapper">
          <img src="/images/tesla-service-car.webp" alt="特斯拉服務" class="car-services-image" />
          
          <!-- 车顶服务按钮 -->
          <button class="service-point point-roof">
            車體防護/隔熱紙
            <span class="point-label">通勤匯嘉竭誠為您服務</span>
          </button>
          
          <!-- 车头服务按钮 -->
          <button class="service-point point-front">
            車頭改裝
            <span class="point-label">通勤匯嘉竭誠為您服務</span>
          </button>
          
          <!-- 车侧服务按钮 -->
          <button class="service-point point-side">
            車身包膜
            <span class="point-label">通勤匯嘉竭誠為您服務</span>
          </button>
          
          <!-- 车位服务按钮 -->
          <button class="service-point point-rear">
            露營車宿
            <span class="point-label">通勤匯嘉竭誠為您服務</span>
          </button>
          
          <!-- 车轮服务按钮 -->
          <button class="service-point point-wheel">
            輪胎服務
            <span class="point-label">通勤匯嘉竭誠為您服務</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products" id="products">
      <h2 class="section-title">熱門產品</h2>
      <p class="section-subtitle">精選優質汽車周邊配件</p>
      <div class="products-grid">
        <div class="product-card">
          <div class="product-image">
            <img src="/images/煥新-Model-Y.png" alt="Model Y 配件" />
          </div>
          <div class="product-info">
            <h3>Model Y 煥新套件</h3>
            <div class="product-price">¥2,999</div>
            <button class="add-to-cart">加入購物車</button>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/特斯拉必備配件.webp" alt="特斯拉必備配件" />
          </div>
          <div class="product-info">
            <h3>特斯拉必備配件套裝</h3>
            <div class="product-price">¥1,299</div>
            <button class="add-to-cart">加入購物車</button>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/特斯拉鍍膜防曬.webp" alt="鍍膜防曬" />
          </div>
          <div class="product-info">
            <h3>高級鍍膜防曬服務</h3>
            <div class="product-price">¥3,599</div>
            <button class="add-to-cart">立即預約</button>
          </div>
        </div>
        <div class="product-card">
          <div class="product-image">
            <img src="/images/0701_新Y交車禮包2.jpg" alt="交車禮包" />
          </div>
          <div class="product-info">
            <h3>Model Y 交車禮包</h3>
            <div class="product-price">¥899</div>
            <button class="add-to-cart">加入購物車</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section" id="about">
      <div class="info-content">
        <div class="info-text">
          <h2>關於 Tonka</h2>
          <p>我們是一家專註於汽車周邊產品與服務的專業機構，致力於為廣大車主提供高品質的汽車配件、包膜改色、保養維修等一站式服務。</p>
          <p>多年來，我們憑藉專業的技術、優質的產品和貼心的服務，贏得了眾多客戶的信賴與好評。</p>
          <p>選擇 Tonka，讓您的愛車始終保持最佳狀態！</p>
        </div>
        <div class="info-image">
          <img src="/images/電動車專用輪胎長期曝光-2.png" alt="關於我們" />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h4>Tonka 汽車周邊</h4>
          <p>專業汽車配件 · 一站式服務中心</p>
          <p>我們致力於為您的愛車提供最優質的產品與服務。</p>
        </div>
        <div class="footer-section">
          <h4>快速鏈接</h4>
          <ul>
            <li><a href="#home">首頁</a></li>
            <li><a href="#products">產品中心</a></li>
            <li><a href="#services">服務項目</a></li>
            <li><a href="#about">關於我們</a></li>
            <li><a href="#contact">聯繫我們</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>服務項目</h4>
          <ul>
            <li><a href="#">車輛保養</a></li>
            <li><a href="#">包膜改色</a></li>
            <li><a href="#">犀牛皮保護</a></li>
            <li><a href="#">隔熱紙</a></li>
            <li><a href="#">輪胎服務</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>聯繫我們</h4>
          <ul class="footer-contact">
            <li>📍 四川省成都市</li>
            <li>📞 400-888-8888</li>
            <li>📧 info@tonka.com</li>
            <li>⏰ 週一至週日 9:00-21:00</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Tonka. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const slides = ref([
  {
    image: '/images/官網Banner_MOBEIL0316.jpg',
    title: 'Tonka 汽車周邊',
    subtitle: '專業汽車配件 · 一站式服務中心',
    buttonText: '立即選購',
    link: '#products'
  },
  {
    image: '/images/煥新-Model-Y.png',
    title: 'Model Y 煥新',
    subtitle: '讓您的愛車焕然一新',
    buttonText: '查看詳情',
    link: '#products'
  },
  {
    image: '/images/特斯拉必備配件.webp',
    title: '必備配件',
    subtitle: '精選優質汽車周邊配件',
    buttonText: '立即選購',
    link: '#products'
  },
  {
    image: '/images/特斯拉鍍膜防曬.webp',
    title: '鍍膜防曬',
    subtitle: '保護您的愛車',
    buttonText: '立即預約',
    link: '#services'
  }
])

let autoSlideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
})
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
}

.carousel-slide.active {
  opacity: 1;
  pointer-events: auto;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
}

.carousel-arrow:hover {
  background: rgba(30, 139, 195, 0.8);
}

.carousel-arrow.left {
  left: 20px;
}

.carousel-arrow.right {
  right: 20px;
}

.carousel-arrow svg {
  width: 24px;
  height: 24px;
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

.indicator.active {
  background: #1e8bc3;
  transform: scale(1.3);
}

/* Hero content positioned at bottom-left (third quadrant) */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0 80px 70px 100px;
}

.hero-content {
  text-align: left;
  color: #fff;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 16px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
}

.hero-content p {
  font-size: 20px;
  margin-bottom: 32px;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
}
</style>
