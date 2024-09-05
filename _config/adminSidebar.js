import pages from 'src/setup/pages'

//task
export default [
    {
      title: 'itask.cms.sidebar.adminGroup',
      icon: 'fa-light fa-list-check',
      children: [
        pages.qtask.tasksList,
        pages.qtask.categories,
        pages.qtask.priorities,
        pages.qtask.statuses
      ]
    },
  ]
