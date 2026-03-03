/**
 * ملف التحكم الكامل لصفحة الروابط
 * جميع الوظائف التفاعلية في مكان واحد
 */

// ========== تهيئة المتغيرات العامة ==========
const notificationContainer = document.getElementById('notificationContainer');
let currentTheme = 'light';

// ========== انتظار تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ تم تحميل صفحة الروابط');
    
    // تهيئة جميع الوظائف
    initLowerThirds();
    initParticles();
    initToolbarButtons();
    checkForOffer();
});

// ========== 1. وظائف Lower Thirds ==========
function initLowerThirds() {
    const lowerThirdButtons = document.querySelectorAll('.lower-third-btn');
    
    lowerThirdButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // تأثير النقر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // الحصول على معلومات الزر
            const action = this.dataset.action;
            const link = this.dataset.link;
            const title = this.querySelector('h3').textContent;
            
            console.log(`👆 تم النقر على: ${title}`);
            
            // تنفيذ الإجراء المناسب
            handleLowerThirdClick(action, link, title);
        });
        
        // تأثيرات إضافية عند hover
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon-wrapper');
            if (icon) {
                icon.style.transition = 'all 0.3s ease';
            }
        });
    });
}

function handleLowerThirdClick(action, link, title) {
    switch(action) {
        case 'youtube':
            showNotification(`🚀 جاري فتح قناة يوتيوب`, 'info');
            setTimeout(() => {
                window.open(link || 'https://youtube.com', '_blank');
            }, 500);
            break;
            
        case 'twitter':
            showNotification(`🐦 جاري فتح تويتر`, 'info');
            setTimeout(() => {
                window.open(link || 'https://twitter.com', '_blank');
            }, 500);
            break;
            
        case 'instagram':
            showNotification(`📸 جاري فتح إنستغرام`, 'info');
            setTimeout(() => {
                window.open(link || 'https://instagram.com', '_blank');
            }, 500);
            break;
            
        case 'linkedin':
            showNotification(`💼 جاري فتح لينكد إن`, 'info');
            setTimeout(() => {
                window.open(link || 'https://linkedin.com', '_blank');
            }, 500);
            break;
            
        case 'facebook':
            showNotification(`📘 جاري فتح فيسبوك`, 'info');
            setTimeout(() => {
                window.open(link || 'https://facebook.com', '_blank');
            }, 500);
            break;
            
        case 'github':
            showNotification(`💻 جاري فتح GitHub`, 'info');
            setTimeout(() => {
                window.open(link || 'https://github.com', '_blank');
            }, 500);
            break;
            
        default:
            showNotification(`تم النقر على: ${title}`, 'success');
    }
    
    // تتبع الحدث (للتحليلات)
    trackEvent('lower_third_click', action, title);
}

// ========== 2. وظائف الروابط الإضافية ==========
function openProject(projectId) {
    showNotification(`📁 جاري فتح المشروع ${projectId}`, 'info');
    
    // محاكاة فتح المشروع
    setTimeout(() => {
        showNotification(`✅ تم فتح المشروع بنجاح`, 'success');
    }, 1000);
}

function copyDiscountCode(code) {
    // نسخ الكود إلى الحافظة
    navigator.clipboard.writeText(code).then(() => {
        showNotification(`✅ تم نسخ الكود: ${code}`, 'success');
        
        // فتح النافذة المنبثقة
        openModal();
    }).catch(err => {
        showNotification('❌ فشل نسخ الكود', 'error');
    });
}

// ========== 3. وظائف شريط الأدوات ==========
function initToolbarButtons() {
    // تحديث أيقونة الوضع الحالي
    updateThemeIcon();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    showNotification('⬆️ تم التمرير للأعلى', 'info');
}

function sharePage() {
    // التحقق من دالة المشاركة الأصلية
    if (navigator.share) {
        navigator.share({
            title: 'صفحة الروابط الخاصة بي',
            text: 'تفقد روابطي المهمة هنا',
            url: window.location.href
        }).then(() => {
            showNotification('✅ تمت المشاركة بنجاح', 'success');
        }).catch(() => {
            showNotification('❌ فشلت المشاركة', 'error');
        });
    } else {
        // إذا لم تكن مدعومة، نسخ الرابط
        copyPageLink();
    }
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeIcon.className = 'fas fa-moon';
        currentTheme = 'light';
        showNotification('☀️ تم تفعيل الوضع النهاري', 'success');
    } else {
        body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
        currentTheme = 'dark';
        showNotification('🌙 تم تفعيل الوضع الليلي', 'success');
    }
    
    // حفظ التفضيل في localStorage
    localStorage.setItem('theme', currentTheme);
}

function updateThemeIcon() {
    // استرجاع التفضيل المحفوظ
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
        currentTheme = 'dark';
    }
}

function copyPageLink() {
    const link = window.location.href;
    
    navigator.clipboard.writeText(link).then(() => {
        showNotification('🔗 تم نسخ رابط الصفحة', 'success');
    }).catch(() => {
        showNotification('❌ فشل نسخ الرابط', 'error');
    });
}

// ========== 4. وظائف النافذة المنبثقة ==========
function openModal() {
    const modal = document.getElementById('offerModal');
    modal.style.display = 'flex';
    
    // إغلاق النافذة بالنقر خارجها
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

function closeModal() {
    const modal = document.getElementById('offerModal');
    modal.style.display = 'none';
}

function checkForOffer() {
    // عرض العرض بعد 30 ثانية من تصفح الصفحة
    setTimeout(() => {
        // التحقق من عدم ظهور العرض سابقاً
        if (!localStorage.getItem('offerShown')) {
            openModal();
            localStorage.setItem('offerShown', 'true');
        }
    }, 30000);
}

// ========== 5. وظائف الإشعارات ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // اختيار الأيقونة المناسبة
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // إضافة أنيميشن الخروج
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            to {
                transform: translateX(-100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========== 6. وظائف الخلفية ==========
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    // إضافة جزيئات عشوائية
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, ' + Math.random() * 0.5 + ')';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // إضافة أنيميشن للجزيئات
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            from { transform: translateY(0) translateX(0); }
            to { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); }
        }
    `;
    document.head.appendChild(style);
}

// ========== 7. وظائف التحميل المسبق ==========
function preloadImages() {
    const images = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/300x200'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ========== 8. وظائف التحليلات ==========
function trackEvent(category, action, label) {
    console.log(`📊 [${category}] ${action}: ${label}`);
    
    // مثال: إرسال إلى Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// ========== 9. وظائف المساعدة ==========
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ========== 10. تهيئة الصفحة ==========
window.addEventListener('load', function() {
    console.log('✅ تم تحميل جميع الموارد');
    preloadImages();
    
    // عرض ترحيب
    setTimeout(() => {
        showNotification('👋 مرحباً بك في صفحتي', 'info');
    }, 1000);
});

// منع إعادة تحميل الصفحة عند النقر على الروابط
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
});

// تحديث النتائج بشكل حيوي
window.addEventListener('scroll', function() {
    // إخفاء أو إظهار زر العودة للأعلى
    const toolbar = document.querySelector('.bottom-toolbar');
    if (window.scrollY > 300) {
        toolbar.style.opacity = '1';
    } else {
        toolbar.style.opacity = '0.5';
    }
});
