'use strict'
const userServices=require('../Services/userServices'),
    bcrypt=require('bcrypt'),
    HashMap=require('hashmap'),
    passport=require('passport');
    // mongoose=require('mongoose');
    // let User=mongoose.model('Users');
    // passport.use(new LocalStrategy(
    //   function(username, password, done) {
    //     User.findOne({ email: username }, function(err, user) {
    //       if (err) { return done(err); }
    //       if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //       }
    //       if (!user.verifyPassword(password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //       }
    //       return done(null, user);
    //     });
    //   }
    // ));

let map=new HashMap()

exports.getUser=function(request,response){
        const resolve=(list)=>{
            response.setStatus(200);
            response.json(list);
        }
        userServices.getUser(request.param.id).then(resolve).catch(renderErrorResponse);
    };

/**
 *signUp function 
 *if signUp success return token to client
 * @param {*} request
 * @param {*} response
 * 
 */
exports.signUp=function(request,response){
    let newUser={};
    newUser.email=request.body.email;
    newUser.username=request.body.username;
    // newUser.password=request.body.password;
    newUser.firstName=request.body.firstName;
    newUser.lastName=request.body.lastName;
    // check if the password equals confirmPassword
    let password=newUser.password,
        confirmPassword=request.body.confirmPassword;
    if(password!==confirmPassword){
        response.setStatus(422).json({message:'the two password must be the same!'});
        return;
    }
    
    // encode the password
    newUser.password=bcrypt.hash(password, 10);
    // return token to user

    const resolve=(user)=>{
        response.status(200).json({'token': user.generateJwt()})
    }
    let errorHandle=(response)=>{
        const errorCallback=(error)=>{
            if(error===11000){
                response.status(400);
                response.send(error.message);
            }else{
                response.status(500);
                response.json({
                    message: error.message
                });
            }
        }
        return errorCallback;
    };
    userServices.signUp(user)
    .then(resolve)
    .catch(errorHandle);
}

exports.login=function(request,response,next){
    passport.authenticate('local',function(err, user, info) {
        // 如果这个函数被调用了，说明认证成功。
        // `req.user` 包含已认证的用户
        if(err)return response.status(400).json(err);
        else if(user){
            // response.redirect()
            return response.status(200).json({"token":user.generateJwt()});
            
        }
        else return response.status(404).json(info);
        
    });
}

exports.signOut = (req, res) => {
    res.json({
      message:'Sign out successful!'
    })
  }
      /**
       * 
       * @param {*} req,res
       */
exports.userInfo=(req,res)=>{

      const resolve=(user)=>{
          res.status(200);
          res.json(user);
      }
      userServices.getUser(user)
      .then(resolve)
      .catch(renderErrorResponse);
  }
/**
 *
 *update user info
 * @param {*} req
 * @param {*} res
 */
exports.userUpdate=(req,res)=>{
    let updateUser=req.body;
    let id=req.id;
    const resolve=(user)=>{
        res.status(200);
        res.json({"token":user.generateJwt(),"msg":'ok'});
    }

    userServices.updateProfile(id,updateUser)
    .then(resolve)
    .catch(renderErrorResponse);
}
/**
 *
 * Thumb up this video
 * @param {*} req
 * @param {*} res
 */
exports.like=(req,res)=>{
    let videoId=req.body;
    let userId=req.id;
    const resolver=(user)=>{
        res.status(200);
        res.json({"msg":'successful'});
    }

    userServices.addLike(userId,videoId)
    .then(resolver)
    .catch(renderErrorResponse);
}
/**
 * Thumb down this video
 *
 * @param {*} req
 * @param {*} res
 */
exports.unLike=(req,res)=>{
    
}
/**
 * add this video to your favorite folder
 *
 * @param {*} req
 * @param {*} res
 */
exports.favorite=(req,res)=>{
    
}
/**
 * remove the video from your favorite folder
 *
 * @param {*} req
 * @param {*} res
 */
exports.unFavorite=(req,res)=>{

}
/**
 *subscribe a user
 *
 * @param {*} req
 * @param {*} res
 */
exports.subscribe=(req,res)=>{

}
/**
 * 
 * unsubscribe a user
 * @param {*} req
 * @param {*} res
 */
exports.unSubscribe=(req,res)=>{

}
/**
 *get the watch history of this user
 *
 * @param {*} req
 * @param {*} res
 */
exports.getHistory=(req,res)=>{
    
}

/**
 * update the watch history of this user
 *
 * @param {*} req
 * @param {*} res
 */
exports.updateHistory=(req,res)=>{
    
}
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
   let renderErrorResponse = (response) => {
       const errorCallback = (error) => {
           if (error) {
               response.status(500);
               response.json({
                   message: error.message
               });
           }
       };
       return errorCallback;
   };