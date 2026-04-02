<template>
  <div class="app">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="top-bar-left">
          <span>📞 联系电话：{{ sysConfig.contact_phone }}</span>
          <span>📧 邮箱：{{ sysConfig.contact_email }}</span>
        </div>
        <div class="top-bar-right">
          <div class="user-info">
            <span v-if="isLoggedIn" class="welcome-text">👋 欢迎，{{ userName }}</span>
            <a v-else href="#login" class="login-link">登录 / 注册</a>
          </div>
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

    <!-- Tesla Services Section -->
    <section class="tesla-section">
      <div class="tesla-header">
        <h2 class="section-title-zh">{{ teslaServicesTitle.zh }}</h2>
        <h3 class="section-title-en">{{ teslaServicesTitle.en }}</h3>
      </div>
      <div class="tesla-grid">
        <div v-for="(item, index) in teslaServices" :key="index" class="tesla-card">
          <div class="tesla-image">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="tesla-overlay">
            <h3>{{ item.title }}</h3>
            <a :href="item.link" class="tesla-btn">{{ item.buttonText }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Tesla Accessories Section -->
    <section class="tesla-section">
      <div class="tesla-header">
        <h2 class="section-title-zh">{{ teslaAccessoriesTitle.zh }}</h2>
        <h3 class="section-title-en">{{ teslaAccessoriesTitle.en }}</h3>
      </div>
      <div class="tesla-grid">
        <div v-for="(item, index) in teslaAccessories" :key="index" class="tesla-card">
          <div class="tesla-image">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="tesla-overlay">
            <h3>{{ item.title }}</h3>
            <a :href="item.link" class="tesla-btn">{{ item.buttonText }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products" id="products">
      <h2 class="section-title">熱門產品</h2>
      <p class="section-subtitle">精選優質汽車周邊配件</p>
      <div class="products-grid">
        <div v-for="(product, index) in hotProducts" :key="index" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <div class="product-price">{{ product.price }}</div>
            <a :href="product.link" class="product-btn">{{ product.buttonText }}</a>
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
          <h4>{{ sysConfig.company_name }}</h4>
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
            <li>📍 {{ sysConfig.address }}</li>
            <li>📞 {{ sysConfig.contact_phone }}</li>
            <li>📧 {{ sysConfig.contact_email }}</li>
            <li>⏰ {{ sysConfig.business_hours }}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Tonka. All rights reserved.</p>
        <p style="margin-top: 10px;">
          <a :href="adminUrl" target="_blank" style="color: #666; text-decoration: none;">🔧 后台管理</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const adminUrl = ref('')

// 用户登录状态
const isLoggedIn = ref(false)
const userName = ref('')

// 系统配置
const sysConfig = ref({
  company_name: 'Tonka 汽車周邊',
  contact_phone: '400-888-8888',
  contact_email: 'info@tonka.com',
  address: '四川省成都市',
  business_hours: '週一至週日 9:00-21:00'
})

// 获取系统配置
const fetchConfig = async () => {
  try {
    const hostname = window.location.hostname
    const apiPort = hostname === '192.168.0.120' ? '8080' : '3000'
    const apiBase = 'http://' + hostname + ':' + apiPort
    const response = await fetch(apiBase + '/api/public/config')
    const result = await response.json()
    if (result.code === 200 && result.data) {
      sysConfig.value = { ...sysConfig.value, ...result.data }
    }
  } catch (error) {
    console.error('获取系统配置失败:', error)
  }
}

// 特斯拉专业服务
const teslaServicesTitle = ref({
  zh: '特斯拉 專業服務',
  en: 'Tesla Services'
})

const teslaServices = ref([
  {
    image: '/images/煥新-Model-Y.png',
    title: 'Model Y 煥新',
    buttonText: '查看詳情',
    link: '#contact'
  },
  {
    image: '/images/特斯拉必備配件.webp',
    title: '車體包膜',
    buttonText: '立即預約',
    link: '#contact'
  },
  {
    image: '/images/特斯拉鍍膜防曬.webp',
    title: '鍍膜防曬',
    buttonText: '立即預約',
    link: '#contact'
  },
  {
    image: '/images/0701_新Y交車禮包2.jpg',
    title: '輪胎服務',
    buttonText: '立即預約',
    link: '#contact'
  }
])

// 特斯拉专用配件标题
const teslaAccessoriesTitle = ref({
  zh: '特斯拉 專用配件',
  en: 'Tesla Accessories'
})

// 特斯拉专用配件
const teslaAccessories = ref([
  {
    image: '/images/官網Banner_MOBEIL0316.jpg',
    title: 'Model Y 專用腳墊',
    buttonText: '加入購物車',
    link: '#products'
  },
  {
    image: '/images/煥新-Model-Y.png',
    title: 'Model 3 煥新套件',
    buttonText: '加入購物車',
    link: '#products'
  },
  {
    image: '/images/特斯拉必備配件.webp',
    title: '特斯拉必備配件',
    buttonText: '加入購物車',
    link: '#products'
  },
  {
    image: '/images/特斯拉鍍膜防曬.webp',
    title: '特斯拉收納盒',
    buttonText: '加入購物車',
    link: '#products'
  }
])

// 热门产品
const hotProducts = ref([])

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

// 获取轮播图数据
const fetchBanners = async () => {
  try {
    const hostname = window.location.hostname
    const apiPort = hostname === '192.168.0.120' ? '8080' : '3000'
    const apiBase = 'http://' + hostname + ':' + apiPort
    const response = await fetch(apiBase + '/api/public/banners')
    const result = await response.json()
    if (result.code === 200 && result.data && result.data.length > 0) {
      slides.value = result.data.map(item => ({
        image: item.image_url.startsWith('http') ? item.image_url : (apiBase + item.image_url),
        title: item.title || '',
        subtitle: item.subtitle || '',
        buttonText: item.button_text || '查看详情',
        link: item.link || '#'
      }))
    }
  } catch (error) {
    console.error('获取轮播图失败:', error)
  }
}

const fetchHotProducts = async () => {
  try {
    const hostname = window.location.hostname
    const apiPort = hostname === '192.168.0.120' ? '8080' : '3000'
    const apiBase = 'http://' + hostname + ':' + apiPort
    const response = await fetch(apiBase + '/api/public/hot-products')
    const result = await response.json()
    if (result.code === 200 && result.data && result.data.length > 0) {
      hotProducts.value = result.data.map(item => ({
        image: item.image_url.startsWith('http') ? item.image_url : (apiBase + item.image_url),
        title: item.name || item.title || '',
        price: item.price || '',
        buttonText: item.button_text || '立即选购',
        link: item.link || '#'
      }))
    }
  } catch (error) {
    console.error('获取热门产品失败:', error)
  }
}

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
  const hostname = window.location.hostname
  const adminPort = hostname === '192.168.0.120' ? '1025' : '1026'
  adminUrl.value = 'http://' + hostname + ':' + adminPort
  fetchConfig()
  fetchBanners()
  fetchHotProducts()
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

/* Tesla Section */
.tesla-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.tesla-section:nth-of-type(even) {
  background: #fff;
}

.tesla-header {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 20px;
  text-align: left;
}

.section-title-zh {
  font-size: 32px;
  color: #333;
  margin: 0 0 8px;
  font-weight: 600;
}

.section-title-en {
  font-size: 16px;
  color: #666;
  margin: 0;
  font-weight: 400;
  letter-spacing: 2px;
}

.tesla-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.tesla-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.tesla-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.tesla-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.tesla-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.tesla-card:hover .tesla-image img {
  transform: scale(1.1);
}

.tesla-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  padding: 20px;
}

.tesla-overlay h3 {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 22px;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  font-weight: 600;
}

.tesla-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: inline-block;
  padding: 12px 35px;
  background: #1e8bc3;
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s;
}

.tesla-btn:hover {
  background: #155f80;
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome-text {
  color: #fff;
  font-size: 14px;
}

.login-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 20px;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  transition: background 0.3s;
}

.login-link:hover {
  background: rgba(255,255,255,0.3);
}

/* Products Section - New Style */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.product-image {
  width: 100%;
  height: 220px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-info {
  padding: 12px;
  text-align: right;
}

.product-info h3 {
  font-size: 14px;
  margin-bottom: 4px;
  color: #333;
  font-weight: 600;
  line-height: 1.3;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #c21f22;
  margin-bottom: 6px;
}

.product-btn {
  display: inline-block;
  padding: 7px 22px;
  background: linear-gradient(135deg, #1e8bc3 0%, #155d7b 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(30, 139, 195, 0.4);
}

.product-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 139, 195, 0.5);
}
</style>
