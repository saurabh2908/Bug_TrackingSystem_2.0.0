const Model = require('../models/userSchema');
const userModel = Model.userModel;
const userMap = Model.mapModel;
const userRight = Model.rightModel;
const definedObj = require("../../utils/config");

var shortid = require('shortid');
const adminOperation = {
  
    adduser(userArray)  
    {    
       
            for(let userObject of userArray )
            {
                if(userObject.username != "")
                {
                    userObject.userId = "AD"+shortid.generate();
                    userModel.create(userObject,(err)=>
                    {
                        if(err)
                        {
                            console.log(typeof(userObject.username));
                            console.log({status:'S',message:'Record Not Added Due to Error'+ err});
                        }else{
                            CreateUserMapSchema(userObject);
                            
                            console.log(userObject.username);

                        //     const mail = require('../../utils/mail');
                        //  mail('Your account has been created',`congratulaion ${userObject.userid} your account has been created `,userObject.emailId,response)
                        console.log({status:'S',message:'Record Added'});
                        }
                    });
                        
                }else {
                        break;
                    }
            }
    },

    userlist(response){   // finding all user in admin pannel
        userModel.find({},(err,doc)=>{
            if(doc){
            response.status(200).json({status:'S',message:'All User List ',record:doc});
            }else{
                console.log("error is ....",err);
    
                 response.json({status:'F',message:'Invalid Userid or Password',record: null});
            }
        })
    },

    edit(userObject,response){
        console.log("hello Everyone",userObject);
        userModel.findOneAndUpdate({'userId' : userObject.rightId},
         {$set:{usertype: userObject.type}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");   
            }
            else{
                
             if(doc){

                // const mail = require('../../utils/mail');
                // const login = 'http://127.0.0.1:5500/client/index.html'
                // mail(' you are permoted by Admin',`Hello ${userObject.username} your are permoted by admin  ${login}`,userObject.newemail,response);

                response.status(200).json({status:'S',message: "Successfully Added",report: doc});
             }else{
                 console.log("userType Changed......")
               
             }
                
            }
        });
        userMap.findOne({'userId' : userObject.rightId},(err,doc)=>{
            if(err){
                console.log(err);
            }else{
                console.log("map is",doc.rightId);
                userRight.findOneAndUpdate({rightId: doc.rightId },
                     {$set:{userRights: JSON.parse(userObject.Rights)}},
                      {new: true}, (err, doc) => {
                        if (err) {
                            console.log("Something wrong when updating data!",err);
                           
                        }
                        else{
                            
                         if(doc){
            
                           
                           console.log(doc);
                            response.status(200).json({status:'S',message: "Successfully Added",report: doc});
                         }else{
                            response.json({status:'S', message: "plz enter correct userid and password"})
                         }
                            
                        }
                    });
            }
        })
    },

    add(userObject,response){
        userObject.userId = "AD"+shortid.generate();

        userModel.create(userObject,(err,data)=>{
            if(err){
                console.log(err);
             response.status(500).json({status:'S',message:'Record Not Added Due to Error'+ err});
            }else{
                console.log(data);
                CreateUserMapSchema(data);
               
            //     const mail = require('../../utils/mail');
            //  mail('Your account has been created...',`congratulaion ${userObject.userid} your account has been created `,userObject.emailId,response)
             response.status(200).json({status:'S',message:'Record Added'});
            }
        });
        
     },

     delete(userObject,response){
        userModel.deleteOne(userObject, function(err,result) {
            if (err) {
                    response.json({message:"error in deleting data"});
                    console.log("Error is",err);
            }
            else {
                response.json({message:"succefully delted record"});
                console.log("Data is",result);
                    
            }
        });
    },

    rightlist(response){
       response.json({adminRight: definedObj.AdminRight,testerRight: definedObj.TesterRight,devloperright: definedObj.DevloperRight})
    },
}



// *********************Schema Fuctions ********************************
function CreateRightSchema(rightId,usertype){
    if(usertype == "admin"){
        definedObj.AdminRight.rightId = rightId;
        userRight.create(definedObj.AdminRight,(err)=>{
            if(err){
                console.log("Error in creating userRight",err);

            }else{
                console.log("userRight succesfully Created ....");
                
            }
        })
    }
    if(usertype == "tester"){
        definedObj.TesterRight.rightId = rightId;
        userRight.create(definedObj.TesterRight,(err)=>{
            if(err){
                console.log("Error in creating userRight",err);

            }else{
                console.log("userRight succesfully Created ....");
               

            }
        })
    }
    else{
        definedObj.DevloperRight.rightId = rightId;
        userRight.create(definedObj.DevloperRight,(err)=>{
            if(err){
                console.log("Error in creating userRight",err);

            }else{
                console.log("userRight succesfully Created ....");
                
            }
        })

    }

}

function CreateUserMapSchema(doc){
    var rghtid  = "RI"+shortid.generate();
    userMap.create({'userId': doc.userId,'rightId': rghtid},(err)=>{
        if(err){
            console.log("Error in creating userMap collection",err);
            
        }else{
            console.log("userMap succefully Created");
            CreateRightSchema(rghtid,doc.usertype);
            
        }
    });
}

module.exports = adminOperation;