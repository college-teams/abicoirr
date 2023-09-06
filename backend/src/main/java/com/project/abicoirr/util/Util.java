package com.project.abicoirr.util;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class Util {

  public static boolean isEmpty(Collection<List> list) {
    return list.isEmpty() || list == null;
  }

  public static boolean isEmpty(String s) {
    return s == null || s.isEmpty();
  }

  public static String generateUniqueImageKey(String entityName, String fileName) {
    String fileKey = UUID.randomUUID() + "_" + fileName;
    return String.format("%s/%s", entityName, fileKey);
  }
}
