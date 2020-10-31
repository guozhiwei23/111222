$(function () {
    // 去注册
    $('#link_reg').on('click', function () {
        //隐藏登录框
        $('.login-box').hide()
        //显示注册框
        $('.reg-box').show()
    })
    //去登陆
    $('#link_login').on('click', function () {
        //隐藏注册框
        $('.reg-box').hide()
        //显示登录框
        $('.login-box').show()
    })
    //自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录!')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })
    //登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                //存储
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = "/index.html"
            }
        })
    })
})