import Submission from '../model/Submission.js';

export const getSubmissionHistory = async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user.id }).sort({ submittedAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
