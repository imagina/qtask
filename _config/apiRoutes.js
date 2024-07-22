const moduleName = 'itask';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase: urlBase,
  version: moduleVersion, 
  priority: `${urlBase}/priority`,
  categories: `${urlBase}/categories`,
  status: `${urlBase}/status`,
  task: `${urlBase}/task`
}
