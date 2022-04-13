const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    price: Number,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'node js',
        author: 'Himanshu',
        price: 35,
        tags: ['node'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);
}

async function getCoursesUsingComparisonOperators() {
    const courses = await Course.find({author: 'Himanshu'})
        .find({ price: { $gte: 10, $lte: 20 }}) // check if price is (10 <= price <= 20)
        .find({ price: { $in: [10, 15, 20] }}) // checkn if price is 10, 15 or 20
        .limit(10) // shows only first 10 results
        .sort({ name: 1 }) // sort the data by name in ascending order
        .select({ name: 1, tags: 1}) // shows this fields only
        .count(); // return the total count of data present
    console.log(courses);
}

async function getCoursesUsingLogicalOperators() {
    const courses = await Course.find({author: 'Himanshu'})
        .find()
        .or([ { author: 'Himanshu' }, { isPublished: true } ]) // if any condition is true, that data is returned
        .and([ { author: 'Himanshu' }, { price: { $in: [10, 15, 20] } } ]); // return only those fullfilling all conditions
    console.log(courses);
}

async function getCoursesUsingRegularOperators() {
    const courses = await Course
        .find({ author: /^Him/ }) //if author starts with Him, it will be returned
        .find({ author: /nShu$/i }) //if author ends with nshu, it will be returned and i at last tells to ignore case
        .find({ author: /.*nsh.*/ }) // checks if author have any substring as nsh, then that will be returned
    console.log(courses);
}

getCoursesUsingComparisonOperators();
getCoursesUsingLogicalOperators();
getCoursesUsingRegularOperators();


