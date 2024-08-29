# ATS (Application Tracking System)
## Overview

ATS is an Application Tracking System designed to streamline the recruitment process for organizations. This system helps manage job applications, track candidates, and facilitate the hiring workflow.

## Features

- Candidate management
- Employee management
- Job posting and application tracking
- Resume parsing and screening
- Reporting and analytics
- User-friendly interface

## Installation

To set up the ATS locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/YosephSE/ATS.git
```

2. Navigate to the project directory:

```
cd ATS
```

3. Install dependencies:

```
npm install
```
```
cd client
```
```
npm install
```

4. Configure the environment variables (see Configuration section)
5. Run the application:

```
npm start
```

## Configuration

Create a `.env` file in the root directory and add the following variables:

```
MONGO_URI=your_database_connection_string
SECRET_KEY=jwt_secret_key
PORT=8080
```


## Contributing

We welcome contributions to the ATS project. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.