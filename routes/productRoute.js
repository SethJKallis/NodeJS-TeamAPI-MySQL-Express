const express = require('express');
const router = express.Router();
const con = require('../lib/db_connection');

router.get("/", (req,res)=>{
    try{
        con.query("SELECT * FROM products", (err,result) =>{
            if(err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.get('/:id', (req,res)=>{
    try{
        con.query(`SELECT * FROM products WHERE product_id=${req.params.id}`, (err,result)=>{
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
        con.query(`INSERT INTO products(product_name, product_category,product_quantity, price) VALUES('${req.body.product_name}', '${req.body.product_category}', '${req.body.product_quantity}', '${req.body.price}')`, (err,res)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Created Product: ", {id:res.insertId, ...req.body});
        });
        res.status(200).send({
            message: "Product has been added successfully"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.put('/:id', (req,res)=>{
    try{
        con.query("UPDATE products SET product_name=?, product_category=?, price=? WHERE product_id=?", [req.body.product_name, req.body.product_category, req.body.price, req.params.id], (err,res)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Updated product: ", {id:req.params.id, ...req.body})
        })
        res.status(200).send({
            message:"Product has been updated successfully"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete('/:id', (req,res)=>{
    try{
        con.query("DELETE FROM products WHERE product_id=?", req.params.id, (err,res)=>{
            if(err){
                console.log(err);
                return;
            }
            if(res.affectedRows == 0){
                console.log("Product has not been found");
                return;
            }
            console.log("Deleted product with id: ", req.params.id);
        })
        res.status(200).send({
            message:"Product Has Been deleted successfully"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router;