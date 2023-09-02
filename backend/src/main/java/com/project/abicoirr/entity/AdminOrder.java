package com.project.abicoirr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminOrder extends CommonEntity {

  //  TODO: MAP user entity here
  private Long userId;

  @Enumerated(EnumType.STRING)
  @Column(name = "order_status", nullable = false)
  private OrderStatus orderStatus;

  @ManyToMany
  @JoinTable(
      name = "order_product",
      joinColumns = @JoinColumn(name = "order_id"),
      inverseJoinColumns = @JoinColumn(name = "product_id"))
  private Set<Product> products = new HashSet<>();

  @Column(name = "order_timestamp", nullable = false)
  private LocalDateTime orderTimestamp;

  @Column(name = "quantity", nullable = false)
  private int quantity;

  @Column(name = "unit_price", nullable = false)
  private BigDecimal unitPrice;

  @Column(name = "subtotal", nullable = false)
  private BigDecimal subtotal;

  @Column(name = "shipping_cost", nullable = false)
  private BigDecimal shippingCost;

  @Column(name = "total_amount", nullable = false)
  private BigDecimal totalAmount;

  @Column(name = "shipping_address", columnDefinition = "TEXT", nullable = false)
  private String shippingAddress;

  @Column(name = "billing_address", columnDefinition = "TEXT", nullable = false)
  private String billingAddress;

  @Enumerated(EnumType.STRING)
  @Column(name = "payment_type", nullable = false)
  private PaymentType paymentType;

  @Enumerated(EnumType.STRING)
  @Column(name = "payment_status", nullable = false)
  private PaymentStatus paymentStatus;

  @Column(name = "delivery_date", nullable = false)
  private LocalDateTime deliveryDate;

  @Column(name = "special_instructions", columnDefinition = "TEXT")
  private String specialInstructions;

  @Column(name = "order_notes", columnDefinition = "TEXT")
  private String orderNotes;

  @Column(name = "tracking_number", nullable = false)
  private String trackingNumber;

  @AllArgsConstructor
  public static enum OrderStatus {
    PENDING("pending"),
    PROCESSED("processed"),
    SHIPPED("shipped"),
    DELIVERED("delivered"),
    CANCELLED("cancelled");

    private final String value;

    public String getValue() {
      return value;
    }
  }

  @AllArgsConstructor
  public static enum PaymentType {
    CREDIT_CARD("credit_card"),
    DEBIT_CARD("debit_card"),
    NET_BANKING("net_banking"),
    CASH_ON_DELIVERY("cash_on_delivery");

    private final String value;

    public String getValue() {
      return value;
    }
  }

  @AllArgsConstructor
  public static enum PaymentStatus {
    PENDING("pending"),
    PAID("paid"),
    FAILED("failed"),
    REFUNDED("refunded");

    private final String value;

    public String getValue() {
      return value;
    }
  }
}
