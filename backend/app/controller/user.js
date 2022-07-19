const Controller = require('egg').Controller

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: "账号密码不能为空",
        data: null,
      };
      return;
    }

    const userInfo = await ctx.service.user.getUserByName(username);

    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: "账户名已被注册，请重新输入",
        data: null,
      };
      return;
    }

    const result = await ctx.service.user.register({
      username,
      password,
      signature: "世界和平",
      avatar: "https://s3",
    });

    if (result) {
      ctx.body = {
        code: 200,
        msg: "注册成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: "注册失败",
        data: null,
      };
    }
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    const userInfo = await ctx.service.user.getUserByName(username);

    // 没找到说明没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: "账号不存在",
        data: null,
      };
      return;
    }

    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (userInfo && password != userInfo.password) {
      ctx.body = {
        code: 500,
        msg: "账号密码错误",
        data: null,
      };
      return;
    }

    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      },
      app.config.jwt.secret
    );

    ctx.body = {
      code: 200,
      message: "登录成功",
      data: {
        token,
      },
    };
  }

  async test() {
    const { ctx, app } = this;

    const token = ctx.request.header.authorization;

    const decode = await app.jwt.verify(token,app.config.jwt.secret);

    ctx.body = {
      code: 200,
      message: '获取成功',
      data: {
        ...decode
      }
    }
  }
}

module.exports = UserController