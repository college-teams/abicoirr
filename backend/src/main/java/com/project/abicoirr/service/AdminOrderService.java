package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.ADMIN_ORDER_NOT_FOUND;
import static com.project.abicoirr.codes.SuccessCodes.ADMIN_ORDER_CREATED;
import static com.project.abicoirr.codes.SuccessCodes.ADMIN_ORDER_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.ADMIN_ORDER_LIST_FETCHED;
import static com.project.abicoirr.codes.SuccessCodes.ADMIN_ORDER_UPDATED;

import com.project.abicoirr.entity.AdminOrder;
import com.project.abicoirr.entity.Product;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.AdminOrder.AdminOrderResponse;
import com.project.abicoirr.models.AdminOrder.CreateAdminOrderRequest;
import com.project.abicoirr.models.AdminOrder.UpdateAdminOrderRequest;
import com.project.abicoirr.models.response.AbstractResponse.StatusType;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.AdminOrderRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class AdminOrderService {

  private final AdminOrderRepository adminOrderRepository;
  private final ProductService productService;

  public ApiResponse<List<AdminOrderResponse>> getAdminOrderList() {
    List<AdminOrder> adminOrders = adminOrderRepository.findAll();
    List<AdminOrderResponse> adminOrderList = AdminOrderResponse.from(adminOrders);
    return new ApiResponse<>(ADMIN_ORDER_LIST_FETCHED, StatusType.SUCCESS, adminOrderList);
  }

  public ApiResponse<AdminOrderResponse> getAdminOrder(Long adminOrderId) throws BaseException {
    AdminOrder adminOrderData = getAdminOrderById(adminOrderId);

    AdminOrderResponse adminOrder = AdminOrderResponse.from(adminOrderData);
    return new ApiResponse<>(ADMIN_ORDER_LIST_FETCHED, StatusType.SUCCESS, adminOrder);
  }

  public ApiResponse<AdminOrderResponse> addAdminOrder(
      CreateAdminOrderRequest createAdminOrderRequest) throws BaseException {

    List<Product> products = new ArrayList<>();
    for (Long productId : createAdminOrderRequest.getProductIds()) {
      Product product = productService.getProductById(productId);
      products.add(product);
    }
    createAdminOrderRequest.setOrderTimestamp(LocalDateTime.now());
    AdminOrder adminOrder = CreateAdminOrderRequest.from(createAdminOrderRequest, products);
    adminOrderRepository.save(adminOrder);

    AdminOrderResponse adminOrderResponse = AdminOrderResponse.from(adminOrder);
    return new ApiResponse<>(ADMIN_ORDER_CREATED, StatusType.SUCCESS, adminOrderResponse);
  }

  public ApiResponse<AdminOrderResponse> updateAdminOrder(
      Long adminOrderId, UpdateAdminOrderRequest updateAdminOrderRequest) throws BaseException {

    AdminOrder existingAdminOrder = getAdminOrderById(adminOrderId);

    // Update the existingAdminOrder with data from updateAdminOrderRequest
    updateAdminOrderFields(existingAdminOrder, updateAdminOrderRequest);

    // Save the updated adminOrder to the database
    AdminOrder updatedAdminOrder = adminOrderRepository.save(existingAdminOrder);

    AdminOrderResponse adminOrderResponse = AdminOrderResponse.from(updatedAdminOrder);
    return new ApiResponse<>(ADMIN_ORDER_UPDATED, StatusType.SUCCESS, adminOrderResponse);
  }

  public ApiResponse deleteAdminOrder(Long adminOrderId) throws BaseException {
    AdminOrder adminOrderData = getAdminOrderById(adminOrderId);

    adminOrderRepository.delete(adminOrderData);
    return new ApiResponse<>(ADMIN_ORDER_DELETE_SUCCESS, StatusType.SUCCESS);
  }

  private AdminOrder getAdminOrderById(Long id) throws BaseException {
    Optional<AdminOrder> adminOrder = adminOrderRepository.findById(id);

    if (adminOrder.isEmpty()) {
      throw new BaseException(ADMIN_ORDER_NOT_FOUND);
    }

    return adminOrder.get();
  }

  private Set<Product> getUpdatedProductSet(List<Long> productIds) throws BaseException {
    List<Product> products = new ArrayList<>();
    for (Long productId : productIds) {
      Product product = productService.getProductById(productId);
      products.add(product);
    }
    return new HashSet<>(products);
  }

  private void updateAdminOrderFields(
      AdminOrder existingAdminOrder, UpdateAdminOrderRequest updateAdminOrderRequest)
      throws BaseException {
    existingAdminOrder.setUserId(updateAdminOrderRequest.getUserId());
    existingAdminOrder.setOrderStatus(updateAdminOrderRequest.getOrderStatus());

    // Map and update the list of products based on the request
    Set<Product> productSet = getUpdatedProductSet(updateAdminOrderRequest.getProductIds());
    existingAdminOrder.setProducts(productSet);

    existingAdminOrder.setOrderTimestamp(updateAdminOrderRequest.getOrderTimestamp());
    existingAdminOrder.setQuantity(updateAdminOrderRequest.getQuantity());
    existingAdminOrder.setUnitPrice(updateAdminOrderRequest.getUnitPrice());
    existingAdminOrder.setSubtotal(updateAdminOrderRequest.getSubtotal());
    existingAdminOrder.setShippingCost(updateAdminOrderRequest.getShippingCost());
    existingAdminOrder.setTotalAmount(updateAdminOrderRequest.getTotalAmount());
    existingAdminOrder.setShippingAddress(updateAdminOrderRequest.getShippingAddress());
    existingAdminOrder.setBillingAddress(updateAdminOrderRequest.getBillingAddress());
    existingAdminOrder.setPaymentType(updateAdminOrderRequest.getPaymentType());
    existingAdminOrder.setPaymentStatus(updateAdminOrderRequest.getPaymentStatus());
    existingAdminOrder.setDeliveryDate(updateAdminOrderRequest.getDeliveryDate());
    existingAdminOrder.setSpecialInstructions(updateAdminOrderRequest.getSpecialInstructions());
    existingAdminOrder.setOrderNotes(updateAdminOrderRequest.getOrderNotes());
    existingAdminOrder.setTrackingNumber(updateAdminOrderRequest.getTrackingNumber());
  }
}
