package com.capstone.bejingled.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.bejingled.domain.User;
import com.capstone.bejingled.exceptions.EtAuthException;

/**
 * UserRepository
 */
public interface UserRepository extends JpaRepository<User, Long>{
  User findByEmailAndPassword(String email, String password) throws EtAuthException;

  User findByEmail(String email) throws EtAuthException;

  User findById(long id);
  
}