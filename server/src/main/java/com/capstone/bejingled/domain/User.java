package com.capstone.bejingled.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/**
 * User
 */
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column(name = "email", nullable = false)
  private String email;
  @Column(name = "password", nullable = false)
  private String password;
  @Column (name = "displayName")
  private String displayName;
  @Column(name = "board")
  private String board;
  @Column(name = "score")
  private long score;
  @Column(name = "bazinga")
  private boolean bazinga;
  @Column (name = "high Score")
  private long highScore;

  protected User() {
  }

  public User(String email, String password, String displayName) {
    this.email = email;
    this.password = password;
    this.board = "";
    this.score = 0;
    this.displayName = displayName;
    this.bazinga = false;
    this.highScore = 0;
  }

  public Integer getId() {
    return this.id;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getBoard() {
    return board;
  }

  public void setBoard(String board) {
    this.board = board;
  }

  public long getScore() {
    return score;
  }

  public void setScore(long score) {
    this.score = score;
  }

  public String getDisplayName() {
    return displayName;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }
  
  public void setBazinga(boolean bazinga) {
    this.bazinga = bazinga;
  }

  public boolean getBazinga() {
    return bazinga;
  }

  public long getHighScore() {
    return highScore;
  }

  public void setHighScore(long highScore) {
    this.highScore = highScore;
  }
}