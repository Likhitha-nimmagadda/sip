const exp = require("express");
const reviewsApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");

reviewsApp.use(exp.json());

reviewsApp.post(
  "/post-data",
  expressAsyncHandler(async (request, response) => {
    const userObj=request.body
    const reviewsCollectionObject=request.app.get("reviewsCollectionObject")
    const res = await reviewsCollectionObject.insertOne(request.body)
    response.send(res)
    }
  )
);

reviewsApp.get(
    "/get-data/:key",
    expressAsyncHandler(async (request, response) => {
        const key=request.params.key
        const reviewsCollectionObject=request.app.get("reviewsCollectionObject")
        const res = await reviewsCollectionObject.find({key: key}).toArray()

        let newA=0

        if(res.length===0){
            response.send("0")
        }

        else{
            for(var i=0;i<res.length;i++){
                for(var j=0;j<(Object.keys(res[0])).length-2;j++){
                    if(res[i][`${j+1}`]){
                        newA++;
                    }
                }
            }

            response.send(`${100*newA/(res.length*((Object.keys(res[0])).length-2))}`)
        }
        }
    )
  );

reviewsApp.post(
    "/post-delivery-data",
    expressAsyncHandler(async (request, response) => {
      const userObj=request.body
      const deliveryReviewsCollectionObject=request.app.get("deliveryReviewsCollectionObject")
      const res = await deliveryReviewsCollectionObject.insertOne(request.body)
      response.send(res)
      }
    )
);

reviewsApp.get(
    "/get-delivery-data/:key",
    expressAsyncHandler(async (request, response) => {
        const key=request.params.key
        const deliveryReviewsCollectionObject=request.app.get("deliveryReviewsCollectionObject")
        const res = await deliveryReviewsCollectionObject.find({key: key}).toArray()

        let newA=0

        if(res.length===0){
            response.send("0")
        }
        else{
            for(var i=0;i<res.length;i++){
                for(var j=0;j<(Object.keys(res[0])).length-2;j++){
                    if(res[i][`${j+1}`]){
                        newA++;
                    }
                }
            }

            response.send(`${100*newA/(res.length*((Object.keys(res[0])).length-2))}`)
        }
        }
    )
  );

module.exports = reviewsApp;
