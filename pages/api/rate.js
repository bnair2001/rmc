var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:Mu75M8Bt7ftr0MZc@cluster0.cniyt.mongodb.net/rmc?retryWrites=true&w=majority";
var { nanoid } = require("nanoid");

let tagsProto = [
  {name:"LOTS OF HOMEWORK", count:0}, 
  {name:"GIVES GOOD FEEDBACK", count:0},
  {name:"AMAZING LECTURES", count:0},
  {name:"PARTICIPATION MATTERS", count:0},
  {name:"TOUGH GRADER", count:0},
  {name:"TEST HEAVY", count:0},
  {name:"CARING", count:0}, 
  {name:"HILARIOUS", count:0}
];

export default function handler(req, res) {
    if (req.method === 'POST') {
      if(isNew(req.body)){
        // console.log("route-1");
        addCourse(req.body, tagsProto).then((course) => {
          addReview(req.body, course.docID).then((review) => {
            res.json({ data:{pid: course.docID}, message: 'Success', err: false});
          });
        });
      }else{
        // console.log("route-2");
        updateCourse(req.body, tagsProto).then((course) => {
          addReview(req.body, course.docID).then((review) => {
            res.json({ data:{pid: course.docID}, message: 'Success', err: false});
          });
        });
      }
    } else {
        res.json({ message: 'Send a post request!!', err: true});
    }
  }

const addCourse = async(course_details, tagsProto) =>{
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  let noTags = false;
  if (typeof course_details.tags !== 'undefined' && course_details.tags.length > 0) {
    noTags= true;
  }
  const new_course = {
      uni_id: validateIds(course_details.selectedUni),
      course_id: validateIds(course_details.selectedCourse),
      prof_id: validateIds(course_details.selectedProf),
      uni_name: course_details.selectedUni.label,
      course_name: course_details.selectedCourse.label,
      prof_name: course_details.selectedProf.label,
      tags:noTags? tagsProto: addTags(course_details.tags, tagsProto),
      overallQuality:[course_details.qualityRating],
      overallDifficulty:[course_details.difficultyRating]
  }
  try {
      const insertedDocID = await (await client.db("rmc").collection("courses").insertOne(new_course)).insertedId;
      return {docID: insertedDocID, err: false};
  } catch (error) {
      console.log(error);
      return { message: 'DB-error', err: true};
  }
}


const updateCourse = async(course_details, tagsProto) => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const noTags = false;
  const pageId = await getPageId(course_details.selectedUni.value, course_details.selectedCourse.value, course_details.selectedProf.value, client);
  try {
      //tag check
      if (typeof course_details.tags !== 'undefined' && course_details.tags!=null && course_details.tags.length > 0) {
        const newTags = addTags(course_details.tags, tagsProto);
        const insertedDocID = await client.db("rmc").collection("courses").updateOne(
          {
             _id: pageId
          },
          {
              $push: { 
                  overallQuality: course_details.qualityRating,
                  overallDifficulty:course_details.difficultyRating 
              },
              $inc: {
                  "tags.0.count": newTags[0].count,
                  "tags.1.count": newTags[1].count,
                  "tags.2.count": newTags[2].count,
                  "tags.3.count": newTags[3].count,
                  "tags.4.count": newTags[4].count,
                  "tags.5.count": newTags[5].count,
                  "tags.6.count": newTags[6].count,
                  "tags.7.count": newTags[7].count,                    
              }
          }
      );
      return {docID: pageId, err: false};
      }else{
        const insertedDocID = await client.db("rmc").collection("courses").updateOne(
          {
              _id: pageId
          },
          {
              $push: { 
                  overallQuality: course_details.qualityRating,
                  overallDifficulty:course_details.difficultyRating 
              },
          }
      );
      return {docID: pageId, err: false};
      }
     
    
  } catch (error) {
      console.log(error);
      return { message: 'DB-error', err: true};
  } 
}

const addReview = async(data, page_id) => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const new_review = {
      page_id: page_id,
      qualityRating: data.qualityRating,
      difficultyRating: data.difficultyRating,
      uni_name: data.selectedUni.label,
      course_name: data.selectedCourse.label,
      prof_name: data.selectedProf.label,
      wytia: data.wytia,
      credit: data.credit,
      textbook: data.textbook,
      attendance: data.attendance,
      grade: data.grade,
      tags: addTags(data.tags, tagsProto),
      comment: data.comment,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      tandc: data.tandc
  }
  try {
      const insertedDocID = await client.db("rmc").collection("reviews").insertOne(new_review).insertedId;
      return {docID: insertedDocID, err: false};
  } catch (error) {
      console.log(error);
      return { message: 'DB-error', err: true};
  } 
}

const getPageId = async (uni_id, course_id, prof_id, client) =>{
  const page = await client.db("rmc").collection("courses").findOne({uni_id:uni_id, course_id:course_id, prof_id:prof_id});
  return page._id

}

// Helper's helpers
const validateIds = (selected) => {
  if (selected.hasOwnProperty('__isNew__')){
      return nanoid();
  }else{
      return selected.value;
  }
}

const addTags = (tags, tagsProto) =>{
  tagsProto.forEach((tag, index) => {
      if(tags.filter(obj => {return obj.label === tag.name}).length > 0){
          tagsProto[index].count += 1;
      }
  });
  return tagsProto
}

const isNew = (data) => {
  if (data.selectedUni.hasOwnProperty('__isNew__') 
      || data.selectedCourse.hasOwnProperty('__isNew__') 
      || data.selectedProf.hasOwnProperty('__isNew__')){
        return true;
  } else{
    return false;
  }
}