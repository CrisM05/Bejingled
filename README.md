# Bejingled
A recreation of my favourite game from when I was younger. Bejewled.
## Frontend
Made in React.

The game board is stored in a 2d array.

The game state gets stored as a string in the backedn.

Click a square, then click an adjacent square to swap them. If it's a valid 3 in a row match then it'll clear and drop in more squares to fill in the board.

## Backend
Made with Java in Spring Boot.

Used JWT for authentication.

Using postgres to store game information, as well as user information, all with Java.