const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") },
      {
        path: "/images",
        name: "images",
        component: () => import("pages/Images.vue")
      },
      {
        path: "/image/:id",
        name: "img-detail",
        component: () => import("pages/Image.vue"),
        props: true
      },
      {
        path: "/about",
        name: "about",
        component: () => import("pages/About.vue")
      },
      { path: "/help", name: "help", component: () => import("pages/Help.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
