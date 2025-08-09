import User from "../model/User.js"
import Submission from "../model/Submission.js"

export const getSubmission = async (req,res) =>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const submissions = await Submission.find({userId}).populate('problemId','title').sort({submittedAt:-1});
        res.status(200).json({user,submissions});
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
};