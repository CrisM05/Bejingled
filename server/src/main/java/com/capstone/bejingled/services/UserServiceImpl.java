package com.capstone.bejingled.services;

import java.util.regex.Pattern;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.bejingled.domain.User;
import com.capstone.bejingled.exceptions.EtAuthException;
import com.capstone.bejingled.repositories.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

  @Autowired
  UserRepository userRepository;

  @Override
  public User validateUser(String email, String password) throws EtAuthException {
    if (email != null) {
      email = email.toLowerCase();
    }
    User user = userRepository.findByEmail(email);
    if (user == null || !BCrypt.checkpw(password, user.getPassword())) {
      throw new EtAuthException("Invalid email or password.");
    }
    return user;
  }

  @Override
  public User registerUser(String email, String password) throws EtAuthException {
    Pattern pattern = Pattern.compile("^(.+)@(.+)$");
    if (email != null)
      email = email.toLowerCase();

    if (!pattern.matcher(email).matches()) {
      throw new EtAuthException("Invalid email format.");
    }
    try {
      User user = userRepository.findByEmail(email);
      if (user != null) {
        throw new EtAuthException("Email already in use.");
      }
    } catch (Exception e) {
      throw new EtAuthException("Email already in use.");
    }

    User user = userRepository.save(new User(email, BCrypt.hashpw(password, BCrypt.gensalt(10))));
    return userRepository.findById(user.getId());
  }

  @Override
  public User findUserById(long id) throws EtAuthException {
    return userRepository.findById(id);
  }

  @Override
  public void updateBoard(long id, User updatedUser) throws EtAuthException {
    User user = userRepository.findById(id);
    if (user == null) {
      throw new EtAuthException("User not found");
    }
    userRepository.save(updatedUser);
  }

  @Override
  public void updateScore (long id, User updatedUser) throws EtAuthException {
    User user = userRepository.findById(id);
    if (user == null) {
      throw new EtAuthException("User does not exist");
    }
    userRepository.save(updatedUser);
    
  }
}
