package com.project.abicoirr.repository;

import com.project.abicoirr.entity.ProductImage;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends AbstractRepository<ProductImage> {

  Optional<ProductImage> findByImageKey(String key);
}
