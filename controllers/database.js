const MyCollection = require("../models/myCollection");

const getAllData = async (req, res) => {
    const { author, title, sort, select, publishedAt, startDate, endDate } = req.query;
    const queryObject = {};

    // Filter by author
    if (author) {
        queryObject.author = author;
    }

    // Filter by title with case-insensitive regex
    if (title) {
        queryObject.title = { $regex: title, $options: "i" };
    }

    // Filter by a specific date (considering the entire day)
    if (publishedAt) {
        const startOfDay = new Date(publishedAt);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(publishedAt);
        endOfDay.setUTCHours(23, 59, 59, 999);
        
        queryObject.publishedAt = {
            $gte: startOfDay,
            $lte: endOfDay
        };
    }

    // Filter between two dates
    if (startDate && endDate) {
        queryObject.publishedAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    console.log("Query Object:", queryObject);

    try {
        let apiData = MyCollection.find(queryObject);

        // Sorting
        if (sort) {
            let sortFix = sort.split(",").join(" ");
            apiData = apiData.sort(sortFix);
        }

        // Selecting specific fields
        if (select) {
            let selectFix = select.split(",").join(" ");
            apiData = apiData.select(selectFix);
        }

        // Fetch the data
        const myData = await apiData;
        res.status(200).json({ myData });

        // Logging request query parameters
        console.log("Request Query:", req.query);

    } catch (error) {
        // Error handling
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllData;
