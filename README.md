# Ollert
## Description
A reverse-engineering of Trello (Ollert).  Users can register an account, create boards, columns, and cards.  The user is able to drag and drop cards into different columns.

[View deployed site](https://ollert.michaelclark.co)
## Technologies Used
- ReactJS
- react-dnd (Drag and Drop React library)
- Firebase (Authentication, Database)
- Bootstrap 3.3

## How To Run
1. Clone repo
1. Run `npm i` to install dependencies
1. Setup a Firebase project
1. Rename `constants.example.js` to `constants.js` and replace Firebase configuration
1. Run `npm start` to compile and host locally