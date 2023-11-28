//常量路由

export const constantRoute = [
  {
    //登录路由
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login", //命名路由
    meta:{
      title:'登录',
      hidden:true, //判断菜单是否隐藏，true隐藏，false不隐藏
      icon:'UserFilled'
    },
  },
  {
    //主页路由
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta:{
      title:'',
      hidden:false,
      icon:''
    },
    redirect:'/home',
    children:[
      {
        //登录路由
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "Home", //命名路由
        meta:{
          title:'首页',
          hidden:false,
          icon:'Share'
        },
      },
    ]
  },
  {
    //数字大屏路由
    path:"/screen",
    name:'Screen',
    component:() => import("@/views/screen/index.vue"),
    meta:{
      title:'数字大屏',
      hidden:false,
      icon:'DataAnalysis'
    }
  },
  {
    //404路由
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta:{
      title:'404',
      hidden:true,
      icon:'DocumentDelete'
    },
  },
  {
    //权限管理路由
    path:"/acl",
    component: () => import('@/layout/index.vue'),
    name:'Acl',
    meta:{
      title:'权限管理',
      hidden:false,
      icon:'Lock'
    },
    children:[
      {
        //user权限
        path:"/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name:'User',
        meta:{
          title:'用户管理',
          hidden:false,
          icon:'User'
        }
      },
      {
        //role权限
        path:"/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name:'Role',
        meta:{
          title:'角色管理',
          hidden:false,
          icon:'UserFilled'
        }
      },
      {
        //permission权限
        path:"/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name:'Permission',
        meta:{
          title:'菜单管理',
          hidden:false,
          icon:'CirclePlus'
        }
      }
    ]
  },
  {
    //商品管理
    path:"/product",
    component: () => import('@/layout/index.vue'),
    name:"Product",
    meta:{
      title:'商品管理',
      hidden:false,
      icon:'ShoppingCart'
    },
    children:[
      {
        path:'/product/attr',
        component: () => import("@/views/product/attr/index.vue"),
        name:'Attr',
        meta:{
          title:'商品管理',
          icon:'Goods'
        }
      },
      {
        path:'/product/trademark',
        component: () => import("@/views/product/trademark/index.vue"),
        name:'Trademark',
        meta:{
          title:'品牌管理',
          icon:'ShoppingCartFull'
        }
      },
      {
        path:'/product/spu',
        component: () => import("@/views/product/spu/index.vue"),
        name:'Spu',
        meta:{
          title:'SPU管理',
          icon:'ShoppingCartFull'
        }
      },
      {
        path:'/product/sku',
        component: () => import("@/views/product/sku/index.vue"),
        name:'Sku',
        meta:{
          title:'SKU管理',
          icon:'ShoppingCartFull'
        }
      },
    ]
  },
  {
    //任意路由
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta:{
      title:'any',
      hidden:true,
      icon:'Share'
    },
  },
];
