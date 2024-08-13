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
        .setExpiration(new Date(timestamp + Constants.TOKEN_VALIDITY))
        .signWith(Constants.API_SECRET_KEY, SignatureAlgorithm.HS256)
        .compact();

    Map<String, String> map = new HashMap<>();
    map.put("token", token);
    return map;
  };

  @PostMapping("/register")
  public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, Object> userMap) {
    String email = (String) userMap.get("email");
    String password = (String) userMap.get("password");

    User user = userService.registerUser(email, password);
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
  public ResponseEntity<Map<String, String>> updateUserBoard (@PathVariable long id, @RequestBody Map<String, Object> boardMap) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map <String, String> map = new HashMap<>();
    String board = (String) boardMap.get("board");
    user.setBoard(board);
    userService.updateBoard(id, user);
    map.put("message", "board updated");
    return new ResponseEntity<>(map, HttpStatus.OK);
  }
  
  @GetMapping("/{id}/score")
  public ResponseEntity<Map<String, Long>> getUserScore (@PathVariable long id) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map<String,Long> map = new HashMap<>();
    map.put("score", user.getScore());
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @PatchMapping("/{id}/score")
  public ResponseEntity<Map<String,String>> updateUserScore (@PathVariable long id, @RequestBody Map<String, Object> scoreMap) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    long score = (long) scoreMap.get("score");
    user.setScore(score);
    userService.updateScore(id, user);
    Map<String,String> map = new HashMap<>();
    map.put("message", "score updated");
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Map<String,Object>> getUser (@PathVariable long id) {
    User user = userService.findUserById(id);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Map<String, Object> map = new HashMap<>();
    map.put("board", user.getBoard());
    map.put("score", user.getScore());
    return new ResponseEntity<>(map,HttpStatus.OK);
  }
  
}