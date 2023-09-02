package com.project.abicoirr.models.AdminOrder;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.abicoirr.entity.AdminOrder;
import com.project.abicoirr.entity.AdminOrder.OrderStatus;
import com.project.abicoirr.entity.AdminOrder.PaymentStatus;
import com.project.abicoirr.entity.AdminOrder.PaymentType;
import com.project.abicoirr.entity.Product;
import jakarta.validation.constraints.NotEmpty;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateAdminOrderRequest {
  @NonNull private Long userId;

  @NonNull private OrderStatus orderStatus;

  @NotEmpty private List<Long> productIds;

  private LocalDateTime orderTimestamp = LocalDateTime.now();

  @NonNull private int quantity;

  @NonNull private BigDecimal unitPrice;

  @NonNull private BigDecimal subtotal;

  @NonNull private BigDecimal shippingCost;

  @NonNull private BigDecimal totalAmount;

  @NonNull private String shippingAddress;

  @NonNull private String billingAddress;

  @NonNull private PaymentType paymentType;

  @NonNull private PaymentStatus paymentStatus;

  @NonNull private LocalDateTime deliveryDate;

  @NonNull private String specialInstructions;

  private String orderNotes;

  private String trackingNumber;

  public static AdminOrder from(
      CreateAdminOrderRequest createAdminOrderRequest, List<Product> products) {
    AdminOrder adminOrder = new AdminOrder();
    adminOrder.setUserId(createAdminOrderRequest.getUserId());
    adminOrder.setOrderStatus(createAdminOrderRequest.getOrderStatus());
    adminOrder.setProducts(new HashSet<>(products));
    adminOrder.setOrderTimestamp(createAdminOrderRequest.getOrderTimestamp());
    adminOrder.setQuantity(createAdminOrderRequest.getQuantity());
    adminOrder.setUnitPrice(createAdminOrderRequest.getUnitPrice());
    adminOrder.setSubtotal(createAdminOrderRequest.getSubtotal());
    adminOrder.setShippingCost(createAdminOrderRequest.getShippingCost());
    adminOrder.setTotalAmount(createAdminOrderRequest.getTotalAmount());
    adminOrder.setShippingAddress(createAdminOrderRequest.getShippingAddress());
    adminOrder.setBillingAddress(createAdminOrderRequest.getBillingAddress());
    adminOrder.setPaymentType(createAdminOrderRequest.getPaymentType());
    adminOrder.setPaymentStatus(createAdminOrderRequest.getPaymentStatus());
    adminOrder.setDeliveryDate(createAdminOrderRequest.getDeliveryDate());
    adminOrder.setSpecialInstructions(createAdminOrderRequest.getSpecialInstructions());
    adminOrder.setOrderNotes(createAdminOrderRequest.getOrderNotes());
    adminOrder.setTrackingNumber(createAdminOrderRequest.getTrackingNumber());

    return adminOrder;
  }
}
