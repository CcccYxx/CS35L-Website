const PostMessage = require('../models/postMessage.js');

const getPosts = async (req,res) =>{
    /*try{
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch(error){
        res.status(404).json({ message: error.message }); 
    }
    */
   res.send("This is forum page");
   console.log("This is forum page");
  
}

const createPost = async (req, res) =>{
    const post = req.body;
    const newPost = new PostMessage(post);

    try{
        await newPost.save()
        res.status(201).json(newPost);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports=getPosts;
module.exports=createPost;