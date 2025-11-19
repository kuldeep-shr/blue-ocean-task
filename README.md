# NestJS Course Management API

A backend system built using **NestJS + MongoDB (Mongoose)** to manage:

- Categories
- SubCategories
- Courses

This README now covers:

- **Module 1: Category**
- **Module 2: SubCategory**

---

## Project Overview

This project implements a modular backend architecture for an e-learning platform using NestJS.

Completed Modules:

### ✅ Module 1 — Category

### ✅ Module 2 — SubCategory

⬜ Module 3 — Course (Coming Next)

Each module follows:

- Full CRUD operations
- Pagination
- Search
- Sorting
- Soft delete using `isDeleted`
- DTO validation
- Relationship validation
- Clean folder structure (Controller, Service, Schema, DTO)

---

## Tech Stack

- NestJS (v10+)
- TypeScript
- MongoDB (Atlas)
- Mongoose
- class-validator / class-transformer

---

# Module 1 — Category Module

## Features Implemented

### 1. CRUD Operations

- Create Category
- Get All Categories
- Get Category by ID
- Update Category (**POST**)
- Soft Delete Category (**POST**)

### 2. Pagination, Search & Sorting

Supported query parameters:

| Parameter   | Description    |
| ----------- | -------------- |
| `page`      | Page number    |
| `limit`     | Items per page |
| `search`    | Search by name |
| `sortBy`    | Sort field     |
| `sortOrder` | asc or desc    |

### 3. Soft Delete

Instead of deleting permanently, categories are marked as:

```json
{ "isDeleted": true }
```
