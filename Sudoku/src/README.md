# Sudoku Game in Java (Swing GUI)

This is a simple Sudoku game implemented in Java using the Swing framework. The game presents the user with a partially completed Sudoku puzzle and allows them to fill in the remaining cells using number buttons at the bottom of the interface.

## Features

- 9x9 Sudoku board with a pre-loaded puzzle and its solution.
- Click-based number input (buttons 1-9).
- Error counter that increases when an incorrect number is placed.
- Pre-filled cells are not editable.
- GUI constructed using Java Swing components (`JFrame`, `JButton`, `JPanel`, etc.).
- Visual grid lines to differentiate 3x3 sub-grids.

## How to Run

1. **Ensure Java is installed** on your system (Java 8 or later).
2. Compile the code:

    ```bash
    javac Sudoku.java
    ```

3. Run the application:

    ```bash
    java Sudoku
    ```

> 💡 Note: The class does not include a `main` method. You can add one like below to launch the game:

```java
public class Main {
    public static void main(String[] args) {
        new Sudoku();
    }
}
```

Then compile and run:
 ```bash
javac Main.java Sudoku.java
java Main
```
## Gameplay Instructions
1. Click on a number (1-9) at the bottom to select it.

2. Click on an empty tile on the board to attempt to place the number.

3. If the placement is correct (matches the solution), it appears on the board.

4. If incorrect, the error counter at the top increments.

5. The game does not currently check for puzzle completion.

## Future Improvements
- Add puzzle validation and win condition detection.

- Support multiple puzzles and random generation.

- Add a timer and scoring system.

- Improve visual feedback for errors.

## License
This project is open-source and available for modification or extension.
