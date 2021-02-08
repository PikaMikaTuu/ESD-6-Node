const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/esd-6";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log("Connected to \"esd-6\" database.") )
    .catch( (error) => console.log(error) );


// ========== DEFINE SCHEMA ==========
const qnaSchema = new mongoose.Schema({
    "question": String,
    "answer": String,
    "a1": String,
    "a2": String,
    "a3": String,
});


// ========== CREATE COLLECTION ==========
// console.log(QNA)
const QNA = new mongoose.model("qna", qnaSchema);


// ========== READ ==========
const getData = async => QNA.find({}, { __v: 0 });


// ========== INSERT ==========
// insertOneQna("Whats 5-2", "3", "1", "9", "2");
const insertOneQna = async (question, answer, a1, a2, a3) => {
    try {
        const row = new QNA({
            "question": question,
            "answer": answer,
            "a1": a1,
            "a2": a2,
            "a3": a3,
        });
        return await row.save();
    }
    catch(e) {
        console.log(e);
    }
}


// ========== UPDATE ==========
// updateQna("60210f172b53a64f73e7bb50", "Whats 1+2", 3, 2, 6, 7);
const updateQna = async (_id, question, answer, a1, a2, a3) => {
    return await QNA.updateOne(
            { _id },
            { $set: {
                "question": question,
                "answer": answer,
                "a1": a1,
                "a2": a2,
                "a3": a3,
                }
            }
        );
}

// ========== DELETE ==========
// deleteQna("60210f172b53a64f73e7bb50");
const deleteQna = async (_id) => {
    return await QNA.deleteOne({ _id });
}

module.exports = {
    getData: getData,
    insertOneQna: insertOneQna,
    updateQna: updateQna,
    deleteQna: deleteQna,
}
