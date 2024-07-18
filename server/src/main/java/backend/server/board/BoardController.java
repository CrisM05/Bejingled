package backend.server.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/board")
/**
 * BoardController
 */
public class BoardController {

  @Autowired
  private BoardRepository repository;

  @GetMapping("")
  public Board getBoard() {
    return new Board();
  }

}