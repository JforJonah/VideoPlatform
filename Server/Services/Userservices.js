'use strict'
let mongoose=require('mongoose');
let Users=mongoose.model('Users');

/**
 * retrieve the user by its id
 *
 * @param {*} userId the user id
 */
exports.getUser=(userId)=>{
    const promise=Users.findById(userId).exec();
    return promise;
}

/**
 *create a new user in the database
 *
 * @param {*} newUser the new created user
 * @returns promise
 */
exports.signUp=(newUser)=>{
    const user=new Users(newUser);
    return user.save();
}
// update personal info
exports.updateProfile=(id,updateUser)=>{
    const promise=Users.findByIdAndUpdate(id,updateUser).exec();
    return promise;
}
/**
 * Thumb up this video
 *
 * @param {*} userId 
 * @param {*} videoId
 * @returns
 */
exports.addLike=(userId,videoId)=>{
    let video=videoId._id;
    const promise=Users.update({
            "_id":userId
        },
        {
            $addToSet:{
                liked:video
            },
            $pull:{
                unlike:video
            }
        }
        ).exec();
        // console.log("cast");
        return promise;
    

}
/**
 * Thumb down this video
 *
 * @param {*} userId
 * @param {*} videoId
 * @returns
 */
exports.unLike=(userId,videoId)=>{
    let video=videoId._id;
    const promise=Users.update({
        "_id":userId
    },
    {
        $pull:{
            liked:video
        },
        $addToSet:{
            unlike:video
        }
    }
    ).exec();
    return promise;
}
/**
 * cancel Thumb up
 *
 * @param {*} userId
 * @param {*} videoId
 * @returns
 */
exports.cancelLike=(userId,videoId)=>{
    let video=videoId._id;
    const promise=Users.update(
        {
            "_id":userId
        },
        {
            $pull:{
                liked:video
            }
        }
    ).exec()
        return promise;
}

/**
 * cancel Thumb down
 *
 * @param {*} userId
 * @param {*} videoId
 * @returns
 */
exports.cancelUnLike=(userId,videoId)=>{
    let video=videoId._id;
    const promise=Users.update( {
        "_id":userId
    },
    {
        $pull:{
            unlike:video
        }
    }
    ).exec();
    return promise;
}
/**
 * add a video to your folder
 *
 * @param {*} userId
 * @param {*} videoId
 * @returns
 */
exports.addFavorite=(userId,videoId)=>{
    
    const promise=Users.update(
        {
            "_id":userId
        },
        {
            $push:{
                favorite:videoId
            }
        }
    ).exec();
    return promise;
}
/**
 * remove a video from your folder
 *
 * @param {*} userId
 * @param {*} videoId
 * @returns
 */
exports.unFavorite=(userId,videoId)=>{
    
    const promise=Users.update({
        "_id":userId
    },
    {
        $pull:{
            favorite:videoId
        }
    }
    ).exec();
    return promise;
}
/**
 * subscribe a author
 *
 * @param {*} userId
 * @param {*} authorId
 */
exports.subscribe=(userId,authorId)=>{
    
    const promise1=Users.update({
        "_id":userId
    },
    {
        $push:{
            subscribe:authorId
        }
    }
    ).exec();
    const promise2=Users.update({
        "_id":authorId
    },
    {
        $push:{
            subscribed:userId
        }
    }
    ).exec();

    const promise3=promise1.then(promise2);
    return promise3;
}
/**
 *Unsubscribe a author
 *
 * @param {*} userId
 * @param {*} authorId
 * @returns
 */
exports.unSubscribe=(userId,authorId)=>{
    
    const promise1=Users.update({
        "_id":userId
    },
    {
        $pull:{
            subscribe:authorId
        }
    }
    ).exec();
    const promise2=Users.update({
        "_id":authorId
    },
    {
        $pull:{
            subscribed:userId
        }
    }
    ).exec();
    
    const promise3=promise1.then(promise2);
    return promise3;
}
/**
 *Update watch history of this user
 *
 * @param {*} userId
 * @param {*} videoId
 */
exports.updateHistory=(userId,videoId)=>{
    let his=Users.findById(userId);
    // let exist=false;
    if(his.history!==null){
        his.history.forEach(element=>{
            if(element==videoId){
                // exist=true;
                Users.update({
                    "_id":userId
                },
                {
                    $pull:{
                        history:videoId
                    },
                }
                );
                return promise;
            }
        });
    }
    const promise=Users.update({
        "_id":userId
    },
    {
        $push:{
            history:videoId
        }
    }
    ).exec();
    return promise;
}

exports.uploadVideo=(videoId,authorId)=>{
    const promise=Users.update({
        "_id":authorId
    },
    {
        $push:{
            videos:videoId
        }
    }
    ).exec();
}
