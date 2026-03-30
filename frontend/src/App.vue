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

    <!-- Hero Banner -->
    <section class="hero" id="home">
      <img src="/images/官網Banner_MOBEIL0316.jpg" alt="Hero Banner" />
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>Tonka 汽車周邊</h1>
          <p>專業汽車配件 · 一站式服務中心</p>
          <a href="#products" class="hero-btn">立即選購</a>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
      <h2 class="section-title">我們的服務</h2>
      <p class="section-subtitle">為您的愛車提供全方位的專業服務</p>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">🚗</div>
          <h3>車輛保養</h3>
          <p>專業的特斯拉車輛保養服務，讓您的愛車始終保持最佳狀態</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🎨</div>
          <h3>包膜改色</h3>
          <p>高品質車身貼膜服務，保護車漆的同時彰顯個性</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🛡️</div>
          <h3>犀牛皮保護</h3>
          <p>頂級漆面保護膜，有效防止刮蹭和石子飛濺</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🌞</div>
          <h3>隔熱紙</h3>
          <p>專業隔熱膜安裝，有效阻隔紫外線和熱量</p>
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
</script>

<style scoped>
</style>
