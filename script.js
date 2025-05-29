// ウェブサイトの主要な機能を管理するJavaScriptファイル

document.addEventListener('DOMContentLoaded', function() {
    // ---------- モバイルメニューの制御 ----------
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
      });
      
      // メニューリンクをクリックしたらメニューを閉じる
      const navLinks = document.querySelectorAll('nav ul li a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('show');
        });
      });
    }
  
    // ---------- スクロール時のヘッダー制御 ----------
    const header = document.querySelector('header');
    
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  
    // ---------- スクロールアニメーション ----------
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    if (animatedElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }
  
    // ---------- パーティクルアニメーション ----------
    const particlesContainer = document.getElementById('dataParticles');
    
    if (particlesContainer) {
      createParticles();
    }
    
    function createParticles() {
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // ランダムなサイズとポジション
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
      }
    }
  
    // ---------- スムーススクロール ----------
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // ---------- お問い合わせフォーム ----------
    // Formspreeを使用しているため、JavaScript側での処理は最小限にしています
    // フォームメッセージの表示機能のみ実装
    
    const formMessage = document.getElementById('formMessage');
    
    // フォーム送信後にリダイレクトで戻ってきた場合のメッセージ表示
    if (window.location.search.includes('submitted=true')) {
      if (formMessage) {
        formMessage.textContent = "お問い合わせありがとうございます。メッセージが送信されました。";
        formMessage.style.backgroundColor = "#d4edda";
        formMessage.style.color = "#155724";
        formMessage.style.padding = "10px";
        formMessage.style.borderRadius = "4px";
      }
    }
  });