// ===== CLYCLE PLATFORM - MAIN APPLICATION SCRIPT =====
// Enhanced with cooler animations, interactions, and improved UX

// ===== GLOBAL VARIABLES AND CONFIGURATION =====
let currentUser = null;
let wishlist = JSON.parse(localStorage.getItem('clycle_wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('clycle_cart')) || [];
let currentPage = 1;
let itemsPerPage = 12;
let filteredProducts = [];
let allProducts = [];

// ===== ENHANCED PRODUCT DATA =====
const PRODUCTS = [
    // Yoga Mats (5 items)
    {
        id: 'ym-001',
        name: 'Yoga Mat',
        category: 'yoga-mats',
        price: 800,
        condition: 'like-new',
        availability: 'available',
        specs: ['2mm thickness', 'Non-slip surface', 'Eco-friendly TPE material', '183cm x 61cm'],
        images: [
            'https://live.staticflickr.com/65535/54713637664_cbbba9da65_w.jpg?text=Yoga+Mat',
            'https://live.staticflickr.com/65535/54713637659_dc7185bc43_w.jpg?text=Yoga+Mat+Detail+1',
            'https://live.staticflickr.com/65535/54713619933_7509bd8c7d_w.jpg?text=Yoga+Mat+Detail+2'
        ],
        alt: 'Premium pink yoga mat with non-slip surface',
        description: 'High-quality yoga mat perfect for all types of yoga practice. Features excellent grip and cushioning.',
        seller: 'Thaneswari',
        postedDate: '2025-07-20'
    },
    {
        id: 'ym-002',
        name: 'Premium Yoga Mat',
        category: 'yoga-mats',
        price: 1200,
        condition: 'good',
        availability: 'available',
        specs: ['6mm thickness', 'Lightweight', 'Foldable design', '173cm x 61cm'],
        images: [
            'https://live.staticflickr.com/65535/54713747590_eddfd7135a_w.jpg?text=Premium+Yoga+Mat',
            'https://live.staticflickr.com/65535/54712576887_69fbc257b8_w.jpg?text=Folded+Mat',
            'https://live.staticflickr.com/65535/54713620138_6cc189e437_w.jpg?text=Mat+Detail'
        ],
        alt: 'Compact foldable premium yoga mat in dark green',
        description: 'Perfect for students who practice yoga in dorms or travel frequently. Ultra-portable design.',
        seller: 'Sanjana',
        postedDate: '2025-07-18'
    },
    {
        id: 'ym-003',
        name: 'Meditation Mat',
        category: 'yoga-mats',
        price: 550,
        condition: 'new',
        availability: 'available',
        specs: ['Organic cotton cover', 'Washable', '33cm diameter'],
        images: [
            'https://live.staticflickr.com/65535/54712576872_37b404e386_w.jpg?text=Meditation+Mat',
            'https://live.staticflickr.com/65535/54713638304_953d4b7a87_w.jpg?text=Cushion+Detail',
            'https://live.staticflickr.com/65535/54713748250_d9a9d284d3_w.jpg?text=Folded+Detail'
        ],
        alt: 'Round meditation yoga mat with organic cotton cover',
        description: 'Complete meditation mat. Perfect for mindfulness practice.',
        seller: 'Malavika',
        postedDate: '2025-07-15'
    },
    {
        id: 'ym-004',
        name: 'Badminton Racket',
        category: 'yoga-mats',
        price: 550,
        condition: 'like-new',
        availability: 'available',
        specs: ['Graphite composite frame', 'Set of 1', 'Lightweight', 'Includes full cover', 'Grip size G4'],
        images: [
            'https://live.staticflickr.com/65535/54713415431_887a6a54f3_w.jpg?text=Yonex+Badminton+Racket',
            'https://live.staticflickr.com/65535/54713637894_dda745f3a9_w.jpg?text=Racket',
            'https://live.staticflickr.com/65535/54713619878_0bd06c4a4f_w.jpg?text=back'
        ],
        alt: 'Set of one Yonex Badminton Racket',
        description: 'Lightweight Yonex badminton racket with a graphite composite frame, designed for intermediate to advanced players. Offers excellent control and maneuverability, making it ideal for fast-paced rallies. Includes a full protective cover for storage and transport.',
        seller: 'Somansha',
        postedDate: '2025-07-12'
    },
    {
        id: 'ym-005',
        name: 'Shuttlecock',
        category: 'yoga-mats',
        price: 40,
        condition: 'good',
        availability: 'sold',
        specs: ['Nylon skirt with composite cork base', 'Designed for indoor & outdoor use'],
        images: [
            'https://live.staticflickr.com/65535/54713415336_f8406e0cfb_w.jpg?text=Shuttlecock',
            'https://live.staticflickr.com/65535/54713620498_8c1b5a1f99_w.jpg?text=Detail'
        ],
        alt: 'Yonex Mavis 350 nylon shuttlecock',
        description: 'Durable nylon shuttlecock designed for consistent flight performance and long-lasting play. Suitable for both casual and competitive matches. Comes in a tube of 6 with medium speed rating, perfect for indoor and outdoor badminton sessions.',
        seller: 'Upagnya',
        postedDate: '2025-07-10'
    },

    // Buckets & Containers (2 items)
    {
        id: 'bk-001',
        name: 'Storage Bucket',
        category: 'containers',
        price: 350,
        condition: 'good',
        availability: 'available',
        specs: ['Set of 3 buckets', 'Different sizes', 'Stackable design', 'Durable plastic'],
        images: [
            'https://live.staticflickr.com/65535/54713636999_8714e7141a_w.jpg?text=student+marketplace'
       ],
        alt: 'Colorful storage buckets',
        description: 'Perfect for dorm room organization. Great for storing water, clothes, or cleaning supplies.',
        seller: 'Gayatri',
        postedDate: '2024-12-19'
    },
    {
        id: 'bk-002',
        name: 'Green Bucket',
        category: 'containers',
        price: 280,
        condition: 'like-new',
        availability: 'available',
        specs: ['Large capacity', 'Easy carry handles', 'Durable'],
        images: [
            'https://live.staticflickr.com/65535/54713747550_9ebfdbd71e_w.jpg?text=college+exchange+platform',
            'https://live.staticflickr.com/65535/54713619323_1fb64cb737_w.jpg?text=university+item+rental'
        ],
        alt: 'Large green bucket with ventilation holes',
        description: 'Essential for any student, multiuse bucket.',
        seller: 'Ramukaka',
        postedDate: '2024-12-17'
    },

    // Clothing (5+ items)
    {
        id: 'cl-001',
        name: 'University Hoodie',
        category: 'clothing',
        price: 850,
        condition: 'good',
        availability: 'available',
        size: 'M',
        specs: ['Cotton blend', 'University logo', 'IIMR IPM IC', 'Size M'],
        images: [
            'https://live.staticflickr.com/65535/54713638114_3e5612a569_w.jpg?text=University+Hoodie+Back',
            'https://live.staticflickr.com/65535/54712577232_5c0876d8fa_w.jpg?text=Hoodie+Logo',
            'https://live.staticflickr.com/65535/54713747695_462f918e7c_w.jpg?text=Hoodie+Sleeve'
        ],
        alt: 'Black and beige university hoodie with college logo',
        description: 'Official university merchandise. Comfortable and warm for campus life.',
        seller: 'Upsyy',
        postedDate: '2025-07-21'
    },
    {
        id: 'cl-002',
        name: 'Chill Guy t-shirt',
        category: 'clothing',
        price: 300,
        condition: 'like-new',
        availability: 'available',
        size: 'S',
        specs: ['100% cotton denim', 'Classic fit', 'Size s'],
        images: [
            'https://live.staticflickr.com/65535/54712577442_53c94e1fe6_w.jpg?text=Tshirt+Detail'
        ],
        alt: 'Cool chill guy kapibara cotton t-shirt',
        description: 'A timeless black cotton t-shirt with a comfortable regular fit. Made from breathable, soft fabric suitable for everyday wear. Minimalist design makes it easy to pair with jeans, shorts, or skirts for a casual, versatile look.',
        seller: 'Malavika',
        postedDate: '2025-07-20'
    },
    {
        id: 'cl-003',
        name: 'Blue Kathakali print t-shirt',
        category: 'clothing',
        price: 450,
        condition: 'good',
        availability: 'available',
        size: 'M',
        specs: ['Cotton blend', 'Wrinkle-resistant', 'Regular fit', 'Size M'],
        images: [
            'https://live.staticflickr.com/65535/54713619803_19be66e86d_w.jpg?text=tshirt+detail'
        ],
        alt: 'Casual blue crew neck t-shirt with short sleeves',
        description: 'A soft, lightweight crew neck t-shirt in a vibrant blue shade. Designed for comfort and versatility, perfect for daily wear or casual outings. Easy to style with jeans, shorts, or joggers.',
        seller: 'Upagnya',
        postedDate: '2024-12-19'
    },
    {
        id: 'cl-004',
        name: 'Casual Black Tee',
        category: 'clothing',
        price: 360,
        condition: 'like-new',
        availability: 'available',
        size: 'L',
        specs: ['Short Sleeves', 'Cotton blend material', 'Breathable & lightweight', 'Size L'],
        images: [
            'https://live.staticflickr.com/65535/54712574232_aa3c283400_w.jpg?text=Black+tee'
        ],
        alt: 'Casual black tee with short sleeves and crew neck',
        description: 'A simple and comfortable casual black tee made from breathable cotton blend fabric. Perfect for everyday wear, layering, or lounging. Minimal design makes it a versatile wardrobe essential.',
        seller: 'Sanjana',
        postedDate: '2025-07-18'
    },
    {
        id: 'cl-005',
        name: 'Powder Blue Left Croc',
        category: 'clothing',
        price: 150,
        condition: 'good',
        availability: 'available',
        size: '38',
        specs: ['Slip-on', 'Lightweight & water-friendly', 'Powder Blue', 'Size 38'],
        images: [
            'https://live.staticflickr.com/65535/54713638474_5d3edc58f1_w.jpg?text=Croc+Front',
            'https://live.staticflickr.com/65535/54712578157_b1893e71f2_n.jpg?text=Croc+Back'
        ],
        alt: 'Single powder blue left Croc sandal with ventilation holes and molded sole',
        description: 'A single powder blue left Croc sandal, lightweight and water-friendly. Comfortable footbed and ventilation ports make it ideal for casual wear, beach trips, or as a spare replacement piece.',
        seller: 'Malavika',
        postedDate: '2025-07-17'
    },
    {
        id: 'cl-006',
        name: 'Powder Blue Right Croc',
        category: 'clothing',
        price: 150,
        condition: 'good',
        availability: 'available',
        size: '38',
        specs: ['Material: Croslite™ resin', 'Slip-on comfort design', 'Lightweight & water-friendly', 'Size 38'],
        images: [
            'https://live.staticflickr.com/65535/54713415656_7b68c80a97_w.jpg?text=Croc+Front',
            'https://live.staticflickr.com/65535/54712578157_b1893e71f2_n.jpg?text=Croc+Back'
        ],
        alt: 'Single powder blue right Croc sandal with ventilation holes and cushioned footbed',
        description: 'A single powder blue right Croc sandal, lightweight and water-friendly. Designed with a cushioned molded footbed and ventilation ports for maximum comfort. Perfect for casual wear, poolside lounging, or replacing a missing right shoe.',
        seller: 'Malavika',
        postedDate: '2025-07-16'
    },
    {
        id: 'cl-007',
        name: 'Pink Tee with Rose Print',
        category: 'clothing',
        price: 550,
        condition: 'like-new',
        availability: 'available',
        size: 'S',
        specs: ['Material: 100% Cotton', 'crew neckline', 'Rose print graphic on chest', 'Size S'],
        images: [
            'https://live.staticflickr.com/65535/54713693134_d37d58fb68_m.jpg?text=tee+Front',
        ],
        alt: 'Pastel pink t-shirt with a small rose print on the chest',
        description: 'A soft pastel pink cotton t-shirt featuring a delicate rose print on the chest. Lightweight, breathable, and perfect for casual outings or layering under a jacket. Combines comfort with a subtle, stylish design.',
        seller: 'Somansha',
        postedDate: '2025-07-15'
    },
    
    // Books (5 items)
    {
        id: 'bk-101',
        name: 'The Last Lecture',
        category: 'books',
        price: 850,
        condition: 'good',
        availability: 'available',
        specs: ['Latest edition', 'Minimal highlighting', 'ISBN: 978-0321803221'],
        images: [
            'https://live.staticflickr.com/65535/54713746485_5e29198a6c_w.jpg?text=college+exchange+platform',
            'https://live.staticflickr.com/65535/54712574757_488a5a5ff0_w.jpg?text=college+exchange+platform'
        ],
        alt: 'Novel: The Last Lecture',
        description: 'Only read once, in very good condition, interesting book.',
        seller: 'Upsy',
        postedDate: '2024-12-21'
    },
    {
        id: 'bk-102',
        name: 'The Picture of Dorian Gray',
        category: 'books',
        price: 450,
        condition: 'like-new',
        availability: 'available',
        specs: ['By Oscar Wilde', 'Classic Book', 'Mint condition'],
        images: [
            'https://live.staticflickr.com/65535/54713636229_b280cf119f_n.jpg?text=student+book+resale',
            'https://live.staticflickr.com/65535/54713636364_056d461ff4_w.jpg?text=college+exchange+platform'
        ],
        alt: 'The Picture of Dorian Gray by Oscar Wilde',
        description: 'Classic novel in perfect mint condition.',
        seller: 'Vinaya Sathyanarayana',
        postedDate: '2024-12-20'
    },
    {
        id: 'bk-103',
        name: 'CAT Career Launcher Arithmetic Book',
        category: 'books',
        price: 750,
        condition: 'good',
        availability: 'available',
        specs: ['13th edition', 'Some highlighting', 'Complete text', 'Access code used'],
        images: [
            'https://live.staticflickr.com/65535/54713746560_ab8bf983d9_w.jpg?text=student+book+resale',
            'https://live.staticflickr.com/65535/54713636899_2e1296e305_w.jpg?text=student+book+resale'
        ],
        alt: 'CAT Career Launcher Arithmetic Book',
        description: 'Comprehensive introduction to arithmetic. Great for intro CAT courses.',
        seller: 'Dhoomketu',
        postedDate: '2024-12-19'
    },

    // Stationery (5+ items)
    {
        id: 'st-001',
        name: 'Cute Cat Diary',
        category: 'stationery',
        price: 230,
        condition: 'new',
        availability: 'available',
        specs: ['Unopened', 'Cute Cat Diary', 'Has Pen', 'Aesthetic'],
        images: [
            'https://live.staticflickr.com/65535/54713638819_3df11f0aca_w.jpg?text=student+book+resale'
        ],
        alt: 'Cute Cat Diary',
        description: 'Aesthetic Unopened Brown Cat Diary with Pen',
        seller: 'Mr. Verms',
        postedDate: '2024-12-21'
    },
    {
        id: 'st-002',
        name: 'Sharpie Highlighters',
        category: 'stationery',
        price: 450,
        condition: 'good',
        availability: 'available',
        specs: ['Sharpie highlighters in 6 colours- Orange, Yellow, Blue, Green, Pink, Purple'],
        images: [
            'https://live.staticflickr.com/65535/54713637779_4bd28aa28f_w.jpg?text=student+clothing+swap'
        ],
        alt: 'Complete Sharpie Highlighter Kit',
        description: 'Everything needed for classes. High-quality materials for annotating.',
        seller: 'Upagnya',
        postedDate: '2024-12-20'
    },
    {
        id: 'st-003',
        name: 'Stamps',
        category: 'stationery',
        price: 250,
        condition: 'new',
        availability: 'available',
        specs: ['Pack of 6 stamps', 'Red colour', 'Bright and Vibrant', 'Medium size'],
        images: [
            'https://live.staticflickr.com/65535/54713636234_3efcf76b60_n.jpg?text=student+book+resale',
            'https://live.staticflickr.com/65535/54713413516_b874efaea3_w.jpg?text=student+book+resale'
        ],
        alt: 'Set of six red coloured stamps for notebooks',
        description: 'Essential aesthetic stamps.',
        seller: 'Donna',
        postedDate: '2024-12-19'
    },
    {
        id: 'st-004',
        name: 'Washi Tapes',
        category: 'stationery',
        price: 100,
        condition: 'good',
        availability: 'available',
        specs: ['Set of 6 Washi Tapes', 'Various colors'],
        images: [
            'https://live.staticflickr.com/65535/54713637314_56524faa26_w.jpg?text=student+marketplace',
            'https://live.staticflickr.com/65535/54713638829_8acfb40e0a_w.jpg?text=student+marketplace'
        ],
        alt: 'Collection of various washi tapes in different colors',
        description: 'Complete washi tapes collection. Perfect for students who love variety.',
        seller: 'Thaneswari',
        postedDate: '2024-12-18'
    },
    {
        id: 'st-005',
        name: 'Post-Its',
        category: 'stationery',
        price: 100,
        condition: 'like-new',
        availability: 'available',
        specs: ['Multiple compartments', 'Different colours', 'Compact design', 'Very Sticky'],
        images: [
            'https://live.staticflickr.com/65535/54713620528_6d95c4e7c5_w.jpg?text=student+marketplace',
            'https://live.staticflickr.com/65535/54713748645_617e5655c5_w.jpg?text=student+marketplace'
        ],
        alt: 'Set of Post-Its and Annotating Tabs',
        description: 'Keep your study organized. Multiple compartments for all your sticky note supplies.',
        seller: 'Devangi',
        postedDate: '2024-12-17'
    },

    // Furniture (2+ items)
    {
        id: 'fn-001',
        name: 'Bed Study Table',
        category: 'furniture',
        price: 350,
        condition: 'good',
        availability: 'available',
        specs: ['Wooden', 'Built-in drawer', 'Cable management'],
        images: [
            'https://live.staticflickr.com/65535/54713413221_8d9d470219_w.jpg',
        ],
        alt: 'Wooden study desk with built-in drawers and cable management',
        description: 'Perfect bed study desk for dorm or apartment. Plenty of storage and workspace.',
        seller: 'Sagheera Sarthak',
        postedDate: '2024-12-16'
    },
    {
        id: 'fn-002',
        name: 'Chair',
        category: 'furniture',
        price: 700,
        condition: 'good',
        availability: 'available',
        specs: ['Metal Chair', 'Adjustable height', 'Sturdy construction', 'Has cusioning'],
        images: [
            'https://live.staticflickr.com/65535/54713617358_0f0b84a130_w.jpg?text=clycle',
            'https://live.staticflickr.com/65535/54713636654_6533aed4dd_n.jpg?text=clycle'
        ],
        alt: 'Metal Chair',
        description: 'Sturdy metal chair perfect for students.',
        seller: 'Ramukaka',
        postedDate: '2024-12-15'
    },

    // Miscellaneous (5 items)
    {
        id: 'mc-001',
        name: 'IPM05 Term VII Full Notes',
        category: 'miscellaneous',
        price: 500,
        condition: 'like-new',
        availability: 'available',
        specs: ['Complete Handwritten Notes', 'For All Subjects', 'Topper Notes', 'Clean Handwriting Notes'],
        images: [
            'https://live.staticflickr.com/65535/54713635669_aa3c283400.jpg?text=clycle',
            'https://live.staticflickr.com/65535/54713635849_5e5210f5fe_w.jpg?text=clycle',
            'https://live.staticflickr.com/65535/54713636799_2854869a13_w.jpg?text=clycle'
        ],
        alt: 'Handwritten Notes for all Subjects.',
        seller: 'Batch Topper',
        postedDate: '2024-12-14'
    },
    {
        id: 'mc-002',
        name: 'Whale Globe Lamp',
        category: 'miscellaneous',
        price: 100,
        condition: 'good',
        availability: 'available',
        specs: ['Compact size', 'Energy efficient', 'Beautiful Design', 'Halo Effect'],
        images: [
            'https://live.staticflickr.com/65535/54713414291_069b085921_w.jpg?text=clycle',
            'https://live.staticflickr.com/65535/54713746285_87a18a1e62_w.jpg?text=clycle'
        ],
        alt: 'Whale Globe Lamp',
        description: 'Perfect for dorm rooms.',
        seller: 'Sujaat',
        postedDate: '2024-12-13'
    },
    {
        id: 'mc-003',
        name: 'Kettle',
        category: 'miscellaneous',
        price: 400,
        condition: 'like-new',
        availability: 'available',
        specs: ['Black', 'Adjustable heating', 'Touch control'],
        images: [
            'https://live.staticflickr.com/65535/54713747115_bca446f884_w.jpg?text=clycle',
            'https://live.staticflickr.com/65535/54713747645_07f68e2647_w.jpg?text=clycle'
        ],
        alt: 'Modern multipurpose kettle for boiling water, cooking, and reheating',
        description: 'Kettle perfect for students in dorm rooms, quick and convenient.',
        seller: 'Verma',
        postedDate: '2024-12-12'
    },
    {
        id: 'mc-004',
        name: 'Apple Airpods with case',
        category: 'miscellaneous',
        price: 12000,
        condition: 'good',
        availability: 'available',
        specs: ['Wireless connectivity', 'Long battery life', 'Water resistant', 'Compact size'],
        images: [
            'https://live.staticflickr.com/65535/54713414436_0b06482f06_w.jpg?text=clycle',
            'https://live.staticflickr.com/65535/54713414496_c273512921_w.jpg?text=clycle'
        ],
        alt: 'Apple Airpods with wireless connectivity',
        description: 'Great sound quality in a portable package. Perfect for dorm use or study music.',
        seller: 'Saregama',
        postedDate: '2024-12-11'
    },
    {
        id: 'mc-005',
        name: 'Brown and Beige Curtains',
        category: 'miscellaneous',
        price: 350,
        condition: 'like-new',
        availability: 'sold',
        specs: ['Pretty curtains', 'Sheer curtains', 'Nice design', 'Good quality'],
        images: [
            'https://live.staticflickr.com/65535/54712576507_c7e9d824cc_w.jpg?text=clycle',
            'https://live.staticflickr.com/65535/54712575817_1406abf708_w.jpg?text=clycle'
        ],
        alt: 'Colourful beige and brown striped sheer curtains',
        description: 'Beautiful curtains for dorm room.',
        seller: 'Somansha',
        postedDate: '2024-12-10'
    }
];

// ===== ENHANCED UTILITY FUNCTIONS =====
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--white);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-xl);
                padding: var(--spacing-lg);
                z-index: 3000;
                transform: translateX(400px);
                transition: transform var(--transition-normal);
                border-left: 4px solid var(--success);
            }
            .notification.error {
                border-left-color: var(--error);
            }
            .notification.info {
                border-left-color: var(--accent-blue);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
            .notification-icon {
                font-weight: bold;
                font-size: var(--font-size-lg);
            }
            .notification.success .notification-icon {
                color: var(--success);
            }
            .notification.error .notification-icon {
                color: var(--error);
            }
            .notification.info .notification-icon {
                color: var(--accent-blue);
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
}

// ===== ENHANCED DATA LOADING AND MANAGEMENT =====
function loadProducts() {
    allProducts = [...PRODUCTS];
    filteredProducts = [...allProducts];
    return allProducts;
}

function getProductById(id) {
    return allProducts.find(product => product.id === id);
}

function searchProducts(query) {
    if (!query.trim()) return filteredProducts;
    
    const searchTerm = query.toLowerCase();
    return filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

function filterProducts(filters) {
    let filtered = [...allProducts];
    
    if (filters.category && filters.category !== '') {
        filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.condition && filters.condition !== '') {
        filtered = filtered.filter(product => product.condition === filters.condition);
    }
    
    if (filters.availability && filters.availability !== '') {
        filtered = filtered.filter(product => product.availability === filters.availability);
    }
    
    if (filters.minPrice !== undefined && filters.minPrice !== '') {
        filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
        filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice));
    }
    
    return filtered;
}

function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        case 'oldest':
            return sorted.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// ===== ENHANCED RENDERING FUNCTIONS =====
function renderProductCard(product, index = 0) {
    const isInWishlist = wishlist.includes(product.id);
    const isInCart = cart.some(item => item.id === product.id);
    
    return `
        <div class="product-card" style="animation-delay: ${index * 0.1}s" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.alt}" loading="lazy">
                <div class="product-overlay"></div>
                <div class="product-actions">
                    <button class="btn btn-secondary btn-sm wishlist-btn ${isInWishlist ? 'active' : ''}" 
                            data-product-id="${product.id}" 
                            aria-label="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                        ${isInWishlist ? '❤️' : '🤍'}
                    </button>
                    <button class="btn btn-primary btn-sm cart-btn ${isInCart ? 'active' : ''}" 
                            data-product-id="${product.id}"
                            ${product.availability === 'sold' ? 'disabled' : ''}
                            aria-label="${isInCart ? 'Remove from cart' : 'Add to cart'}">
                        ${isInCart ? '✓ Added' : '🛒 Add'}
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-badges">
                    <span class="product-condition badge-${product.condition}">${product.condition.replace('-', ' ')}</span>
                    <span class="product-availability badge-${product.availability}">${product.availability}</span>
                    ${product.size ? `<span class="product-size">Size: ${product.size}</span>` : ''}
                </div>
                <div class="product-specs">
                    ${product.specs.slice(0, 2).map(spec => `<span class="spec-item">• ${spec}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderProductGrid(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map((product, index) => renderProductCard(product, index)).join('');
    
    // Add event listeners for wishlist and cart buttons
    container.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', handleWishlistToggle);
    });
    
    container.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', handleCartToggle);
    });
}

function renderFeaturedListings() {
    const trendingProducts = allProducts
        .filter(p => p.availability === 'available')
        .sort((a, b) => b.price - a.price)
        .slice(0, 6);
    
    const recentProducts = allProducts
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 6);
    
    renderProductGrid(trendingProducts, 'trending-listings');
    renderProductGrid(recentProducts, 'recent-listings');
}

// ===== ENHANCED WISHLIST MANAGEMENT =====
function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('clycle_wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        showNotification('Added to wishlist!');
        return true;
    }
    return false;
}

function removeFromWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        localStorage.setItem('clycle_wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        showNotification('Removed from wishlist');
        return true;
    }
    return false;
}

function handleWishlistToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const productId = button.dataset.productId;
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
        removeFromWishlist(productId);
        button.innerHTML = '🤍';
        button.classList.remove('active');
        button.setAttribute('aria-label', 'Add to wishlist');
    } else {
        addToWishlist(productId);
        button.innerHTML = '❤️';
        button.classList.add('active');
        button.setAttribute('aria-label', 'Remove from wishlist');
    }
    
    // Add animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function updateWishlistBadge() {
    const badges = document.querySelectorAll('#wishlist-badge');
    badges.forEach(badge => {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'block' : 'none';
    });
}

function renderWishlistPage() {
    const container = document.getElementById('wishlist-content');
    const emptyState = document.getElementById('empty-wishlist');
    
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'block';
    
    const wishlistProducts = wishlist.map(id => getProductById(id)).filter(Boolean);
    
    container.innerHTML = `
        <div class="wishlist-grid">
            ${wishlistProducts.map(product => `
                <div class="wishlist-item" data-product-id="${product.id}">
                    <div class="item-image">
                        <img src="${product.images[0]}" alt="${product.alt}">
                    </div>
                    <div class="item-info">
                        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                        <div class="item-price">${formatPrice(product.price)}</div>
                        <span class="item-condition">${product.condition.replace('-', ' ')}</span>
                        <div class="item-specs">
                            ${product.specs.slice(0, 2).join(' • ')}
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-primary btn-sm move-to-cart-btn" 
                                data-product-id="${product.id}"
                                ${product.availability === 'sold' ? 'disabled' : ''}>
                            ${product.availability === 'sold' ? 'Sold Out' : 'Move to Cart'}
                        </button>
                        <button class="btn btn-outline btn-sm remove-wishlist-btn" 
                                data-product-id="${product.id}">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Add event listeners
    container.querySelectorAll('.move-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            addToCart(productId);
            removeFromWishlist(productId);
            renderWishlistPage();
        });
    });
    
    container.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            removeFromWishlist(productId);
            renderWishlistPage();
        });
    });
}

// ===== ENHANCED CART MANAGEMENT =====
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product || product.availability === 'sold') return false;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    
    localStorage.setItem('clycle_cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification('Added to cart!');
    return true;
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('clycle_cart', JSON.stringify(cart));
        updateCartBadge();
        showNotification('Removed from cart');
        return true;
    }
    return false;
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('clycle_cart', JSON.stringify(cart));
            updateCartBadge();
        }
        return true;
    }
    return false;
}

function handleCartToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const productId = button.dataset.productId;
    const isInCart = cart.some(item => item.id === productId);
    
    if (isInCart) {
        removeFromCart(productId);
        button.innerHTML = '🛒 Add';
        button.classList.remove('active');
        button.setAttribute('aria-label', 'Add to cart');
    } else {
        addToCart(productId);
        button.innerHTML = '✓ Added';
        button.classList.add('active');
        button.setAttribute('aria-label', 'Remove from cart');
    }
    
    // Add animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function updateCartBadge() {
    const badges = document.querySelectorAll('#cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    });
}

function calculateCartTotal() {
    return cart.reduce((total, item) => {
        const product = getProductById(item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function renderCartPage() {
    const container = document.getElementById('cart-content');
    const emptyState = document.getElementById('empty-cart');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'block';
    
    const cartProducts = cart.map(item => ({
        ...getProductById(item.id),
        quantity: item.quantity
    })).filter(item => item.id);
    
    const subtotal = calculateCartTotal();
    const total = subtotal;
    
    container.innerHTML = `
        <div class="cart-grid">
            ${cartProducts.map(product => `
                <div class="cart-item" data-product-id="${product.id}">
                    <div class="item-image">
                        <img src="${product.images[0]}" alt="${product.alt}">
                    </div>
                    <div class="item-info">
                        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                        <div class="item-price">${formatPrice(product.price)}</div>
                        <span class="item-condition">${product.condition.replace('-', ' ')}</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease" data-product-id="${product.id}">-</button>
                            <span class="quantity">${product.quantity}</span>
                            <button class="quantity-btn increase" data-product-id="${product.id}">+</button>
                        </div>
                        <div class="item-subtotal">${formatPrice(product.price * product.quantity)}</div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-outline btn-sm remove-cart-btn" 
                                data-product-id="${product.id}">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn btn-primary w-full checkout-btn">
                Proceed to Checkout
            </button>
            <a href="listings.html" class="btn btn-outline w-full">
                Continue Shopping
            </a>
        </div>
    `;
    
    // Add event listeners
    container.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const isIncrease = e.target.classList.contains('increase');
            const currentItem = cart.find(item => item.id === productId);
            
            if (currentItem) {
                const newQuantity = isIncrease ? currentItem.quantity + 1 : currentItem.quantity - 1;
                updateCartQuantity(productId, newQuantity);
                renderCartPage();
            }
        });
    });
    
    container.querySelectorAll('.remove-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            removeFromCart(productId);
            renderCartPage();
        });
    });
    
    const checkoutBtn = container.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showNotification('Checkout functionality coming soon!', 'info');
        });
    }
}

// ===== ENHANCED MODAL INTERACTIONS =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstFocusable = modal.querySelector('button, input, textarea, select, a[href]');
        if (firstFocusable) firstFocusable.focus();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function setupModalHandlers() {
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal with close button
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) closeModal(activeModal.id);
        }
    });
}

// ===== ENHANCED PRODUCT DETAIL PAGE =====
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'listings.html';
        return;
    }
    
    const product = getProductById(productId);
    if (!product) {
        window.location.href = 'listings.html';
        return;
    }
    
    renderProductDetail(product);
}

function renderProductDetail(product) {
    const container = document.getElementById('product-details');
    if (!container) return;
    
    const isInWishlist = wishlist.includes(product.id);
    const isInCart = cart.some(item => item.id === product.id);
    
    container.innerHTML = `
        <div class="container">
            <div class="product-layout">
                <div class="product-gallery">
                    <div class="main-image">
                        <img src="${product.images[0]}" alt="${product.alt}" id="main-product-image">
                    </div>
                    ${product.images.length > 1 ? `
                        <div class="thumbnail-grid">
                            ${product.images.map((image, index) => `
                                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                                    <img src="${image}" alt="${product.alt}">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="product-details-info">
                    <h1 class="product-title">${product.name}</h1>
                    <div class="product-price-large">${formatPrice(product.price)}</div>
                    
                    <div class="product-badges">
                        <span class="badge-condition">${product.condition.replace('-', ' ')}</span>
                        <span class="badge-availability ${product.availability}">${product.availability}</span>
                        ${product.size ? `<span class="badge-size">Size: ${product.size}</span>` : ''}
                    </div>
                    
                    <div class="product-specs-list">
                        <h4>Specifications</h4>
                        <ul>
                            ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-actions-buttons">
                        <button class="btn btn-secondary wishlist-btn ${isInWishlist ? 'active' : ''}" 
                                data-product-id="${product.id}">
                            ${isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                        </button>
                        <button class="btn btn-primary cart-btn ${isInCart ? 'active' : ''}" 
                                data-product-id="${product.id}"
                                ${product.availability === 'sold' ? 'disabled' : ''}>
                            ${product.availability === 'sold' ? 'Sold Out' : isInCart ? '✓ In Cart' : '🛒 Add to Cart'}
                        </button>
                        <button class="btn btn-outline message-seller-btn" 
                                data-product-id="${product.id}"
                                ${product.availability === 'sold' ? 'disabled' : ''}>
                            💬 Message Seller
                        </button>
                    </div>
                    
                    <div class="product-tabs">
                        <button class="tab-btn active" data-tab="description">Description</button>
                        <button class="tab-btn" data-tab="history">Item History</button>
                        <button class="tab-btn" data-tab="seller">Seller Info</button>
                    </div>
                    
                    <div class="product-tab-content">
                        <div class="tab-panel active" id="description-panel">
                            <p>${product.description}</p>
                            <div class="disclaimer">
                                <p><small>Please inspect the item carefully before purchase. All sales are final. Meet in safe, public locations on campus.</small></p>
                            </div>
                        </div>
                        <div class="tab-panel" id="history-panel">
                            <p><strong>Posted:</strong> ${new Date(product.postedDate).toLocaleDateString()}</p>
                            <p><strong>Condition:</strong> ${product.condition.replace('-', ' ')}</p>
                            <p><strong>Category:</strong> ${product.category.replace('-', ' ')}</p>
                        </div>
                        <div class="tab-panel" id="seller-panel">
                            <p><strong>Seller:</strong> ${product.seller}</p>
                            <p><strong>Rating:</strong> ⭐⭐⭐⭐⭐ (4.8/5)</p>
                            <p><strong>Response Time:</strong> Usually within 2-3 hours</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupProductDetailHandlers();
}

function setupProductDetailHandlers() {
    // Image gallery
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const imageUrl = e.currentTarget.dataset.image;
            const mainImage = document.getElementById('main-product-image');
            
            if (mainImage) {
                mainImage.src = imageUrl;
            }
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
    
    // Product tabs
    document.querySelectorAll('.product-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = e.target.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.product-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update active panel
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`${tabId}-panel`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
    
    // Action buttons
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', handleWishlistToggle);
    }
    
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', handleCartToggle);
    }
    
    const messageBtn = document.querySelector('.message-seller-btn');
    if (messageBtn) {
        messageBtn.addEventListener('click', () => {
            openModal('message-modal');
        });
    }
}

// ===== ENHANCED SEARCH AND FILTER FUNCTIONALITY =====
function setupSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const conditionFilter = document.getElementById('condition-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const sortSelect = document.getElementById('sort-select');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    const debouncedSearch = debounce(() => {
        applyFiltersAndSearch();
    }, 300);
    
    if (searchInput) {
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    [categoryFilter, conditionFilter, availabilityFilter, sortSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', applyFiltersAndSearch);
        }
    });
    
    [minPriceInput, maxPriceInput].forEach(element => {
        if (element) {
            element.addEventListener('input', debounce(applyFiltersAndSearch, 500));
        }
    });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
}

function applyFiltersAndSearch() {
    const searchQuery = document.getElementById('search-input')?.value || '';
    const filters = {
        category: document.getElementById('category-filter')?.value || '',
        condition: document.getElementById('condition-filter')?.value || '',
        availability: document.getElementById('availability-filter')?.value || '',
        minPrice: document.getElementById('min-price')?.value || '',
        maxPrice: document.getElementById('max-price')?.value || ''
    };
    const sortBy = document.getElementById('sort-select')?.value || 'newest';
    
    // Apply filters
    filteredProducts = filterProducts(filters);
    
    // Apply search
    if (searchQuery.trim()) {
        filteredProducts = searchProducts(searchQuery);
    }
    
    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, sortBy);
    
    // Reset pagination
    currentPage = 1;
    
    // Render results
    renderProductGrid(filteredProducts.slice(0, itemsPerPage), 'products-grid');
    updateResultsCount();
    updateLoadMoreButton();
}

function clearAllFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('condition-filter').value = '';
    document.getElementById('availability-filter').value = '';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('sort-select').value = 'newest';
    
    applyFiltersAndSearch();
}

function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        const count = filteredProducts.length;
        countElement.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
    }
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        const hasMore = currentPage * itemsPerPage < filteredProducts.length;
        loadMoreBtn.style.display = hasMore ? 'block' : 'none';
    }
}

function loadMoreProducts() {
    currentPage++;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const newProducts = filteredProducts.slice(startIndex, endIndex);
    
    const container = document.getElementById('products-grid');
    if (container && newProducts.length > 0) {
        const newProductsHTML = newProducts.map((product, index) => 
            renderProductCard(product, startIndex + index)
        ).join('');
        
        container.insertAdjacentHTML('beforeend', newProductsHTML);
        
        // Add event listeners for new products
        const newCards = container.querySelectorAll('.product-card:nth-last-child(-n+' + newProducts.length + ')');
        newCards.forEach(card => {
            const wishlistBtn = card.querySelector('.wishlist-btn');
            const cartBtn = card.querySelector('.cart-btn');
            
            if (wishlistBtn) wishlistBtn.addEventListener('click', handleWishlistToggle);
            if (cartBtn) cartBtn.addEventListener('click', handleCartToggle);
        });
    }
    
    updateLoadMoreButton();
}

// ===== ENHANCED FORM HANDLING =====
function setupPostItemForm() {
    const form = document.getElementById('post-item-form');
    if (!form) return;
    
    const categoryInputs = form.querySelectorAll('input[name="category"]');
    const sizeGroup = document.getElementById('size-group');
    const photoInput = document.getElementById('photo-input');
    const uploadArea = document.getElementById('upload-area');
    const previewContainer = document.getElementById('photo-previews');
    const freeItemCheckbox = document.getElementById('free-item');
    const priceInput = document.getElementById('item-price');
    const previewBtn = document.getElementById('preview-btn');
    
    // Category change handler
    categoryInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'clothing' && sizeGroup) {
                sizeGroup.style.display = 'block';
            } else if (sizeGroup) {
                sizeGroup.style.display = 'none';
            }
        });
    });
    
    // Free item toggle
    if (freeItemCheckbox && priceInput) {
        freeItemCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                priceInput.value = '0';
                priceInput.disabled = true;
            } else {
                priceInput.disabled = false;
                priceInput.value = '';
            }
        });
    }
    
    // File upload handling
    if (uploadArea && photoInput) {
        uploadArea.addEventListener('click', () => photoInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            handleFileUpload(files);
        });
        
        photoInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            handleFileUpload(files);
        });
    }
    
    // Preview button
    if (previewBtn) {
        previewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showListingPreview();
        });
    }
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
}

function handleFileUpload(files) {
    const previewContainer = document.getElementById('photo-previews');
    if (!previewContainer) return;
    
    const maxFiles = 5;
    const currentPreviews = previewContainer.querySelectorAll('.photo-preview').length;
    const filesToProcess = files.slice(0, maxFiles - currentPreviews);
    
    filesToProcess.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'photo-preview';
                previewDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="photo-remove" aria-label="Remove photo">&times;</button>
                `;
                
                previewContainer.appendChild(previewDiv);
                
                // Add remove functionality
                const removeBtn = previewDiv.querySelector('.photo-remove');
                removeBtn.addEventListener('click', () => {
                    previewDiv.remove();
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

function showListingPreview() {
    const form = document.getElementById('post-item-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const previewData = {
        title: formData.get('title'),
        category: formData.get('category'),
        condition: formData.get('condition'),
        description: formData.get('description'),
        size: formData.get('size'),
        price: formData.get('freeItem') ? 0 : formData.get('price'),
        delivery: formData.getAll('delivery')
    };
    
    const previewContainer = document.getElementById('listing-preview');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = `
        <div class="preview-card">
            <div class="preview-images">
                <div class="preview-main-image">
                    <img src="https://via.placeholder.com/400x300?text=${encodeURIComponent(previewData.title || 'Your Item')}" 
                         alt="Preview image">
                </div>
            </div>
            <div class="preview-info">
                <h3>${previewData.title || 'Item Title'}</h3>
                <div class="preview-price">${previewData.price == 0 ? 'Free' : formatPrice(previewData.price || 0)}</div>
                <div class="preview-badges">
                    ${previewData.condition ? `<span class="badge">${previewData.condition.replace('-', ' ')}</span>` : ''}
                    ${previewData.size ? `<span class="badge">Size: ${previewData.size}</span>` : ''}
                </div>
                <div class="preview-description">
                    <p>${previewData.description || 'No description provided'}</p>
                </div>
                <div class="preview-delivery">
                    <strong>Delivery Options:</strong>
                    ${previewData.delivery.length > 0 ? previewData.delivery.join(', ') : 'None selected'}
                </div>
            </div>
        </div>
    `;
    
    openModal('preview-modal');
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    
    const form = e.target;
    const title = form.title.value.trim();
    const category = form.category.value;
    const condition = form.condition.value;
    const description = form.description.value.trim();
    
    if (!title || !category || !condition || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    
    showNotification('Your item has been posted successfully!', 'success');
    
    
    setTimeout(() => {
        form.reset();
        document.getElementById('photo-previews').innerHTML = '';
        window.location.href = 'listings.html';
    }, 2000);
}

// ===== ENHANCED AUTHENTICATION =====
function setupAuthForms() {
    const authTabs = document.querySelectorAll('.auth-tabs .tab-btn');
    const authPanels = document.querySelectorAll('.tab-panel');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetTab = e.target.dataset.tab;
            
           
            authTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            
            authPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`${targetTab}-panel`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
    
   
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function handleSignin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    
    const isValidGmail = (email) => /^[^\s@]+@gmail\.com$/i.test(email);

   
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidGmail(email)) {
        showNotification('Email must be a valid Gmail address (example@gmail.com)', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

  
    showNotification('Signed in successfully!', 'success');
    currentUser = { email, name: 'Student User' };

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

   
    const isValidGmail = (email) => /^[^\s@]+@gmail\.com$/i.test(email);

    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidGmail(email)) {
        showNotification('Email must be a valid Gmail address (example@gmail.com)', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    
    showNotification('Account created successfully!', 'success');
    currentUser = { email, name };

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}


// ===== ENHANCED NAVIGATION =====
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger && mobileNavOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
        });
        
        // Close mobile menu when clicking overlay
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                hamburger.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
            }
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// ===== ENHANCED TAB FUNCTIONALITY =====
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabContainer = e.target.closest('.featured-tabs, .auth-tabs, .profile-tabs');
            if (!tabContainer) return;
            
            const targetTab = e.target.dataset.tab;
            const tabButtons = tabContainer.querySelectorAll('.tab-btn');
            const tabPanels = document.querySelectorAll('.tab-panel');
            
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update active panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`${targetTab}-panel`) || 
                              document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

// ===== ENHANCED CHAT FUNCTIONALITY =====
function setupChatModal() {
    const messageModal = document.getElementById('message-modal');
    if (!messageModal) return;
    
    const questionButtons = messageModal.querySelectorAll('.question-btn');
    const messageInput = messageModal.querySelector('#message-input');
    const sendBtn = messageModal.querySelector('#send-btn');
    const chatMessages = messageModal.querySelector('#chat-messages');
    
    // Quick question buttons
    questionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.target.textContent;
            if (messageInput) {
                messageInput.value = question;
                messageInput.focus();
            }
        });
    });
    
    // Send message
    if (sendBtn && messageInput) {
        const sendMessage = () => {
            const message = messageInput.value.trim();
            if (!message) return;
            
            // Add buyer message
            addChatMessage(message, 'buyer');
            messageInput.value = '';
            
            // Simulate seller response
            setTimeout(() => {
                const responses = [
                    "Hi! Yes, this item is still available. Would you like to meet on campus?",
                    "Thanks for your interest! The item is in great condition. When would you like to see it?",
                    "Hello! I can meet you at the library tomorrow afternoon if that works for you.",
                    "Hi there! The price is firm, but I'm happy to answer any questions about the item."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addChatMessage(randomResponse, 'seller');
            }, 1000 + Math.random() * 2000);
        };
        
        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== ENHANCED PROFILE FUNCTIONALITY =====
function setupProfilePage() {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const editProfileForm = document.getElementById('edit-profile-form');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            openModal('edit-profile-modal');
        });
    }
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            openModal('delete-account-modal');
        });
    }
    
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Profile updated successfully!', 'success');
            closeModal('edit-profile-modal');
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            showNotification('Account deletion is not available in demo mode', 'info');
            closeModal('delete-account-modal');
        });
    }
    
    // Load user listings
    loadUserListings();
}

function loadUserListings() {
    const container = document.getElementById('user-listings');
    if (!container) return;
    
    // Simulate user's listings (first 4 products)
    const userProducts = allProducts.slice(0, 4);
    renderProductGrid(userProducts, 'user-listings');
}

// ===== ENHANCED STATISTICS ANIMATION =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent.replace(/,/g, ''));
                animateValue(element, 0, finalValue, 2000);
                observer.unobserve(element);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ===== ENHANCED VIEW TOGGLE =====
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const viewType = e.target.dataset.view;
            
            // Update active button
            viewButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update grid view
            if (productsGrid) {
                productsGrid.className = `products-grid ${viewType}-view`;
            }
        });
    });
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load products data
    loadProducts();
    
    // Update badges
    updateWishlistBadge();
    updateCartBadge();
    
    // Setup global functionality
    setupNavigation();
    setupModalHandlers();
    setupTabs();
    setupChatModal();
    
    // Page-specific initialization
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            renderFeaturedListings();
            animateStats();
            break;
            
        case 'listings.html':
            filteredProducts = [...allProducts];
            renderProductGrid(filteredProducts.slice(0, itemsPerPage), 'products-grid');
            setupSearchAndFilters();
            setupViewToggle();
            updateResultsCount();
            updateLoadMoreButton();
            
            // Load more button
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', loadMoreProducts);
            }
            break;
            
        case 'product.html':
            loadProductDetail();
            break;
            
        case 'wishlist.html':
            renderWishlistPage();
            break;
            
        case 'cart.html':
            renderCartPage();
            break;
            
        case 'repair-reuse.html':
            setupPostItemForm();
            break;
            
        case 'auth.html':
            setupAuthForms();
            break;
            
        case 'profile.html':
            setupProfilePage();
            break;
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
        });
    });
    
    console.log('🎉 Clycle platform initialized successfully!');
});

// ===== ENHANCED ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('Something went wrong. Please try again.', 'error');
});

// ===== ENHANCED PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here in a production app
        console.log('Service Worker support detected');
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPrice,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        searchProducts,
        filterProducts,
        sortProducts
    };
}
