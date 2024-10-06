// 載入婚紗照片
function loadPhotos() {
    // 婚紗照片資料
    const photos = [];

    // 生成 80 張照片，使用 padStart 確保索引是兩位數
    for (let i = 1; i <= 80; i++) {
        const paddedIndex = String(i).padStart(2, '0'); 
        photos.push({
            src: `images/PGG_${paddedIndex}.jpg`,   // 圖片路徑
            alt: `婚紗照片${paddedIndex}`,          // 圖片描述
            index: i                                // 照片索引
        });
    }
    
    // 找到圖片容器與幻燈片容器
    const galleryElement = document.getElementById('gallery-container');
    const photoSlide = document.getElementById('slides-container');
    
    // 將每張照片加入到畫廊與幻燈片中
    photos.forEach(photo => {
        // 創建圖片元素
        const img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = "lazy";  // 懶加載圖片
        img.onclick = () => openLightbox(photo.index);  // 點擊圖片開啟 Lightbox
        galleryElement.appendChild(img);  // 加入圖片到畫廊
        
        // 創建幻燈片元素
        const slideDiv = document.createElement("div");
        slideDiv.className = "mySlides";
        const slideImg = document.createElement("img");
        slideImg.src = photo.src;
        slideImg.alt = photo.alt;
        slideImg.loading = "lazy";  // 懶加載圖片
        slideDiv.appendChild(slideImg);  // 加入圖片到幻燈片
        photoSlide.appendChild(slideDiv);  // 加入幻燈片
    });
}

// 初始化幻燈片索引
let slideIndex = 1;

// 開啟 Lightbox
function openLightbox(index) {
    currentSlide(index);  // 顯示當前幻燈片
    document.getElementById("lightbox").style.display = "flex";  // 顯示 Lightbox
    showSlides(slideIndex);  // 顯示幻燈片
}

// 關閉 Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";  // 隱藏 Lightbox
}

// 切換到下一張或上一張幻燈片
function plusSlides(n) {
    showSlides(slideIndex += n);  // 切換幻燈片
}

// 顯示當前幻燈片
function currentSlide(n) {
    showSlides(slideIndex = n);  // 顯示指定的幻燈片
}

// 顯示指定的幻燈片
function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    
    // 循環顯示幻燈片
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // 隱藏所有幻燈片
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // 顯示當前幻燈片
    slides[slideIndex - 1].style.display = "block";  
}

// 鍵盤導航事件處理
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display === "flex") {
        if (event.key === "Escape") {
            closeLightbox();  // 按下 ESC 關閉 Lightbox
        } else if (event.key === "ArrowLeft") {
            plusSlides(-1);  // 按下左箭頭切換到上一張
        } else if (event.key === "ArrowRight") {
            plusSlides(1);  // 按下右箭頭切換到下一張
        }
    }
});

// 設定婚宴時間
const weddingDate = new Date("2024-11-02T11:00:00").getTime();

// 倒數計時函數
const countdownFunction = () => {
    const now = new Date().getTime();  // 當前時間
    const distance = weddingDate - now;  // 剩餘時間

    // 計算天、時、分、秒
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 更新倒數計時的顯示
    document.getElementById("countdown").innerHTML = `${days}天 ${hours}小時 ${minutes}分鐘 ${seconds}秒`;

    // 如果倒數結束
    if (distance < 0) {
        clearInterval(x);  // 停止計時
        document.getElementById("countdown").innerHTML = "婚宴開始！";
    }
};

// 每秒更新倒數計時
const x = setInterval(countdownFunction, 1000);

// 加入 Google 行事曆的函數
const addToGoogleCalendar = () => {
    const event = {
        'summary': 'JunLin & ShuFei 婚宴',
        'location': '幸福莊園 House Wedding',
        'description': '婚宴邀請函',
        'start': {
            'dateTime': '2024-11-02T11:00:00',
            'timeZone': 'Asia/Taipei'
        },
        'end': {
            'dateTime': '2024-11-02T14:00:00',
            'timeZone': 'Asia/Taipei'
        },
    };

    // 生成 Google 行事曆 URL
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.summary)}&dates=${event.start.dateTime.replace(/-|:|\.\d{3}/g, '')}/${event.end.dateTime.replace(/-|:|\.\d{3}/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(calendarUrl, '_blank');  // 在新窗口中打開行事曆連結
};

// 綁定加入 Google 行事曆按鈕的點擊事件
document.getElementById("add-to-calendar").onclick = addToGoogleCalendar;

// 切換各個 section 的顯示狀態
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.panel');

    // 關閉其他 sections
    sections.forEach(section => {
        if (section.id !== sectionId) {
            section.style.display = "none";
        }
    });

    // 切換當前 section 顯示狀態
    const panel = document.getElementById(sectionId);
    panel.style.display = (panel.style.display === "none" || panel.style.display === "") ? "block" : "none";
}

// 隱藏主內容區
document.getElementById("main-content").classList.add("hidden");

let welcomeTimeout;  // 計時器

// 在 DOM 加載完成後執行
document.addEventListener("DOMContentLoaded", function() {
    // 初始化圖片
    loadPhotos();

    // 初始化歡迎畫面計時器
    startWelcomeTimer();  

    // 顯示歡迎畫面
    document.getElementById("welcome-screen").style.display = "flex";
});

// 歡迎畫面計時器函數
function startWelcomeTimer() {
    welcomeTimeout = setTimeout(closeWelcome, 10000);  // 10 秒後關閉歡迎畫面
}

// 關閉歡迎畫面
function closeWelcome() {
	// 瀏覽器規則，用戶交互後才能播放音樂
    audio.play();
	
    clearTimeout(welcomeTimeout);  // 清除計時器
	const welcomeScreen = document.getElementById('welcome-screen');
	// 加入淡出效果
	welcomeScreen.classList.add('fade-out');
	// 等待1秒淡出完成後隱藏元素
	setTimeout(() => {
		welcomeScreen.classList.add('hidden');
	}, 2000); // 2秒後隱藏
	//document.getElementById("welcome-screen").style.display = "none";  // 隱藏歡迎畫面
    document.getElementById("main-content").classList.remove("hidden");  // 顯示主內容
	
	// YouTube iframe父層預設display:none，故改在此加載
	player = new YT.Player('youtube-player', {
		events: {
			'onStateChange': onPlayerStateChange
		}
	});
}

// 顯示警告訊息
function showAlert() {
    alert("不只錢到！人也要到！請帶著紅包到現場！");
}

let imageIndex = 1;
const totalImages = 5;

function rotateImages() {
    const img = document.getElementById('title-carousel');
    img.src = `images/title_0${imageIndex}.png`;

    imageIndex++;
    if (imageIndex > totalImages) {
        imageIndex = 1;
    }
}

setInterval(rotateImages, 5000); // 每 5 秒切換一次圖片

// 控制背景播放音樂與YouTube播放時會被暫停情況
var player;
var audio = document.getElementById("background-music");
var audioPlayTimer = null;

// This function handles the YouTube player state changes
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		// YouTube影片播放中，關閉背景音樂
		audio.pause();
		// YouTube影片播放中，檢查是否有正要啟動播放背景音樂的動作，將其取消
		if (audioPlayTimer != null) {
			clearTimeout(audioPlayTimer);
			audioPlayTimer = null;
		}
	} else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
		// YouTube影片暫停或結束，檢查是否有正要執行啟動播放背景音樂的動作，將其取消
		if (audioPlayTimer != null) {
			clearTimeout(audioPlayTimer);
			audioPlayTimer = null;
		}
		// YouTube影片暫停或結束，等待3秒後啟動播放背景音樂
		audioPlayTimer = setTimeout(function() {
			audio.play();
		}, 3000); // 3000 milliseconds = 3 seconds
	}
}