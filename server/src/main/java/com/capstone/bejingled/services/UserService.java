package com.capstone.bejingled.services;

import java.util.Map;

import com.capstone.bejingled.domain.User;
import com.capstone.bejingled.exceptions.EtAuthException;

/**
 * UserService
 */
public interface UserService {

  User validateUser(String email, String password) throws EtAuthException;

  User registerUser(String email, String password, String displayName) throws EtAuthException;

  User findUserById (long id) throws EtAuthException;

  void updateBoard (long id, User updatedUser) throws EtAuthException;

  void updateScore (long id, User updatedUser) throws EtAuthException;

  void updateBazinga (long id, User updatedUser) throws EtAuthException;
  
  Map<String, Long> getHighScores();
}