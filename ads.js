// دالة الفلترة حسب النوع
let currentFilter = '';
let allAds = [];

function filterByType(type){
  currentFilter = type;
  
  // تحديث الأزرار النشطة
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // تطبيق الفلترة
  displayAds();
}

// دالة البحث والفلترة
function filterAds(){
  displayAds();
}

// دالة عرض الإعلانات
function displayAds(){
  const container = document.getElementById('adsContainer');
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  
  let filteredAds = allAds.filter(ad => {
    const matchesType = !currentFilter || ad.type === currentFilter;
    const matchesSearch = !searchText || 
      ad.title.toLowerCase().includes(searchText) ||
      ad.description.toLowerCase().includes(searchText);
    
    return matchesType && matchesSearch;
  });
  
  if(filteredAds.length === 0){
    container.innerHTML = `
      <div class="empty">
        <div class="empty-icon">📭</div>
        <p>لم يتم العثور على إعلانات</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredAds.map(ad => `
    <div class="ad-card" onclick="viewAd('${ad.id}')">
      <div class="ad-image">
        ${ad.icon || '📢'}
      </div>
      
      <div class="ad-body">
        <span class="ad-badge badge-${ad.type}">${getTypeName(ad.type)}</span>
        
        <h3 class="ad-title">${ad.title}</h3>
        
        <p class="ad-description">${ad.description}</p>
        
        <div class="ad-meta">
          <span class="meta-item">⭐ ${ad.rating}</span>
          <span class="meta-item">👁️ ${ad.views}</span>
          <span class="meta-item">📅 ${ad.date}</span>
        </div>
        
        <div class="ad-footer">
          <span class="ad-price">${ad.price}$</span>
          <button class="ad-btn">اهتمام</button>
        </div>
      </div>
    </div>
  `).join('');
}

// دالة الحصول على اسم النوع
function getTypeName(type){
  const types = {
    'social': '📱 سوشيال ميديا',
    'design': '🎨 تصميم',
    'marketing': '📈 تسويق',
    'video': '🎬 فيديو'
  };
  return types[type] || 'إعلان';
}

// دالة عرض الإعلان كاملاً
function viewAd(id){
  alert(`تم اختيار الإعلان: ${id}`);
  // يمكن توجيه المستخدم لصفحة الإعلان الكاملة
}

// دالة الانتقال للصفحات
function goHome(){
  window.location.href = 'index.html';
}

function goCreate(){
  window.location.href = 'create-ads.html';
}

function goProfile(){
  window.location.href = 'profile.html';
}

// تحميل البيانات عند فتح الصفحة
window.addEventListener('load', () => {
  // بيانات تجريبية
  allAds = [
    {
      id: '1',
      type: 'social',
      title: 'إعلان فيسبوك احترافي',
      description: 'إنشاء إعلان فعال على فيسبوك بتصاميم احترافية',
      price: 150,
      rating: 4.8,
      views: 1200,
      date: '2024-01-15',
      icon: '📱'
    },
    {
      id: '2',
      type: 'design',
      title: 'تصميم بوستر جذاب',
      description: 'تصميم بوستر احترافي لحملتك الإعلانية',
      price: 100,
      rating: 4.9,
      views: 950,
      date: '2024-01-14',
      icon: '🎨'
    },
    {
      id: '3',
      type: 'marketing',
      title: 'استراتيجية تسويق شاملة',
      description: 'خطة تسويق متكاملة لزيادة المبيعات',
      price: 250,
      rating: 4.7,
      views: 2100,
      date: '2024-01-13',
      icon: '📈'
    },
    {
      id: '4',
      type: 'video',
      title: 'فيديو إعلاني احترافي',
      description: 'إنتاج فيديو إعلاني عالي الجودة',
      price: 300,
      rating: 4.9,
      views: 1800,
      date: '2024-01-12',
      icon: '🎬'
    },
    {
      id: '5',
      type: 'social',
      title: 'إعلان تيك توك فعال',
      description: 'إعلان تسويقي متخصص لمنصة تيك توك',
      price: 120,
      rating: 4.6,
      views: 1500,
      date: '2024-01-11',
      icon: '📱'
    },
    {
      id: '6',
      type: 'design',
      title: 'تصميم غلاف سوشيال ميديا',
      description: 'تصميم غلاف احترافي لجميع المنصات',
      price: 80,
      rating: 4.8,
      views: 800,
      date: '2024-01-10',
      icon: '🎨'
    }
  ];
  
  // عرض الإعلانات
  displayAds();
});

// إغلاق popup البحث عند الضغط خارجه
document.addEventListener('click', (e) => {
  if(!e.target.closest('.search-container')){
    // أي إجراء إضافي إذا لزم الأمر
  }
});
