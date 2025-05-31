// script.js

document.addEventListener('DOMContentLoaded', function() {
  // ----- Three.js 3Dパーティクル -----
  let scene, camera, renderer, particles;
  let mouseX = 0, mouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  function init3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sparkleGeometry = new THREE.BufferGeometry();
    const sparkleVertices = [];
    for (let i = 0; i < 10000; i++) {
      vertices.push(
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000
      );
    }
    for (let i = 0; i < 2000; i++) {
      sparkleVertices.push(
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    sparkleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sparkleVertices, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const sparkleMaterial = new THREE.PointsMaterial({
      color: 0xb829dd,
      size: 4,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    particles = new THREE.Points(geometry, material);
    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(particles);
    scene.add(sparkles);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate3D() {
    requestAnimationFrame(animate3D);
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  init3D();
  animate3D();

  // ----- スクロールアニメーション -----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });

  // ----- ヘッダースクロール -----
  const header = document.getElementById('header');
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
  });

  // ----- モバイルメニュー -----
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // ----- スムーススクロール -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        navMenu.classList.remove('show');
      }
    });
  });

  // ----- スキルチャート -----
  const createSkillChart = (canvasId, labels, data, color) => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: `rgba(${color}, 0.2)`,
          borderColor: `rgba(${color}, 1)`,
          borderWidth: 2,
          pointBackgroundColor: `rgba(${color}, 1)`,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: `rgba(${color}, 1)`
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#b8b8b8',
              font: {
                size: 11
              }
            },
            ticks: {
              display: false
            },
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  };

  // チャートの初期化
  setTimeout(() => {
    createSkillChart(
      'programmingChart',
      ['Python', 'JavaScript', 'PHP', 'HTML/CSS', 'R'],
      [95, 85, 80, 90, 75],
      '0, 212, 255'
    );
    createSkillChart(
      'dataToolsChart',
      ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch'],
      [90, 85, 80, 75, 70],
      '184, 41, 221'
    );
  }, 1000);

  // ----- タイピングエフェクト -----
  const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  };
  // ヒーローセクションのタイピング
  const heroTitle = document.querySelector('.hero-content h1 span');
  if (heroTitle) {
    setTimeout(() => {
      typeWriter(heroTitle, 'Data Science Student', 100);
    }, 500);
  }

  // ----- フォーム送信 -----
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Formspreeが処理するのでデフォルトの動作を許可
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
      submitBtn.disabled = true;
    });
  }

  // ----- パララックス効果 -----
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});
