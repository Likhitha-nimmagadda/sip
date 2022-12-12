const exp = require("express");
const app = exp();
const mclient=require("mongodb").MongoClient;
const path=require('path');
const cors=require("cors")

app.use(cors())

const DBurl="mongodb+srv://surajsriram:31052816@cluster0.9gt016l.mongodb.net/?retryWrites=true&w=majority"

mclient.connect(DBurl)
.then((client)=>{

  let dbObj=client.db("sip");

  let reviewsCollectionObject=dbObj.collection("reviews");
  let deliveryReviewsCollectionObject=dbObj.collection("deliveryReviews")

  app.set("reviewsCollectionObject",reviewsCollectionObject);
  app.set("deliveryReviewsCollectionObject",deliveryReviewsCollectionObject);

  console.log("DB connection success")
})
.catch(err=>console.log('Error in DB connection ',err))

const reviewsApp = require("./APIS/reviewsApi.js");

app.use("/reviews-api", reviewsApp);

app.use((request, response, next) => {
  response.send({ message: `path ${request.url} is invalid` });
});

app.use((error, request, response, next) => {
  response.send({ message: "Error occurred", reason: `${error.message}` });
});

app.listen(4000, () => console.log("server listening on port 4000.."));
