exports.postGrant = async (req, res, next) => {
    try {
        const task = awaitTask.findByIdAndUpdate(
            req.body,
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Tasknot found'
            });
        }
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
};