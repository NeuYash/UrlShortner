# UrlShortner
# URL Shortener Project

## Introduction

This project is a URL Shortener service built with MongoDB and Node.js. It allows users to create shortened URLs based on the hash of a long URL and a user-specific hashed ID. Additionally, users can access a history of their shortened URLs. The system provides error handling in case the tier limit has been reached.

## Features

1. **Shorten URLs:** Easily create short URLs for long links, making them more manageable and shareable.
   extra feature: For particular user, if he has already shortened a Long Url, and tries to shorten it again, User will get the old shortened url. Thus saves processing time and DB space.

3. **User-Specific Short URLs:** Each user has a unique hashed ID, ensuring personalized and secure short URLs.

4. **History Tracking:** Keep track of the shortened URLs created by a specific user.

5. **Tier Limit Handling:** The system gracefully handles errors when a user reaches their tier limit for creating short URLs.

## Technologies Used

- **MongoDB:** A NoSQL database for storing user information, URL mappings, and history.

- **Node.js:** A JavaScript runtime for server-side scripting.

## Getting Started

### Prerequisites

1. Install Node.js: [Node.js Download](https://nodejs.org/)

2. Install MongoDB: [MongoDB Download](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NeuYash/UrlShortner.git
   ```

2. Install dependencies:

   ```bash
   cd url-shortener
   npm install
   ```

3. Configure MongoDB:

   - Ensure MongoDB is running locally or update the connection string in the project.

4. Start the server:

   ```bash
   npm run start
   ```

## Usage

1. **Shorten a URL:**

   - Send a POST request to `/shorten` with a JSON body consisting LongUrl and id(UserID).

2. **Access Shortened URLs History:**

   - Send a GET request to `/history/:userId` to retrieve the history of shortened URLs for a specific user.

3. **Create User:**

   - Send a POST request to `/create` to create Tier based users.
   - Tier1: Can shorten 5 urls
   - Tier2: Can Shorten 4 urls
   - Tier based structure for demo purpose.

## Error Handling

- The system provides appropriate error messages when a user reaches the tier limit for creating short URLs.

## Contributors

- Yash Pawar.
