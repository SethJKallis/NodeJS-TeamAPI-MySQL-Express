const express = require('express');
const router = express.Router();
const con = require('../lib/db_connection');

router.get('/', (req,res)=>{
    try{
        con.query("SELECT * FROM categories", (err,result)=>{
            if(err) throw err;
            res.send(result);
        });
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.get('/:id', (req,res)=>{
    try{
        con.query(`SELECT * FROM categories WHERE category_id=${req.params.id}`, (err,result)=>{
            if(err) throw err;
            res.send(result);
        });
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.post('/', (req,res)=>{
    try{
        con.query(`INSERT INTO categories(category_name)VALUES("${req.body.category_name}")`, (err,res)=>{
            if(err) throw err;
            console.log("Created Product: ", {id:res.insertId, ...req.body});
        });
        res.status(200).send({
            message:"Category has been added successfully"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.put('/:id', (req,res)=>{
    try{
        con.query("UPDATE categories SET category_name=? WHERE category_id=?", [req.body.category_name, req.params.id], (err,res)=>{
            if(err) throw err;
            console.log("Updated category: ", {id:req.params.id, ...req.body})
        })
        res.status(200).send({
            message:"Category has been updated successfully"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete('/:id', (req,res)=>{
    try{
        con.query("DELETE FROM categories WHERE category_id=?", req.params.id, (err,res)=>{
            if(err) throw err;
            if(res.affectedRows == 0){
                console.log("Category has not been found");
                return;
            }
            console.log("Deleted category with id: ", req.params.id);
        })
        res.status(200).send({
            message:"Category has been deleted successfully"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

module.exports = router