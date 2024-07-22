
export default {
  priority: {
    permission: 'itask.priority.manage',
    activated: true,
    authenticated: true,
    path: '/task/priority/index',
    name: 'qtask.admin.priority',
    crud : import('modules/qtask/_crud/priority'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'priority',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
  categories: {
    permission: 'itask.category.manage',
    activated: true,
    authenticated: true,
    path: '/task/category/index',
    name: 'qtask.admin.category',
    crud : import('modules/qtask/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'category',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
  status: {
    permission: 'itask.status.manage',
    activated: true,
    authenticated: true,
    path: '/task/status/index',
    name: 'qtask.admin.status',
    crud : import('modules/qtask/_crud/status'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'status',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
  task: {
    //permission: 'itask.task.manage',
    permission: null,
    activated: true,
    authenticated: true,
    path: '/task/tasks/index',
    name: 'qtask.admin.task',
    crud : import('modules/qtask/_crud/task'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'task',
    icon: 'fa-light fa-list-check',
    subHeader: {
        refresh: true,
    }
  },
}
