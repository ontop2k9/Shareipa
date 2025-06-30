
// Dữ liệu các ứng dụng
const appsData = [
    {
    "id": 1,
    "name": "Capcut Plus",
    "version": "v1.0",
    "size": "223 MB",
    "category": "apps",
    "description": "Mở khoa tất cả tính năng",
    "icon": "https://i.ibb.co/rRdWD1qn/1b79e4e2161a.jpg",
    "addedDate": new Date("2025-06-24"),
    "downloadLink": "https://file.ipaomtk.com/ipa/CapCut.ipa"
},
    {
    "id": 1,
    "name": "Promova Language",
    "version": "v1.0",
    "size": "116 MB",
    "category": "apps",
    "description": "Mở khoá Premium",
    "icon": "https://i.ibb.co/CsJPKfw9/6b74a357c473.jpg",
    "addedDate": new Date("2025-06-22"),
    "downloadLink": "https://drive.google.com/file/d/1Psjyo2EUx_8HiR-AFl5IEf7KYHmsX4iF/view?usp=share_link"
},
    {
    "id": 1,
    "name": "Minecraft",
    "version": "v1.21",
    "size": "991 MB",
    "category": "games",
    "description": "Game xây dựng và sáng tạo",
    "icon": "https://i.ibb.co/cKt4jY68/98713eae6a72.jpg",
    "addedDate": new Date("2025-06-22"),
    "downloadLink": "https://tinyurl.com/yc3br7v3"
},
    
    {
        id: 1,
        name: "Beauty Plus Selfie Film Camera",
        version: "v1.0",
        size: "497 MB",
        category: "apps",
        description: "Mở khoá tất cả",
        icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/98/30/fe/9830fe61-e324-9a53-2528-e879de945f4c/AppIcon-0-0-1x_U007emarketing-0-6-0-0-85-220.png/512x512bb.jpg",
        addedDate: new Date("2025-06-22"),
        downloadLink: "https://drive.google.com/file/d/1y6Q_Xg65236FlJ1CS-rl5jl_QQR-C-Fx/view?usp=share_link"
    },
    {
        id: 3,
        name: "Colorful Widget",
        version: "v1.0",
        size: "380 MB",
        category: "apps",
        description: "Mở khoá nhiều tính năng",
        icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/47/79/cc/4779cc74-9993-9b30-d7d1-7a61e74a7465/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-85-220.png/512x512bb.jpg",
        addedDate: new Date("2025-06-22"),
        downloadLink: "https://drive.google.com/file/d/1amy2cqTmJ84i-uiWzYFBd1Lp1t1ryZ0X/view?usp=share_link"
    },
    {
        id: 12,
        name: "SoundCloud",
        version: "1.0",
        size: "193 MB",
        category: "apps",
        description: "Truyền phát nhạc,Xóa quảng cáo,Xóa danh sách phát được quảng cáo,Loại bỏ các nút Upsell",
        icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/ea/fa/37eafabd-3bd8-0d17-3b37-9dce13924079/AppIcon-0-0-1x_U007epad-0-0-85-220.png/512x512bb.jpg",
        addedDate: new Date("2025-06-20"),
        downloadLink: "https://drive.google.com/file/d/1cEeWtAe4Qb4fc1RLv510x9SuaQwkXfb4/view?usp=share_link"
    },
    {
        id: 15,
        name: "Messenger",
        version: "1.0",
        size: "70 MB",
        category: "apps",
        description: "Xem tin nhắn ẩn danh,story ẩn danh,tải video story,…",
        icon: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/481110451_1048405227313977_5297689486950086789_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Znshp0jTrIwQ7kNvwFR041U&_nc_oc=Adn8BrqdTfd0t9PvWcVzefyhm5BfIQXv3sI9Eecdp912-DKzritQSFXLWqDtTLLrZIK3EqmpeK4behNA-1Xou94Q&_nc_zt=23&_nc_ht=scontent.fhan3-4.fna&_nc_gid=NxB9ma41hqgbHAm7py1SjA&oh=00_AfO0ZHFODo5pKdk-eyflrgv3BRnawkfuXX4OSyFqp7K-DA&oe=685ABA65",
        addedDate: new Date("2025-06-20"),
        downloadLink: "https://drive.google.com/file/d/1CYEuq3viNjCumgILEIkxoC53hWosWLDA/view"
    },
    {
        id: 16,
        name: "Instargram Siêu Phông Bạt",
        version: "1.0",
        size: "85,2 MB",
        category: "apps",
        description: "Phông bạt siêu ảo",
        icon: "//upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/250px-Instagram_logo_2022.svg.png",
        addedDate: new Date("2025-06-20"),
        downloadLink: "https://drive.google.com/file/d/1jVyRh4XTBKURJQ6ZlJD3EmVW7KjRlAD6/view?usp=drivesdk"
    },
    {
        id: 17,
        name: "Instagram++",
        version: "v1.0",
        size: "85.2 MB",
        category: "apps",
        description: "Instagram với nhiều tính năng nâng cao: tải ảnh/video, xem story ẩn danh, và nhiều tính năng khác.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
        addedDate: new Date("2025-06-17"),
        downloadLink: "https://drive.google.com/file/d/1fqirL2EkKOhnB0FovW0oP5v-yb8usLRw/view"
    },
    {
        id: 18,
        name: "YouTube Premium",
        version: "v20.24.4",
        size: "127.8 MB",
        category: "apps",
        description: "Xem YouTube không quảng cáo, phát nhạc nền và tải video chất lượng.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
        addedDate: new Date("2025-06-03"),
        downloadLink: "https://www.mediafire.com/file/l9xc7mnjwymogzd/YouTube+++_19.41.3_iOSVIET.ipa/file"
    },
    {
        id: 19,
        name: "Spotify++",
        version: "v9.0.50",
        size: "64.5 MB",
        category: "apps",
        description: "Spotify Premium miễn phí với khả năng bỏ qua quảng cáo và chất lượng cao.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
        addedDate: new Date("2025-06-08"),
        downloadLink: "https://t4v3.sg.idrivee2-44.com/ipakenhtao/sign/business/com.spotify.client___904000506.2329.ipa?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=psgqdEad5jxdYLe4jqUr%2F20250619%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250619T160035Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=35f86d1a303d6d4abe1e5d6b776740b42a48550f1538a076454ca5706bc1160c"
    },
    {
        id: 20,
        name: "TikTok++",
        version: "v40.0.1",
        size: "195.6 MB",
        category: "apps",
        description: "TikTok với tính năng tải video không watermark và nhiều hiệu ứng độc quyền.",
        icon: "https://chillproduction.vn/wp-content/uploads/2023/02/tiktok-app-icon-logo-0F5AD7AE01-seeklogo.com_-2-300x300.png",
        addedDate: new Date("2025-06-06"),
        downloadLink: "https://drive.google.com/file/d/1e0ZZ8_qTQIWCj8wRpNjitcJCSbepDU2l/view"
    },
    {
        id: 21,
        name: "Facebook++",
        version: "v1.0",
        size: "156.7 MB",
        category: "apps",
        description: "Facebook với tính năng tải video, ảnh,xem story ẩn danh,...",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png",
        addedDate: new Date("2025-06-16"),
        downloadLink: "https://drive.google.com/file/d/1fPJyOMrjQUWVPy14k6JD_iXGfVK_FF0-/view"
    }
];
