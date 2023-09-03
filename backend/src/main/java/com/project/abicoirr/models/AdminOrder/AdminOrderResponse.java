package com.project.abicoirr.models.AdminOrder;

import com.project.abicoirr.entity.AdminOrder;
import com.project.abicoirr.entity.Product;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
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
public class AdminOrderResponse {

  private Long userId;

  private AdminOrder.OrderStatus orderStatus;

  private Set<Product> products;

  private LocalDateTime orderTimestamp;

  private int quantity;

  private BigDecimal unitPrice;

  private BigDecimal subtotal;

  private BigDecimal shippingCost;

  private BigDecimal totalAmount;

  private String shippingAddress;

  private String billingAddress;

  private AdminOrder.PaymentType paymentType;

  private AdminOrder.PaymentStatus paymentStatus;

  private LocalDateTime deliveryDate;

  private String specialInstructions;

  private String orderNotes;

  private String trackingNumber;

  public static List<AdminOrderResponse> from(List<AdminOrder> adminOrders) {
    return adminOrders.stream().map(AdminOrderResponse::from).collect(Collectors.toList());
  }

  public static AdminOrderResponse from(AdminOrder adminOrder) {
    return AdminOrderResponse.builder()
        .billingAddress(adminOrder.getBillingAddress())
        .orderNotes(adminOrder.getOrderNotes())
        .products(adminOrder.getProducts())
        .deliveryDate(adminOrder.getDeliveryDate())
        .orderStatus(adminOrder.getOrderStatus())
        .orderTimestamp(adminOrder.getOrderTimestamp())
        .paymentType(adminOrder.getPaymentType())
        .paymentStatus(adminOrder.getPaymentStatus())
        .quantity(adminOrder.getQuantity())
        .shippingAddress(adminOrder.getShippingAddress())
        .shippingCost(adminOrder.getShippingCost())
        .specialInstructions(adminOrder.getSpecialInstructions())
        .subtotal(adminOrder.getSubtotal())
        .totalAmount(adminOrder.getTotalAmount())
        .trackingNumber(adminOrder.getTrackingNumber())
        .userId(adminOrder.getUserId())
        .unitPrice(adminOrder.getUnitPrice())
        .build();
  }
}
