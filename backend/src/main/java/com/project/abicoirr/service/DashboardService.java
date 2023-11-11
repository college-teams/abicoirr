package com.project.abicoirr.service;

import static com.project.abicoirr.codes.SuccessCodes.ENTITIES_ITEM_COUNT_FETCHED;

import com.project.abicoirr.models.Dashboard.DashboardEntityItemsCountResponse;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.AdminOrderRepository;
import com.project.abicoirr.repository.CategoryRepository;
import com.project.abicoirr.repository.ProductRepository;
import com.project.abicoirr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class DashboardService {

  private final UserRepository userRepository;
  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final AdminOrderRepository adminOrderRepository;

  public ApiResponse<DashboardEntityItemsCountResponse> getEntityItemsCount() {
    long userCount = userRepository.count();
    long categoriesCount = categoryRepository.count();
    long productsCount = productRepository.count();
    long adminOrdersCount = adminOrderRepository.count();

    DashboardEntityItemsCountResponse dashboardEntityItemsCountResponse =
        DashboardEntityItemsCountResponse.from(
            productsCount, adminOrdersCount, categoriesCount, userCount);
    return new ApiResponse<>(
        ENTITIES_ITEM_COUNT_FETCHED,
        AbstractResponse.StatusType.SUCCESS,
        dashboardEntityItemsCountResponse);
  }
}
