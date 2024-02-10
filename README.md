## Description
Protein Search is a React-based application designed to facilitate the exploration of proteins using the UniProt API.

It leverages a modern tech stack including React, React Router, React Redux, React Thunk, TypeScript, Firebase Auth, and protvista-uniprot to deliver a seamless user experience.

A live version of the app is hosted and can be accessed [here](https://kserditov.github.io/).

## Getting Started
To run the project locally, follow these steps:

1. Ensure that Node.js is installed on your system.
2. Install project dependencies by running `npm install` from the root directory of the project.
3. Launch the application with `npm run dev`.

## Usage Guide

1. **Logging In**: From the landing page, click on the **Login** button.
   
    ![image](https://github.com/KSerditov/ProteinSearch/assets/3009597/b25ec475-791a-497c-afd1-7af2a9a271eb)

    Enter your credentials to log in or click **Sign Up** to create a new account. The application uses Firebase for authentication.

    ![image](https://github.com/KSerditov/ProteinSearch/assets/3009597/ab7548b9-d16b-4fde-a599-8eea9ff6b79e)

2. **Searching for Proteins**: Input a disease or species name in the search bar and click **Search**. The app fetches and displays a table of relevant proteins from the [UniProt database](https://www.uniprot.org/). As you scroll, more results are dynamically loaded.

    ![image](https://github.com/KSerditov/ProteinSearch/assets/3009597/53231d9d-cfcc-4425-a41e-b266f61167f7)

3. **Applying Filters**: You have the option to refine your search results using various filters.
   
    ![image](https://github.com/KSerditov/ProteinSearch/assets/3009597/ab9c990b-7c0b-4b6f-9a23-c93ba824d081)

4. **Viewing Protein Details**: Clicking on a protein name opens a detailed view, including publications and visualizations.

   ![image](https://github.com/KSerditov/ProteinSearch/assets/3009597/ef8d6a35-3540-4e2b-ab17-0640cee73b30)

   ![image](https://github.com/KSerditov/ProteinSearch/assets/3009597/6f5ed56a-1085-463e-94b5-7c57951405ff)

   ![image](https://github.com/KSerditov/ProteinSearch/assets/3009597/eff06663-0a6c-45dc-bfe0-e007fbfcca83)

5. **Caching for Performance**: The app caches results to ensure that repeated queries for the same protein load almost instantly.
6. **Adaptive design**: The app supports mobile browsing.
