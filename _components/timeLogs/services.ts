import baseService from 'modules/qcrud/_services/baseService'

export default {

  createItem(configName, data, params = {params: {}}): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.create(configName, data, params).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },

  deleteItem(configName, criteria): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.delete(configName, criteria, {}).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  }, 

  
}
