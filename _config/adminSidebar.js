import pages from 'src/setup/pages'

//task
export default [
    {
      title: 'tasks',
      icon: 'fa-light fa-list-check',
      children: [
        pages.qtask.task, 
        pages.qtask.priority, 
        pages.qtask.categories, 
        pages.qtask.status, 
      ]
    },
  ]
