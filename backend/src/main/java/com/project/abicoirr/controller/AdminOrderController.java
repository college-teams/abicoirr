package com.project.abicoirr.controller;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.AdminOrder.AdminOrderResponse;
import com.project.abicoirr.models.AdminOrder.CreateAdminOrderRequest;
import com.project.abicoirr.models.AdminOrder.UpdateAdminOrderRequest;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.AdminOrderService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin-orders")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class AdminOrderController {

  private final AdminOrderService adminOrderService;

  @GetMapping("/")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<List<AdminOrderResponse>>> getAdminOrderList() {
    return new ResponseEntity<>(adminOrderService.getAdminOrderList(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<AdminOrderResponse>> getAdminOrder(@PathVariable Long id)
      throws BaseException {
    return new ResponseEntity<>(adminOrderService.getAdminOrder(id), HttpStatus.OK);
  }

  @PostMapping("/")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<AdminOrderResponse>> addAdminOrder(
      @Valid @RequestBody CreateAdminOrderRequest createAdminOrderRequest) throws BaseException {
    return new ResponseEntity<>(
        adminOrderService.addAdminOrder(createAdminOrderRequest), HttpStatus.OK);
  }

  @PutMapping("/{id}")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<AdminOrderResponse>> UpdateAdminOrder(
      @PathVariable Long id, @Valid @RequestBody UpdateAdminOrderRequest updateAdminOrderRequest)
      throws BaseException {
    return new ResponseEntity<>(
        adminOrderService.updateAdminOrder(id, updateAdminOrderRequest), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse> deleteAdminOrder(@PathVariable Long id) throws BaseException {
    return new ResponseEntity<>(adminOrderService.deleteAdminOrder(id), HttpStatus.OK);
  }

  @GetMapping("/adminorder-count")
  public ResponseEntity<ApiResponse<Map<String, Integer>>> getOrderCountByMonth()
      throws BaseException {
    return new ResponseEntity<>(adminOrderService.getOrderCountByMonth(), HttpStatus.OK);
  }
}
