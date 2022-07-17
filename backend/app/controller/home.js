'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { id } = ctx.query

    ctx.body = 'hi, egg 11' + (id || '');
  }

  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user()

    ctx.body = result
  }

  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body

    console.log('>>>>>>>>>>')

    ctx.body = {
      title
    };
  }
}

module.exports = HomeController;
