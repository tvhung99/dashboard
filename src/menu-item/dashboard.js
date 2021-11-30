export const nested = [
    {
        id:'dasboard',
        name:'Dashboard',
        subitems: [
           {
                id:'dashboard-main',
                name:'Thống kê',
                link:'/'
           },
        ]
    },
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
                name:'Viết bài mới',
                link:'/bai-viet/them-moi'
           },
           {
                id:'update-article',
                name:'Tất cả bài viết',
                link:'/bai-viet/'
            }
        ]
    },
    // {
    //     id:'hardware',
    //     icon:'dashboard',
    //     name:'Phần cứng',
    //     subitems:[
    //         {
    //             id:'cpu',
    //             icon:'dashboard',
    //             name:'CPU',
    //             link:'/phan-cung/cpu'
    //         },
    //         {
    //             id:'hard-disk',
    //             icon:'dashboard',
    //             name:'Ổ cứng',
    //             link:'/phan-cung/o-cung'
    //         },
    //         {
    //             id:'brand',
    //             icon:'dashboard',
    //             name:'Thương hiệu',
    //             link:'/phan-cung/thuong-hieu'
    //         },
    //         {
    //             id:'ram',
    //             icon:'dashboard',
    //             name:'RAM',
    //             link:'/phan-cung/ram'
    //         },
    //         {
    //             id:'monitor',
    //             icon:'dashboard',
    //             name:'Màn hình',
    //             link:'/phan-cung/man-hinh'
    //         },
    //         {
    //             id:'card',
    //             icon:'dashboard',
    //             name:'Card đồ hoạ',
    //             link:'/phan-cung/card-do-hoa'
    //         },
    //         {
    //             id:'type',
    //             icon:'dashboard',
    //             name:'Dòng máy',
    //             link:'/phan-cung/dong-may'
    //         }
    //     ]
    // },
]
