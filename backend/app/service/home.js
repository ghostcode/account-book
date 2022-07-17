const Service = require('egg').Service

class HomeService extends Service{
  async user() {
    const { ctx,app } = this
    const QUERY_STR = 'id,name'

    let sql =  `select ${QUERY_STR} from list`

    try {
      const result = await app.mysql.query(sql);
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

module.exports = HomeService