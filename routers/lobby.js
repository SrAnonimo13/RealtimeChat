const express = require('express');
const Lobby = require('../db/models/Lobby');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        if(req?.cookies?.chatLogin){
            const { name, chat } = await Lobby.findById(req.query.id);
            res.render('lobby', { name, chat });
        }else{
            res.redirect('/auth/login');
        }
    } catch(err) {
        res.redirect('/');
    }
})

router.get('/add', (req, res) => {
    res.render('create_lobby');
})

router.get('/create', async (req, res) => {
    try{
        let lobby = await Lobby.create(req.query);

        res.redirect(`/lobby?id=${lobby.id}`);
    } catch(err) {
        res.status(400).send({ err });
    }
})

module.exports = router;