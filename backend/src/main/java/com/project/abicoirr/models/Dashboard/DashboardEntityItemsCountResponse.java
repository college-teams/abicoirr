package com.project.abicoirr.models.Dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardEntityItemsCountResponse {

  private Long users;
  private Long products;
  private Long adminOrders;
  private Long categories;

  public static DashboardEntityItemsCountResponse from(
      Long productsCount, Long adminOrdersCount, Long categoriesCount) {
    return DashboardEntityItemsCountResponse.builder()
        .users(100L) // TODO: Update this once user module development is done
        .products(productsCount)
        .adminOrders(adminOrdersCount)
        .categories(categoriesCount)
        .build();
  }
}
