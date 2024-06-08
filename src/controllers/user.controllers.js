import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res) => {
    // get user data from fontend
    // validation - not empty 
    // check if user already exist: userName, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and fresh token field from response 
    // check for user creation 
    // return res

    // all data comes in req.body
    const { fullName, email, userName, password } = req.body
    console.log(`email: ${email}`)

    // check fields one by one 
    // if(fullName === "") {
    //     throw new ApiError(400, "FullName is Required")
    // }

    
    // check multiple fields together 
    if(
        [fullName, password, email, userName].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are Required")
    }

    // User.findOne({ userName })
    // User.findOne({ email })
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    if(existedUser) {
        throw new ApiError(409, "User with email or userName already exists")
    }

    // console.log(req.files); 

    // req.body --> express, req.files is given by multer
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }   

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

} )

export {registerUser}