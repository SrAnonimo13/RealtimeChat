const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.get('/login', (req, res) => {
    res.render('auth/login', { status: 'ok' });
})

router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const username = name;

        if (!await User.findOne({ username })) return res.render('auth/login', { status: 'error', mensagem: 'Esse usuario não existe' });
        if (!await User.findOne({ password })) return res.render('auth/login', { status: 'error', mensagem: 'Essa senha não existe' });

        let user = await User.findOne({ username, password });
        res.cookie('chatLogin', user.id);
        res.redirect('/');
    } catch (err) {
        res.render('auth/login', { status: 'error', mensagem: 'Falha ao entrar na conta' });
    }
})

router.get('/newlogin', (req, res) => {
    res.render('auth/login_create', {status: 'ok'});
})

router.post('/newlogin', async (req, res) => {
    try {
        const { name, password } = req.body;
        const username = name;

        if (await User.findOne({ username })) return res.render('auth/login_create', { status: 'error', mensagem: 'Esse usuario já existe' });

        let user = await User.create({ username, password });
        res.cookie('chatLogin', user.id);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.render('auth/login_create', { status: 'error', mensagem: 'Falha ao criar a conta' });
    }
})

module.exports = router;