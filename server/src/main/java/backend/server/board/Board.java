package backend.server.board;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
/**
 * Board
 */
public class Board {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "board")
  private String[][] board;

  public String[][] getBoard() {
    return board;
  }

  public Long getId() {
    return id;
  }

  public Board () {

  }
  
}