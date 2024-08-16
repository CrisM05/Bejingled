package com.capstone.bejingled;

import java.security.Key;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * Constants
 */
public class Constants {

  public static final Key API_SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

  public static final long TOKEN_VALIDITY = (1000 * 60 * 60 * 24 * 1000);
}