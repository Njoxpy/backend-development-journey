

Here are some MongoDB questions for practice, ranging from basic to more advanced topics:

### Basic Level
1. **What is MongoDB?**
   - Explain what MongoDB is and how it differs from relational databases.
   
2. **What is a Document in MongoDB?**
   - Define a document in MongoDB and its structure.

3. **What is a Collection in MongoDB?**
   - What is the difference between a document and a collection?

4. **How do you insert a document into a collection?**
   - Provide the basic command to insert a document into a collection.

5. **How do you find a document in MongoDB?**
   - Write a query to find all documents in a collection.

6. **Explain the concept of a Primary Key in MongoDB.**
   - What is the default primary key in MongoDB?

### Intermediate Level
7. **What are Indexes in MongoDB, and why are they important?**
   - Explain how indexing works and how it affects query performance.

8. **How do you update a document in MongoDB?**
   - Provide an example of how to update a single document and multiple documents.

9. **What is a Replica Set in MongoDB?**
   - Explain the concept of a replica set and its importance in high availability.

10. **What is the aggregation framework in MongoDB?**
    - Explain the basic stages in an aggregation pipeline.

11. **How would you model a one-to-many relationship in MongoDB?**
    - Describe a scenario and show how to model it.

12. **What is a capped collection in MongoDB?**
    - What are the use cases for capped collections?

### Advanced Level
13. **How does MongoDB handle transactions?**
    - Describe how transactions are managed in MongoDB and how they differ from traditional relational databases.

14. **What is Sharding in MongoDB?**
    - Explain how sharding works and when it is necessary to use sharding.

15. **How do you perform a text search in MongoDB?**
    - Provide an example of how to implement text search in MongoDB.

16. **What is the difference between `findOne()` and `find()` in MongoDB?**
    - Explain the difference in behavior and when to use each.

17. **How can you ensure data consistency in MongoDB?**
    - Discuss techniques such as write concern, read concern, and using transactions.

18. **What are the different types of MongoDB storage engines?**
    - Describe WiredTiger and MMAPv1 storage engines.

19. **What are the best practices for optimizing MongoDB queries?**
    - Discuss strategies such as query planning, indexing, and schema design.

20. **How would you scale MongoDB horizontally?**
    - Explain how horizontal scaling works and the methods to scale out a MongoDB database.

Here are answers to the MongoDB questions:

### Basic Level

1. **What is MongoDB?**
   - MongoDB is a NoSQL, document-oriented database. It stores data in BSON (binary JSON) format and is highly scalable, flexible, and designed for applications that require fast, low-latency access to large volumes of data. Unlike relational databases, MongoDB doesn’t use tables and rows but uses collections and documents.

2. **What is a Document in MongoDB?**
   - A document in MongoDB is a set of key-value pairs. It is the basic unit of data in MongoDB and is similar to a row in a relational database. A document is stored in BSON format, which supports data types like strings, integers, arrays, and nested documents.

3. **What is a Collection in MongoDB?**
   - A collection is a group of MongoDB documents, similar to a table in relational databases. Collections do not require a predefined schema, meaning the documents in a collection can have different fields and structures.

4. **How do you insert a document into a collection?**
   ```js
   db.collectionName.insertOne({
      name: "John Doe",
      age: 29,
      email: "johndoe@example.com"
   });
   ```

5. **How do you find a document in MongoDB?**
   ```js
   db.collectionName.find({});  // This returns all documents in the collection
   db.collectionName.find({ name: "John Doe" });  // Finds documents where the 'name' is John Doe
   ```

6. **Explain the concept of a Primary Key in MongoDB.**
   - In MongoDB, the primary key is the `_id` field. It uniquely identifies each document within a collection. If not explicitly provided, MongoDB automatically generates an ObjectId for the `_id`.

### Intermediate Level

7. **What are Indexes in MongoDB, and why are they important?**
   - Indexes improve query performance by allowing MongoDB to quickly locate documents without scanning the entire collection. Indexes can be created on specific fields, and MongoDB supports different types of indexes (e.g., single-field, compound, geospatial, text).

8. **How do you update a document in MongoDB?**
   - To update a document:
   ```js
   db.collectionName.updateOne(
      { name: "John Doe" },
      { $set: { age: 30 } }
   );
   ```
   - To update multiple documents:
   ```js
   db.collectionName.updateMany(
      { age: { $lt: 30 } },
      { $set: { status: "young" } }
   );
   ```

9. **What is a Replica Set in MongoDB?**
   - A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and high availability. One member of the replica set is the primary, while the others are secondaries. If the primary goes down, one of the secondaries is automatically promoted to primary.

10. **What is the aggregation framework in MongoDB?**
    - The aggregation framework processes data records and returns computed results. It uses an aggregation pipeline, where documents are passed through multiple stages such as `$match`, `$group`, `$sort`, and `$project`.

    Example:
    ```js
    db.collectionName.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: "$age", total: { $sum: 1 } } }
    ]);
    ```

11. **How would you model a one-to-many relationship in MongoDB?**
    - You can use either embedded documents (for a small number of related items) or references (for large collections). For a one-to-many relationship, store the "many" items as an array of documents within the "one" document.

    Example:
    ```js
    {
      _id: 1,
      name: "John Doe",
      orders: [
        { orderId: 1001, item: "Laptop" },
        { orderId: 1002, item: "Phone" }
      ]
    }
    ```

12. **What is a capped collection in MongoDB?**
    - A capped collection is a fixed-size collection that automatically overwrites the oldest documents when it reaches its size limit. It’s ideal for storing logs or real-time data where old entries can be discarded.

### Advanced Level

13. **How does MongoDB handle transactions?**
    - MongoDB supports multi-document transactions, ensuring atomicity across multiple operations. This is useful in situations where you need to perform several write operations as a single unit of work.

    Example:
    ```js
    const session = db.startSession();
    session.startTransaction();
    try {
      db.collectionName.insertOne({ name: "John Doe" }, { session });
      db.collectionName.updateOne({ name: "Jane Doe" }, { $set: { status: "updated" } }, { session });
      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
    } finally {
      session.endSession();
    }
    ```

14. **What is Sharding in MongoDB?**
    - Sharding is the process of distributing data across multiple machines. It is used to scale out large databases. MongoDB uses a shard key to divide data across shards, ensuring that data is distributed evenly and queries are efficient.

15. **How do you perform a text search in MongoDB?**
    - MongoDB provides text indexes for full-text search. First, create a text index, then perform the search.
    ```js
    db.collectionName.createIndex({ description: "text" });
    db.collectionName.find({ $text: { $search: "MongoDB" } });
    ```

16. **What is the difference between `findOne()` and `find()` in MongoDB?**
    - `findOne()` returns the first document that matches the query, while `find()` returns a cursor that can iterate over all matching documents. `findOne()` is useful when you expect a single result.

17. **How can you ensure data consistency in MongoDB?**
    - MongoDB ensures consistency through write concerns (ensuring data is written to the specified number of nodes) and read concerns (ensuring data is read from the appropriate nodes). Transactions also help enforce data consistency.

18. **What are the different types of MongoDB storage engines?**
    - **WiredTiger**: The default storage engine, optimized for performance and concurrency.
    - **MMAPv1**: The older storage engine, which is less efficient with concurrency.

19. **What are the best practices for optimizing MongoDB queries?**
    - Use indexes effectively, avoid using unindexed fields in queries, optimize aggregation pipelines, use covered queries, and ensure proper schema design.

20. **How would you scale MongoDB horizontally?**
    - Horizontal scaling can be achieved through sharding. This involves splitting data across multiple nodes and distributing workloads efficiently.

Here are some practice questions focused on finding documents, sorting, limiting, and working with nested documents in MongoDB:

### Finding Documents

1. How would you find all documents in a collection where the field `age` is greater than 30?
   
2. Write a query to find all documents where the `name` field is either "Alice" or "Bob".

3. How would you find documents in a collection where the `status` field is `"active"` and the `age` is less than 25?

4. What query would you use to find documents that have a nested document with the field `address.city` equal to "New York"?

5. Write a query to find documents where the array field `tags` contains the value `"mongodb"`.

6. How would you find documents that have a field `createdAt` with a date greater than `2023-01-01`?

### Sorting Documents

7. Write a query to find all documents and sort them in ascending order by the field `age`.

8. How would you retrieve documents sorted in descending order based on `createdAt`?

9. Write a query that retrieves documents sorted by `age` in ascending order and `name` in descending order.

10. Write a query to find the documents and sort them by a nested field, `address.zipCode`, in ascending order.

### Limiting Results

11. Write a query to find the first 5 documents where the `status` is `"active"`.

12. How would you retrieve the top 3 documents with the highest `price` from a collection of products?

13. Write a query to find documents where `age` is greater than 30 and limit the results to 10 documents.

14. How would you find the first document with `name` "Alice", limiting the results to only one document?

15. Write a query to find all documents and return only the `name` and `age` fields, limiting the results to 5 documents.

### Nested Documents

16. Write a query to find documents where the `address` field is a nested document with a `city` of "Paris" and `zipcode` of "75000".

17. How would you query for documents that have an array `orders` and contain at least one object with a `total` greater than 100?

18. Write a query to find all documents where the `profile` field contains a nested `contact` field with the `email` field equal to "example@example.com".

19. How do you find documents where an array `items` contains an object with both `itemId` as 102 and `quantity` greater than 2?

20. How would you find documents with nested arrays, where the `reviews` array contains a review object with the `rating` greater than or equal to 4?

### Answers

These questions cover key operations in MongoDB, and the corresponding answers would involve using the appropriate MongoDB queries such as `$gt`, `$lt`, `$in`, `$elemMatch`, `$sort`, `$limit`, and dot notation for querying nested documents. Would you like to go through the answers for any of these questions?