
export default {
  priorities: {
    //permission: 'itask.priorities.manage',
    permission: null,
    activated: true,
    authenticated: true,
    path: '/task/priorities/index',
    name: 'qtask.admin.prioritiesy',
    crud : import('modules/qtask/_crud/priorities'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'priorities',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
  categories: {
    //permission: 'itask.categories.manage',
    permission: null,
    activated: true,
    authenticated: true,
    path: '/task/categories/index',
    name: 'qtask.admin.categories',
    crud : import('modules/qtask/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'categories',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
  statuses: {
    permission: 'itask.statuses.manage',
    activated: true,
    authenticated: true,
    path: '/task/statuses/index',
    name: 'qtask.admin.statuses',
    crud : import('modules/qtask/_crud/statuses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'statuses',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
  tasks: {
    //permission: 'itask.tasks.manage',
    permission: null,
    activated: true,
    authenticated: true,
    path: '/task/tasks/index',
    name: 'qtask.admin.tasks',
    crud : import('modules/qtask/_crud/tasks'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'tasks',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
}
