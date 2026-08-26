# Part 4: Database Relationships

Here is the completed table for Part 4, analyzing the relationships between the collections using Embedded or Referenced strategies! You can copy and paste this directly into your activity document.

| Relationship | Strategy | Justification |
| :--- | :--- | :--- |
| **Product -> Category** | Referenced Documents | Products reference categories to avoid redundant data, maintain consistency, and support a one-to-many relationship where multiple products can belong to the same category. |
| **Cart -> User** | Referenced Documents | A cart belongs to a specific user. Referencing the User ID keeps the Cart document lightweight instead of duplicating all user information (like password and email) inside the cart. |
| **Cart -> Cart Items (Products)** | Embedded Documents | The items added to a cart are embedded as an array inside the Cart document. This is ideal because a cart is retrieved as a single unit and the list of items is small and bounded. |
| **Order -> User** | Referenced Documents | An order is placed by a user. We reference the user to maintain a one-to-many relationship (one user can have many orders) without duplicating user profile data in every order. |
| **Order -> Order Items (Products)**| Embedded Documents | The specific items bought in an order are embedded as an array inside the Order document. This ensures that the exact state of the purchase (quantities and items) is locked and retrieved together instantly. |
| **Review -> Product** | Referenced Documents | Reviews are stored in their own collection and reference the Product they belong to. This prevents the Product document from growing infinitely large if it receives thousands of reviews. |
| **Review -> User** | Referenced Documents | Reviews reference the User who wrote them. This links the review to the author without embedding the user's personal details inside the review itself. |
