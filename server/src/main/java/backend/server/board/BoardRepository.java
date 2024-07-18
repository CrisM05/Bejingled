package backend.server.board;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * BoardRepository
 */
public interface BoardRepository extends JpaRepository<Board,Long>{
}