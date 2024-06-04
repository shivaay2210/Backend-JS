const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export {asyncHandler}


// higher order functions : functions that can accept as well as are capable of returning functions

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

/* Explanation: () => async () => {}

const asyncHandler = (fn) => async () => {} 

const asyncHandler = (fn) => (
    async () => {

    } 
)
*/