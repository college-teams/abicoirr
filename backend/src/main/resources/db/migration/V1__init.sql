CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `version` bigint NOT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `is_account_verified` bit(1) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_validity_timestamp` bigint DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `version` bigint NOT NULL,
  `category_description` longtext NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `image_key` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `contact_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `version` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `message` longtext NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `version` bigint  NOT NULL,
  `avg_rating` float DEFAULT 0,
  `discount_percent` float DEFAULT 0,
  `max_order` int NOT NULL DEFAULT 0,
  `min_order` int NOT NULL DEFAULT 0,
  `product_description` longtext NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `stock_quantity` int NOT NULL  DEFAULT 0,
  `category_id` bigint DEFAULT NULL  DEFAULT 0,
  `view_count` bigint NOT NULL DEFAULT 0,
  `actual_price` float NOT NULL  DEFAULT 0,
  `selling_price` float NOT NULL  DEFAULT 0,
   PRIMARY KEY (`id`),
   KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
   CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `external_links` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `version` bigint NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `platform_name` enum('AMAZON','FLIPKART','MEESHO','OTHER') NOT NULL,
  `product_id` bigint DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `product_id` (`product_id`),
   CONSTRAINT `external_links_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
   CONSTRAINT `external_links_chk_1` CHECK ((`platform_name` between 0 and 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `version` bigint NOT NULL,
  `image_key` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `is_primary` bit(1) DEFAULT NULL,
  `product_id` bigint NOT NULL,
   PRIMARY KEY (`id`),
   KEY `product_id` (`product_id`),
   CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `admin_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `version` bigint NOT NULL,
  `billing_address` text NOT NULL,
  `delivery_date` datetime(6) NOT NULL,
  `order_notes` text DEFAULT NULL,
  `order_status` enum('CANCELLED','DELIVERED','PENDING','PROCESSED','SHIPPED') NOT NULL,
  `order_timestamp` datetime(6) NOT NULL,
  `payment_status` enum('FAILED','PAID','PENDING','REFUNDED') NOT NULL,
  `payment_type` enum('CASH_ON_DELIVERY','CREDIT_CARD','DEBIT_CARD','NET_BANKING') NOT NULL,
  `quantity` int NOT NULL DEFAULT 0,
  `shipping_address` text NOT NULL,
  `shipping_cost` decimal(38,2) NOT NULL DEFAULT 0,
  `special_instructions` text DEFAULT NULL,
  `subtotal` decimal(38,2) NOT NULL DEFAULT 0,
  `total_amount` decimal(38,2) NOT NULL DEFAULT 0,
  `tracking_number` varchar(255) NOT NULL,
  `unit_price` decimal(38,2) NOT NULL DEFAULT 0,
  `user_id` bigint DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `order_product` (
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
   PRIMARY KEY (`order_id`,`product_id`),
   KEY `FKhnfgqyjx3i80qoymrssls3kno` (`product_id`) ,
   CONSTRAINT `FK94kv5evti5wy7k03opfr9m9pi` FOREIGN KEY (`order_id`) REFERENCES `admin_order` (`id`) ON DELETE CASCADE,
   CONSTRAINT `FKhnfgqyjx3i80qoymrssls3kno` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
