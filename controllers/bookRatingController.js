const mongoose = require('mongoose');
const bookRatingModel = require('../models/bookRatingModel')
const ObjectId = require('mongodb').ObjectId;
const bookModel = require('../models/bookModel')
exports.rateBook= async(req,res)=>{
    try{
        let book_id = req.body.book_id;
        const user_id = req.body.user_id;
        let rating = req.body.rating;
        let total_rating ;
        let number_of_rating;
        
        if(!rating){
            return(
                res.json({
                    message: "rating must be provided",
                    status:false
                })
            )
        }
        
        rating = parseInt(rating);

        if(!(rating > 0 && rating <=5)){
            return(
                res.json({
                    message: "rating must be from 1 to 5",
                    status:false
                })
            )
        }


        if(!book_id || !user_id){
            return(
                res.json({
                    message: "book_id and user_id must be provided",
                    status:false
                })
            )
        }

     const result = await bookRatingModel.findOneAndUpdate({book_id:book_id , user_id: user_id} ,
        {
            rating:rating
        },
        {
            new:true,
            upsert:true
        });

        if(result){
            book_id=new ObjectId(book_id);
            const foundRating = await bookRatingModel.aggregate([
                {
                    $match: {
                        book_id: book_id, 
                    },
                  },
                  {
                    $group: {
                      _id: '$book',
                      totalRating: { $avg: '$rating' },
                      numberOfRatings: { $sum: 1 },
                    },
                  },
            ]);
            if(foundRating){
                if(foundRating.length>0){
                    if(foundRating[0].totalRating && foundRating[0].numberOfRatings){
                        total_rating = foundRating[0].totalRating,
                        number_of_rating= foundRating[0].numberOfRatings
                    }
                }
            }

            if(total_rating && number_of_rating){
                const updateBook = await bookModel.findOneAndUpdate({_id:book_id} , {rating:total_rating , number_of_ratings:number_of_rating} , {new:true});
                if(updateBook){console.log('book updated')}
            }
        }

        if(result){
            res.json({
                message: "Book has been rated",
                result:result,
                status:true
            })
        }
        else{
            res.json({
                message: "could not rate this book",
                status:false
            })
        }

    }
    catch(err){
        res.json({
            message: "Error",
            status:false,
            error:err.message
        })
    }
}

exports.getRatingOfBook = async (req,res)=>{
    try{
        let book_id = req.query.book_id ; 

        if(!book_id){
            return(
                res.json({
                    message: "Book Id must be provided",
                    status:false,
                })
            )
        }
        book_id=new ObjectId(book_id);
            const foundRating = await bookRatingModel.aggregate([
                {
                    $match: {
                        book_id: book_id, 
                    },
                  },
                  {
                    $group: {
                      _id: '$book',
                      totalRating: { $avg: '$rating' },
                      numberOfRatings: { $sum: 1 },
                    },
                  },
            ]);

            if(foundRating){
                res.json({
                    message: "rating for book fetched",
                    status:true,
                    result:foundRating
                })
            }
            else{
                res.json({
                    message: "Could not fetch rating",
                    status:false,
                })
            }
        
    }
    catch(err){
        res.json({
            message :"Error Occurred",
            status:false,
            error:err.message
        })
    }
}