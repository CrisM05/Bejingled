package com.capstone.bejingled.resources;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.bejingled.Constants;
import com.capstone.bejingled.domain.User;
import com.capstone.bejingled.services.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * UserResource
 */
@RestController
@RequestMapping("/api/users")
public class UserResource {
  @Autowired
  UserService userService;

  private Map<String, String> generateJWTToken(User user) {
    long timestamp = System.currentTimeMillis();
    String token = Jwts.builder()
        .claim("userId", user.getId())
        .claim("email", user.getEmail())
        .setIssuedAt(new Date(timestamp))
        .setExpiration(new Date((timestamp + Constants.TOKEN_VALIDITY)))
        .signWith(Constants.API_SECRET_KEY, SignatureAlgorithm.HS256)
        .compact();

    Map<String, String> map = new HashMap<>();
    map.put("token", token);
    map.put("userId", Long.toString(user.getId()));
    return map;
  };

  @PostMapping("/register")
  public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, Object> userMap) {
    String email = (String) userMap.get("email");
    String password = (String) userMap.get("password");
    String displayName = (String) userMap.get("displayName");

    User user = userService.registerUser(email, password, displayName);
    return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);
  }

  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, Object> userMap) {
    String email = (String) userMap.get("email");
    String password = (String) userMap.get("password");
    User user = userService.validateUser(email, password);
    return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);
  }

  @GetMapping("/{id}/board")
  public ResponseEntity<Map<String, String>> getUserBoard(@PathVariable long id) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map<String, String> map = new HashMap<>();
    map.put("board", user.getBoard());
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @PatchMapping("/{id}/board")
  public ResponseEntity<Map<String, String>> updateUserBoard(@PathVariable long id, @RequestBody String body) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map<String, String> map = new HashMap<>();
    user.setBoard(body);
    userService.updateBoard(id, user);
    map.put("message", "board updated");
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/{id}/score")
  public ResponseEntity<Map<String, Long>> getUserScore(@PathVariable long id) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map<String, Long> map = new HashMap<>();
    map.put("score", user.getScore());
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @PatchMapping("/{id}/score")
  public ResponseEntity<Map<String, String>> updateUserScore(@PathVariable long id, @RequestBody String body) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    long scoreLong = Long.parseLong(body);
    user.setScore(scoreLong);
    if (scoreLong > user.getHighScore()) {
      user.setHighScore(scoreLong);
    }
    userService.updateScore(id, user);
    Map<String, String> map = new HashMap<>();
    map.put("message", "score updated");
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Map<String, Object>> getUser(@PathVariable long id) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map<String, Object> map = new HashMap<>();
    map.put("board", user.getBoard());
    map.put("score", user.getScore());
    map.put("displayName", user.getDisplayName());
    map.put("bazinga", user.getBazinga());
    map.put("highScore", user.getHighScore());
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/me")
  public ResponseEntity<Map<String, Integer>> getUserId(@RequestAttribute Object userId) {
    Integer id = (Integer) userId;

    if (userService.findUserById(id) == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map<String, Integer> map = new HashMap<>();
    map.put("id", (id));
    return new ResponseEntity<>(map, HttpStatus.OK);

  }

  @PatchMapping("/{id}/bazinga")
  public ResponseEntity<Map<String, String>> updateBazinga(@PathVariable long id, @RequestBody String newBazinga) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    boolean real = Boolean.parseBoolean(newBazinga);
    user.setBazinga(real);
    userService.updateBazinga(id, user);
    Map<String,String> map = new HashMap<>();
    map.put("message", "Bazinga updated to" + newBazinga);
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/highScores")
  public ResponseEntity<Map<String, Long>> getHighScore() {
    Map<String, Long> scores = userService.getHighScores();
    return new ResponseEntity<>(scores, HttpStatus.OK);
  }
  
}