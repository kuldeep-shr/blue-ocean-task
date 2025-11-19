# NestJS Course Management API

A backend system built using **NestJS + MongoDB (Mongoose)** to manage:

- Categories
- SubCategories
- Courses

This README includes:

- **Module 1 – Category**
- **Module 2 – SubCategory**
- **Module 3 – Course**
- **Environment Setup**
- **API Summary**
- **Postman Documentation**
- **Sample Test Data**

<br>

## 🚀 Tech Stack

- NestJS (v10+)
- TypeScript
- MongoDB (Atlas)
- Mongoose
- class-validator / class-transformer

<br>

# 🛠️ Installation & Setup

Follow the steps below to run the NestJS Course Management API locally.

```
clone the repository
cd <your project folder>
npm install
npm run seed (its optional, for sample data)
create .env file (below I gave you the structure)
npm run start:dev
```

<br>

# 📦 Module 1 — Category

### Features

- Create, List, Get, Update, Soft Delete
- Pagination, search & sorting
- Soft delete using `isDeleted: true`
- Analytics: Category → SubCategory count

# 📦 Module 2 — SubCategory

### Features

- Create SubCategory with Category validation
- List, search, filter by Category
- Update & Soft Delete
- categoryId must be valid

# 📦 Module 3 — Course

### Features

- Create Course with multiple Categories & SubCategories
- Strict validation rules:
- Valid Category IDs
- Valid SubCategory IDs
- Each SubCategory must belong to one of the selected Categories
- MongoDB transaction for course creation
- CRUD + Soft Delete

<br />

# 📬 Postman Documentation or For API Testing along with sample payload

👉 here is the link https://documenter.getpostman.com/view/30468072/2sB3WyJw4h `

<br >

# 📬 API Summary

| Module      | Method | Endpoint                         | Description                  |
| ----------- | ------ | -------------------------------- | ---------------------------- |
| Category    | POST   | `/category/create`               | Create Category              |
| Category    | GET    | `/category`                      | List Categories              |
| Category    | GET    | `/category/:id`                  | Get Category                 |
| Category    | POST   | `/category/update/:id`           | Update Category              |
| Category    | POST   | `/category/delete/:id`           | Soft Delete                  |
| Category    | GET    | `/category/analytics/with-count` | Category → SubCategory Count |
| SubCategory | POST   | `/subcategory/create`            | Create SubCategory           |
| SubCategory | GET    | `/subcategory`                   | List SubCategories           |
| SubCategory | GET    | `/subcategory/:id`               | Get SubCategory              |
| SubCategory | POST   | `/subcategory/update/:id`        | Update SubCategory           |
| SubCategory | POST   | `/subcategory/delete/:id`        | Soft Delete                  |
| Course      | POST   | `/course/create`                 | Create Course (Transaction)  |
| Course      | GET    | `/course`                        | List Courses                 |
| Course      | GET    | `/course/:id`                    | Get Course                   |
| Course      | POST   | `/course/update/:id`             | Update Course                |
| Course      | POST   | `/course/delete/:id`             | Soft Delete                  |

<br >

# ⚙️ Environment Setup

- PORT=XXXX
- MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/course-db

<br >

# 👨‍💻 Author

- Kuldeep Sharma
- Backend Developer / Node.js Specialist
- Freelancer | System Design & Scalable API Architecture

```

```
