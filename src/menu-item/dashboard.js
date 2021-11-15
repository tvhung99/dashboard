export const nested = [
    {
        id:'product',
        name:'Sản phẩm',
        subitems: [
           {
                id:'create-product',
                name:'Thêm sản phẩm',
                link:'/san-pham/them-moi'
           },
           {
                id:'update-product',
                name:'Thống kê sản phẩm',
                link:'/san-pham/'
            }
        ]
    },
    {
        id:'article',
        name:'Bài viết',
        subitems: [
           {
                id:'create-article',
                name:'Thêm bài viết',
                link:'/bai-viet/them-moi'
           },
           {
                id:'update-article',
                name:'Thống kê bài viết',
                link:'/bai-viet/'
            }
        ]
    },
    {
        id:'hardware',
        icon:'dashboard',
        name:'Phần cứng',
        subitems:[
            {
                id:'cpu',
                icon:'dashboard',
                name:'CPU',
                link:'/phan-cung/cpu'
            },
            {
                id:'hard-disk',
                icon:'dashboard',
                name:'Ổ cứng',
                link:'/phan-cung/o-cung'
            },
            {
                id:'brand',
                icon:'dashboard',
                name:'Thương hiệu',
                link:'/phan-cung/thuong-hieu'
            },
            {
                id:'ram',
                icon:'dashboard',
                name:'RAM',
                link:'/phan-cung/ram'
            },
            {
                id:'monitor',
                icon:'dashboard',
                name:'Màn hình',
                link:'/phan-cung/man-hinh'
            },
            {
                id:'card',
                icon:'dashboard',
                name:'Card đồ hoạ',
                link:'/phan-cung/card-do-hoa'
            },
            {
                id:'type',
                icon:'dashboard',
                name:'Dòng máy',
                link:'/phan-cung/dong-may'
            }
        ]
    },
]

export const single = [
    {
        id:'dashboard',
        icon:'dashboard',
        name:'Dashboard',
        link:'/dashboard'
    },
    {
        id:'product',
        icon:'product',
        name:'Sản phẩm',
        link:'/san-pham'
    },
    {
        id:'news',
        icon:'news',
        name:'Bài viết',
        link:'/bai-viet'
    },
    {
        id:'order',
        icon:'order',
        name:'Đơn hàng',
        link:'/don-hang'
    }

]
