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
    
    const promise=Users.create(newUser);
    return promise;
}
// update personal info
exports.updateProfile=(id,updateUser)=>{
    const promise=Users.findByIdAndUpdate(id,updateUser);
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
    
    let exist=User.findById(userId);
    // if you unliked this video before
    exist.unlike.forEach(element=>{
        if(element===videoId){
            const promise=User.update({
                "id":userId
            },
            {
                $push:{
                    liked:videoId
                },
                $pull:{
                    unlike:videoId
                }
            }
            ).exec();
            return promise;
        }
    });

    const promise=Users.update({
        "_id":userId
    },
    {
        $push:{
            liked:videoId
        },
    }
    ).exec();
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
    
    let exist=Users.findById(userId);
    exist.liked.forEach(element => {
        if(element===videoId){
            const promise=Users.update({
                "_id":userId
            },
            {
                $push:{
                    unlike:videoId
                },
                $pull:{
                    liked:videoId
                }
            }
            ).exec();
            return promise;
        }
        
    });
    const promise=Users.update({
        "_id":userId
    },
    {
        $push:{
            unlike:videoId
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
    
    const promise=User.update(
        {
            "_id":userId
        },
        {
            $pull:{
                liked:videoId
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
    const promise=User.update( {
        "_id":userId
    },
    {
        $pull:{
            unlike:videoId
        }
    }
    ).exec()
    return promise;
}