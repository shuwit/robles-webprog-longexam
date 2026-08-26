# Part 3: Database Structure (Data Types)

Here is the completed table for Part 3, mapping every required field from Part 2 to its correct MongoDB data type. I have formatted it exactly like the example in your screenshot!

| Collection | Field | Data Type |
| :--- | :--- | :--- |
| **Product** | `_id` | ObjectId |
| | `name` | String |
| | `description` | String |
| | `price` | Number |
| | `category` | ObjectId |
| | `stock` | Number |
| | `image` | String |
| **Category** | `_id` | ObjectId |
| | `name` | String |
| | `description` | String |
| **Cart** | `_id` | ObjectId |
| | `user` | ObjectId |
| | `cartItems` | Array |
| **Orders** | `_id` | ObjectId |
| | `user` | ObjectId |
| | `orderItems` | Array |
| | `shippingAddress` | String |
| | `paymentMethod` | String |
| | `totalPrice` | Number |
| | `isPaid` | Boolean |
| | `isDelivered` | Boolean |
| **Reviews** | `_id` | ObjectId |
| | `user` | ObjectId |
| | `product` | ObjectId |
| | `name` | String |
| | `rating` | Number |
| | `comment` | String |
| **User** | `_id` | ObjectId |
| | `name` | String |
| | `email` | String |
| | `password` | String |
| | `isAdmin` | Boolean |
