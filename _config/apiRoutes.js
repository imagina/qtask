const moduleName = 'itask';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase: urlBase,
  version: moduleVersion, 
  priorities: `${urlBase}/priorities`,
  categories: `${urlBase}/categories`,
  statuses: `${urlBase}/statuses`,
  tasks: `${urlBase}/tasks`, 
  timelogs: `${urlBase}/timelogs`,
}
