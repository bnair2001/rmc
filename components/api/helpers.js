const { faTruckMonster } = require('@fortawesome/free-solid-svg-icons');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:Mu75M8Bt7ftr0MZc@cluster0.cniyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

addCourse = async(course_details) =>{
    new_course = {
        uni_id: course_details.uni_id,
        course_id: course_details.course_id,
        uni_name: course_details.uni_name,
        course_name: course_details.course_name,
        prof_name: course_details.prof_name,
        tags:[{name:"LOTS OF HOMEWORK", count:0}, {name:"GIVES GOOD FEEDBACK", count:0},
              {name:"AMAZING LECTURES", count:0}, {name:"PARTICIPATION MATTERS", count:0},
              {name:"TOUGH GRADER", count:0}, {name:"TEST HEAVY", count:0},{name:"CARING", count:0}, 
              {name:"HILARIOUS", count:0}],
        reviews:[]
    }
    MongoClient.connect(url, function(err, db) {
        if (err) return { message: 'DB-error', err: True};
        var dbo = db.db("rmc");
        try {
            insertedDocID = await dbo.collection("courses").insertOne(new_course);
        } catch (error) {
            return {message: error, err: True};
        }
        db.close();
        return {docID: insertedDocID, err: False};
    });
}

addReview = (review_details) => {
    new_review = {
        course_mongo_id: review_details.id,
        quality: review_details.quality,
        difficulty: review_details.difficulty,
        professor:review_details.prof_name,
        take_class_again: review_details.take_class_again,
        class_for_credit: review_details.class_for_credit,
        textbook: review_details.textbook,
        attendance_mandatory: review_details.attendance_mandatory,
        grade_received: review_details.grade_received,
        feedback: review_details.grade_received,
    }
    MongoClient.connect(url, function(err, db) {
        if (err) return { message: 'DB-error', err: True};
        var dbo = db.db("rmc");
        try {
            insertedDocID = await dbo.collection("reviews").insertOne(new_review);
        } catch (error) {
            return {message: error, err: True};
        }
        db.close();
        return {docID: insertedDocID, err: False};
    });
}

