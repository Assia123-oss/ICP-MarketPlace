# ICP Job Marketplace

Welcome to the ICP Job Marketplace project! This is a decentralized marketplace for connecting job seekers and employers using the Internet Computer Protocol (ICP).

## Running the Application

For detailed instructions on how to run the application, please see the [HOW_TO_RUN.md](HOW_TO_RUN.md) file.

### Quick Start

```bash
# Make the script executable
chmod +x run.sh

# Run the application
./run.sh
```

## Project Structure

- `backend/`: Contains the backend code written in Motoko
  - `src/backend_backend/`: Backend canister code
  - `src/backend_frontend/`: Frontend assets canister
- `README.md`: Detailed project documentation
- `frontend-documentation.md`: Documentation for the frontend implementation
- `HOW_TO_RUN.md`: Instructions for running the application
- `run.sh`: Script to automate the process of running the application

## Features

- **User Profiles**: Verified profiles for job seekers and employers with skills, experience, and portfolio showcases.
- **Job Listings**: Employers can post job opportunities, and job seekers can browse and filter listings.
- **AI Matching**: Analyzes user profiles and job listings to suggest optimal matches.
- **Smart Contracts**: Automates agreements and payment processing with dispute resolution mechanisms.
- **Community Ratings**: Users can rate each other after transactions for transparency.

## API Documentation

For detailed API documentation, please see the [README.md](README.md) file.

## Development

### Prerequisites

- [DFINITY SDK (dfx)](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Setup

1. Clone the repository
2. Navigate to the project directory
3. Follow the instructions in [HOW_TO_RUN.md](HOW_TO_RUN.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.