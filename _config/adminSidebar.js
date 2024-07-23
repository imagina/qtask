import pages from 'src/setup/pages'

//task
export default [
    {
      title: 'tasks',
      icon: 'fa-light fa-list-check',
      children: [
        pages.qtask.tasks, 
        pages.qtask.priorities, 
        pages.qtask.categories, 
        pages.qtask.statuses, 
      ]
    },
  ]
