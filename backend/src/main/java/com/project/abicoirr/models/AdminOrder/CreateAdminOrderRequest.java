package com.project.abicoirr.models.AdminOrder;

import com.project.abicoirr.entity.AdminOrder;
import com.project.abicoirr.entity.AdminOrder.OrderStatus;
import com.project.abicoirr.entity.AdminOrder.PaymentStatus;
import com.project.abicoirr.entity.AdminOrder.PaymentType;
import com.project.abicoirr.entity.Product;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAdminOrderRequest {
  @NotNull private Long userId;

  @NotNull private OrderStatus orderStatus;

  @NotEmpty private List<Long> productIds;

  private LocalDateTime orderTimestamp; // TODO: do we need this

  @NotNull private int quantity;

  @NotNull private BigDecimal unitPrice;

  @NotNull private BigDecimal subtotal;

  @NotNull private BigDecimal shippingCost;

  @NotNull private BigDecimal totalAmount;

  @NotNull private String shippingAddress;

  @NotNull private String billingAddress;

  @NotNull private PaymentType paymentType;

  @NotNull private PaymentStatus paymentStatus;

  @NotNull private LocalDateTime deliveryDate;

  @NotNull private String specialInstructions;

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
