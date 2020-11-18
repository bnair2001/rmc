// import {findForm} from '../../components/api/dbFunctions';
const MongoClient = require('mongodb').MongoClient;
const  url = "mongodb+srv://admin:Mu75M8Bt7ftr0MZc@cluster0.cniyt.mongodb.net/rmc?retryWrites=true&w=majority";

export default function handler(req, res) {
    if (req.method === 'POST') {
        findForm(req.body).then((result, err) => {
            res.json({ data: result, message: 'Success', err: false});
        });
    } else {
        res.json({ message: 'Send a post request!!', err: true});
    }
}

const findForm = async(data) =>{
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    if (data.uni_id === ""){
        try {
            let result = await client.db("rmc").collection("courses").find().toArray();
            return formatOptions(result, "UNI");
        } catch (error) {
            console.log(error);
            return { message: 'DB-error', err: True};
        }finally{
            client.close();
        }
    }
    else if(data.course_id === ""){
        try {
            let result = await client.db("rmc").collection("courses").find({uni_id:data.uni_id}).toArray();
            return formatOptions(result, "COURSE");
        } catch (error) {
            console.log(error);
            return { message: 'DB-error', err: True};
        }finally{
            client.close();
        }
    }
    else if(data.prof_id === ""){
        try {
            let result = await client.db("rmc").collection("courses").find({ uni_id: data.uni_id}).toArray();
            return formatOptions(result, "PROF");
        } catch (error) {
            console.log(error);
            return { message: 'DB-error', err: True};
        }finally{
            client.close();
        }
    }
    
}

const formatOptions = (preData, type) =>{
    let postData = [];
    if (type === "UNI"){
        preData.forEach((data, index) => {
            postData.push({value: data.uni_id, label: data.uni_name});
        });
    }
    else if(type === "COURSE"){
        preData.forEach((data, index) => {
            postData.push({value: data.course_id, label: data.course_name});
        });
    }
    else if(type === "PROF"){
        preData.forEach((data, index) => {
            postData.push({value: data.prof_id, label: data.prof_name});
        });
    }
    return postData;
}
