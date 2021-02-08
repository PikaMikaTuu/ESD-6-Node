const express = require('express');
const dbs = require('./database.js');
const app = express();
const PORT = 8080;

// enable JSON parser and urlENCODER for 1POST reqs.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default template for SUCCESS/ERROR messages.
var response_template = {
    "success": false,
    "message": "",
}

app.get("/getquestions", async(req, res) => {
    let results = dbs.getData();
    results.then(results => {
        res.json(results);
    });
});

app.post("/insertquestion", async(req, res) => {
    let question = req.body.question;
    let answer = req.body.answer;
    let a1 = req.body.a1;
    let a2 = req.body.a2;
    let a3 = req.body.a3;

    // validation code here

    let result = dbs.insertOneQna(question, answer, a1, a2, a3);
    result.then(result => {
        response_template.success = true;
        response_template.message = "Inserted successfully."
        res.send(response_template);
        res.end();
     });
});

app.post("/deletequestion", async(req, res) => {
    let id = req.body.id;
    let result = dbs.deleteQna(id);

    // validation code here

    result.then(result => {
        if (result.deletedCount == 1) {
            response_template.success = true;
            response_template.message = "Deleted successfully.";
            res.send(response_template);
        }
        else {
            response_template.success = false;
            response_template.message = "Error in delete.";
            res.send(response_template);
        }
        res.end();
    });
});

app.post("/updatequestion", async(req, res) => {
    let id = req.body.id;
    let question = req.body.question;
    let answer = req.body.answer;
    let a1 = req.body.a1;
    let a2 = req.body.a2;
    let a3 = req.body.a3;

    // validation code here

    let result = dbs.updateQna(id, question, answer, a1, a2, a3);
    result.then(result => {
        if (result.nModified == 1) {
            response_template.success = true;
            response_template.message = "Updated successfully.";
            res.send(response_template);
        }
        else {
            response_template.success = false;
            response_template.message = "Error in update.";
            res.send(response_template);
        }
        res.end();
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
