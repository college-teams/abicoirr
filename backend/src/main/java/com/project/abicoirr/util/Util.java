package com.project.abicoirr.util;

import java.util.Collection;
import java.util.List;

public class Util {

  public static boolean isEmpty(Collection<List> list) {
    return list.isEmpty() || list == null;
  }

  public static boolean isEmpty(String s) {
    return s == null || s.isEmpty();
  }
}
