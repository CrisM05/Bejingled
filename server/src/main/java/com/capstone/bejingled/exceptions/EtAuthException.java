package com.capstone.bejingled.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * EtAuthExceptions
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class EtAuthException extends RuntimeException{

  public EtAuthException (String message) {
    super(message);
  }
}