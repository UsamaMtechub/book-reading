const bookModel = require("../models/bookModel");
const mongoose =require("mongoose");
const fs= require("fs");
const notification = require("../utils/notification")
const { ifError } = require("assert");
const viewModel = require('../models/viewModel');

exports.addBook = async (req,res)=>{
    try{
        const category_id = req.body.category_id;
        const paid = req.body.paid;
        const price = req.body.price;
        const bookType = req.body.bookType;
        const numberOfPages = req.body.numberOfPages;
        const chapters = req.body.chapters;
        const number_of_reads= req.body.number_of_reads
        const bookName = req.body.bookName;
        const description = req.body.description;
        const author_name= req.body.author_name;
        const published_date= req.body.published_date;

        var notificationResponse ={};

        console.log(req.files)
        if(!paid){
            return res.json({
                message: "Please provide paid status of true or false",
                status:false,
                success:"failed"
            })
        }
        else if(paid=="true" && !price){
            return res.json({
                message: "Please Provide price if you want book to be paid",
                status:false,
            })
        }
        
        if(req.files){
            if(req.files.image){
                if(req.files.image[0]){
                    var image= req.files.image[0].path
                }
            }
        }
       
        
        if(req.files){
            if(req.files.file){
                if(req.files.file[0]){
                    const book = new bookModel({
                        _id:mongoose.Types.ObjectId(),
                        category_id:category_id,
                        chapters:chapters,
                        numberOfPages:numberOfPages,
                        number_of_reads:number_of_reads,
                        bookType:bookType,
                        paid:paid,
                        price:price,
                        image:image,
                        file:req.files.file[0].path,
                        bookName:bookName,
                        description:description,
                        author_name:author_name,
                        published_date:published_date,
                        views:0
                    });
                    
                    const result =await book.save()
                    if(result){

                       let isNotificationSent =  await notification("allUsers" , "admin" , "This is Title" , "This is Body" , "bookAdd" , result._id);
                       
                       if(isNotificationSent){
                            notificationResponse.notificationMessage= "Notification has been sent to all Users "
                       }

                        res.json({
                            message: "Book has been saved successfully",
                            result: result,
                            status: true,
                            statusCode: 201,
                            notificationResponse:notificationResponse
                            
                        })
                    }
                    else{
                        res.json({
                            message: "Book could not be saved successfully",
                            status:false
                        })
                    }
                }
                else{
                    res.json({
                        message:"Please provide file of book to add it.",
                        status:false
                    })
                }
                
            }
            else{
                res.json({
                    message:"Please provide file of book to add it.",
                    status:false
                })
            }
    
           
        }
        
        
    }
    catch(err){
        res.json({
            message: "Error Occurred while saving book",
            error:err.message,
            status:false
        })
    }
}

exports.getAllBooks = async (req ,res) => {
    try{
        const result = await bookModel.find({}).populate('category_id');
        if(result){
            res.json({
                message:"All Books fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch books",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while saving book",
            error:err.message,
            status:false
        })
    }
}

exports.getAllPaidBooks= async (req ,res) => {
    try{
        const result = await bookModel.find({paid:true}).populate('category_id');
        if(result){
            res.json({
                message:"All paid Books fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch books",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
}

exports.getAllFreeBooks= async (req ,res) => {
    try{
        const result = await bookModel.find({paid:false}).populate('category_id');
        if(result){
            res.json({
                message:"All free Books fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch books",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
}

exports.getEbooksOnlyWithPaidStatus= async (req ,res) => {
    try{
        const paid = req.query.paid;
        const result = await bookModel.find({paid:paid , bookType:"ebook"}).populate('category_id');
        if(result){
            res.json({
                message:"ebooks with this paid status ="+ paid + " fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
}

exports.getAudioBooksOnlyWithPaidStatus= async (req ,res) => {
    try{
        const paid= req.query.paid;
        const result = await bookModel.find({paid:paid , bookType:"audio"}).populate('category_id');
        if(result){
            res.json({
                message:" Audio books with this paid status ="+ paid + " fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
}

exports.DeleteBook= async (req ,res) => {
    try{
        const book_id= req.query.book_id;

        const foundResult = await bookModel.findOne({_id:book_id});

        const result = await bookModel.deleteOne({_id:book_id});
        if(result.deletedCount>0){
            await deleteImage(foundResult);
            res.json({
                message:"Book deleted successfully",
                result:result,
                status:true,
            })
        }
        else{
            res.json({
                message:"could not delete ",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while deleting book",
            error:err.message,
            status:false
        })
    }
}


exports.updateBook= async (req ,res) => {
    try{
        const book_id= req.body.book_id;
        const category_id = req.body.category_id;
        const rating= req.body.rating;
        const paid = req.body.paid;
        let price = req.body.price;
        const bookType = req.body.bookType;
        const numberOfPages = req.body.numberOfPages;
        const chapters = req.body.chapters;
        const number_of_reads= req.body.number_of_reads
        const bookName = req.body.bookName;
        const description = req.body.description;
        const author_name= req.body.author_name;
        const published_date= req.body.published_date;

        

        var fileFound;
        var imageFound;

        if(paid=="true" && !price){
            return(
                res.json({
                    message: 'If you want to keep book paid then must provide price for it .it seems price is missing',
                    status:false
                })
            )
            
        }

        if(paid=="false"){
            price=0
        }



        const foundResult = await bookModel.findOne({_id:book_id});

        if(req.files){
            if(req.files.image){
                if(req.files.image[0]){
                    imageFound = "true";
                    if(req.files.image[0].path){
                        var image = req.files.image[0].path
                    }
                }
            }
            if(req.files.file){
                fileFound="true";
                if(req.files.file[0]){
                    if(req.files.file[0].path){
                        var file = req.files.file[0].path
                    }
                }
            }    
        }

        if(req.files.image){
            if(req.files.image[0]){
                imageFound = "true";
                if(req.files.image[0].path){
                    var image = req.files.image[0].path
                }
            }
        }
        if(req.files.file){
            fileFound="true";
            if(req.files.file[0]){
                if(req.files.file[0].path){
                    var file = req.files.file[0].path
                }
            }
        }


        const result = await bookModel.findOneAndUpdate({_id:book_id}
            ,{
                        category_id:category_id,
                        rating:rating,
                        chapters:chapters,
                        numberOfPages:numberOfPages,
                        number_of_reads:number_of_reads,
                        bookType:bookType,
                        paid:paid,
                        price:price,
                        image:image,
                        file:file,
                        bookName:bookName,
                        description:description,
                        author_name:author_name,
                        published_date:published_date,
                        
            },
            {
                new:true
            });


        if(result){
            if(imageFound=='true'){fs.unlink(foundResult.image , (err)=>{if(!err){console.log("image deleted")}})}
            if(fileFound=='true'){fs.unlink(foundResult.file , (err)=>{if(!err){console.log("file deleted")}})}
            res.json({
                message:"Book Updated successfully",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not update",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while update books",
            error:err.message,
            status:false
        })
    }
}

exports.searchBook = async (req,res)=>{
    try{
        const text = req.query.text;

        const result = await bookModel.find({bookName: {$regex:text , $options:'i'}});
        if(result){
            res.json({
                message:"Books fetched with this search",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch books",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
    
}

exports.getAllTrendingBooks = async (req,res)=>{
    try{
        const result = await bookModel.find().sort({rating:-1}).limit(8);

        if(result){
            res.json({
                message:"All trending Books fetched , records are limited to 8",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch books",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
        })
    }
}

exports.getBooksByCategory_id= async (req,res)=>{
    try{
        const category_id = req.query.category_id
        if(!category_id){
            return(
                res.json({
                    message: "please provide category_id",
                    status:false
                })
            )
        }
        const result = await bookModel.find({category_id:category_id}).populate('category_id');
        if(result){
            res.json({
                message:"Books with this category fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch books",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
}

exports.getEBooksByCategory_id= async (req,res)=>{
    try{
        const category_id = req.query.category_id
        if(!category_id){
            return(
                res.json({
                    message: "please provide category_id",
                    status:false
                })
            )
        }
        const result = await bookModel.find({category_id:category_id , bookType:'ebook' }).populate('category_id');
        if(result){
            res.json({
                message:"EBooks with this category fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch Ebooks",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching Ebooks",
            error:err.message,
            status:false
        })
    }
}

exports.getAudioBooksByCategory_id= async (req,res)=>{
    try{
        const category_id = req.query.category_id
        if(!category_id){
            return(
                res.json({
                    message: "please provide category_id",
                    status:false
                })
            )
        }
        const result = await bookModel.find({category_id:category_id , bookType:'audio' }).populate('category_id');
        if(result){
            res.json({
                message:"Audio Books with this category fetched",
                result:result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message:"could not fetch audio books",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
}


exports.searchBook_by_author_name = async (req,res)=>{
    try{
        try{
            const text = req.query.text;
    
            const result = await bookModel.find({author_name: {$regex:text , $options:'i'}});
            if(result){
                res.json({
                    message:"Books fetched with this author name",
                    result:result,
                    status:true,
                    statusCode:201
                })
            }
            else{
                res.json({
                    message:"could not fetch books",
                    status:false,
                })
            }
        }
        catch(err){
            res.json({
                message: "Error Occurred while fetching books",
                error:err.message,
                status:false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching books",
            error:err.message,
            status:false
        })
    }
}


exports.addViewToBook = async (req,res)=>{
    try{
        const book_id = req.body.book_id;
        const user_id = req.body.user_id;
        if(!book_id || !user_id){
            return(
                res.json({
                    message: "Book id and user id must be provided",
                    status:false
                })
            )
        }

        const viewed = await viewModel.findOne({ user_id:user_id, book_id:book_id });
        if(!viewed){
            const result =await bookModel.findOneAndUpdate({_id:book_id} , {$inc:{views:1}} , {new:true});

            
           let view =  new viewModel({
                _id:mongoose.Types.ObjectId(),
                user_id:user_id,
                book_id:book_id
            });
            let viewSaved= await view.save();

            if(viewSaved){
               console.log('view of this user added')
            }

            if(result){
                res.json({
                    message: "Book view Incremented",
                    result:result,
                    status:true
                })
            }


        }
        else{
            res.json({
                message: "Do Nothing, This User already given view to this book",
                status:false
            })
        }
    }
    catch(err){
        res.json({
            message: "error Occurred",
            status:false,
            error:err.message
        })
    }
}

exports.getViewersOfBook = async(req,res)=>{
    try{
        const book_id = req.query.book_id;
        
        const result = await viewModel.find({book_id:book_id}).populate('book_id').populate('user_id');

        if(result){
            res.json({
                message: "All Users who view this this book",
                result:result,
                status:true
            })
        }
        else{

                res.json({
                    message: "could not fetch users",
                    status:false
                })

        }
    }
    catch(err){
        res.json({
            message: "error Occurred",
            status:false,
            error:err.message
        })
}
}

exports.getMonthsAndBookCount = async (req,res)=>{
    try{
        let year = req.query.year;

        if(!year){
            return(
                res.json({
                    message:"Please provide year as a input",
                    status:false
                })
            )
        }
        year= parseInt(year)

        const pipeline =[
            {
                $match:{
                    date: {
                        $gte: new Date(year, 0, 1),
                        $lte: new Date(year, 11, 31),
                      }
                }
            },
            {
                $group:{
                    _id:{month:{$month : '$date'} , bookType:'$bookType'},
                    count:{$sum: 1}
                }
            },
            {
                $group:{
                   _id:'$_id.month',
                   total_audio_books :{
                    $sum:{
                        $cond:[{
                            $eq:['$_id.bookType' , 'audio'],
                        },
                        '$count',
                        0
                    ]
                    }
                   },total_e_books :{
                    $sum:{
                        $cond:[{
                            $eq:['$_id.bookType' , 'ebook'],
                        },
                        '$count',
                        0
                    ]
                    }
                   }
                }
            },


            {
                $sort: {
                  '_id': 1,
                },
              },
            {
                $project:{
                    _id:0,
                    month:'$_id',
                    total_audio_books:1,
                    total_e_books:1
                }
            }
        ];

        const result = await bookModel.aggregate(pipeline);

        if(result){
            res.json({
                message: "Result fetched",
                result:result,
                status:true
            })
        }
        else{
            res.json({
                message: "Could not fetch the result",
                status:false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred",
            error:err.message
        })
    }
}


//functions
async function deleteImage(foundResult)
{
    console.log(foundResult)
    if(foundResult){
        if(foundResult.image){
            fs.unlink(foundResult.image , (err)=>{
                if(!err){
                    console.log("image deleted")
                }else{
                    console.log("error deleting image")
                }
            })
        }
        if(foundResult.file){
            fs.unlink(foundResult.file , (err)=>{
                if(!err){
                    console.log("file deleted")
                }else{
                    console.log("error deleting file")
                }
                
            })
        }
    }
}

