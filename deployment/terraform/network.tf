# Create VPC with IPv6 support
resource "aws_vpc" "my_vpc" {
  # cidr_block           = "2600:1f10::/28" # Use IPv6 CIDR block
  # enable_dns_hostnames = true
  # enable_dns_support   = true

  assign_generated_ipv6_cidr_block = true

  cidr_block = "10.0.0.0/16"
}

# Create a subnet with IPv6 support within the VPC
resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.my_vpc.id

  availability_zone = element(var.availability_zone, count.index)
  count             = length(var.availability_zone)

  ipv6_cidr_block = cidrsubnet(aws_vpc.my_vpc.ipv6_cidr_block, 4, count.index)

  map_public_ip_on_launch         = false # No public IP for IPv4
  assign_ipv6_address_on_creation = true
  cidr_block                      = cidrsubnet(aws_vpc.my_vpc.cidr_block, 4, count.index)
}

resource "aws_db_subnet_group" "example" {
  name       = "example-subnet-group"
  subnet_ids = aws_subnet.public_subnet.*.id

  tags = {
    Name = "example-subnet-group"
  }
}

resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
}

resource "aws_default_route_table" "public_route_table" {
  default_route_table_id = aws_vpc.my_vpc.default_route_table_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.my_igw.id
  }
}

resource "aws_route_table_association" "public_subnet_association" {
  route_table_id = aws_default_route_table.public_route_table.id

  count     = length(var.availability_zone)
  subnet_id = element(aws_subnet.public_subnet.*.id, count.index)
}

# -----------------------------------

# resource "aws_vpc" "my_vpc" {
#   enable_dns_support               = true
#   enable_dns_hostnames             = true
#   assign_generated_ipv6_cidr_block = true
#   cidr_block                       = "10.0.0.0/16"

#   tags = {
#     Name = "My-vpc"
#   }
# }

# resource "aws_subnet" "public_subnet" {
#   vpc_id     = aws_vpc.my_vpc.id
#   cidr_block = cidrsubnet(aws_vpc.my_vpc.cidr_block, 4, count.index)

#   map_public_ip_on_launch = false
#   availability_zone       = element(var.availability_zone, count.index)
#   count                   = length(var.availability_zone)

#   // Adjust the prefix length for IPv6 CIDR block
#   ipv6_cidr_block                 = cidrsubnet(aws_vpc.my_vpc.ipv6_cidr_block, 4, count.index)
#   assign_ipv6_address_on_creation = true
# }

# resource "aws_db_subnet_group" "example" {
#   name       = "example-subnet-group"
#   subnet_ids = aws_subnet.public_subnet.*.id

#   tags = {
#     Name = "example-subnet-group"
#   }
# }


# # -------------------------------------------------

# # Create VPC
# # resource "aws_vpc" "my_vpc" {
# #   cidr_block           = "10.0.0.0/16"
# #   enable_dns_hostnames = true
# #   enable_dns_support   = true

# #   tags = {
# #     Name = "My-vpc"
# #   }
# # }

# # Create public subnet
# # resource "aws_subnet" "public_subnet" {
# #   vpc_id            = aws_vpc.my_vpc.id
# #   cidr_block        = "10.0.${count.index}.0/24"
# #   availability_zone = element(var.availability_zone, count.index)

# #   count = length(var.availability_zone)

# #   map_public_ip_on_launch = true
# # }


# # Create an Internet Gateway
# # resource "aws_internet_gateway" "my_igw" {
# #   vpc_id = aws_vpc.my_vpc.id
# # }

# # Create a route table for public subnet
# # resource "aws_route_table" "public_route_table" {
# #   vpc_id = aws_vpc.my_vpc.id

# #   route {
# #     cidr_block = "0.0.0.0/0"
# #     gateway_id = aws_internet_gateway.my_igw.id
# #   }
# # }

# # # Associate the public subnet with the public route table
# # resource "aws_route_table_association" "public_subnet_association" {
# #   count          = length(var.availability_zone)
# #   subnet_id      = element(aws_subnet.public_subnet.*.id, count.index)
# #   route_table_id = aws_route_table.public_route_table.id
# # }


# # resource "aws_db_subnet_group" "example" {
# #   name       = "example-subnet-group"
# #   subnet_ids = aws_subnet.public_subnet.*.id

# #   tags = {
# #     Name = "example-subnet-group"
# #   }
# # }

# # Attach Internet Gateway to VPC
# # resource "aws_vpc_attachment" "my_vpc_attachment" {
# #   vpc_id           = aws_vpc.my_vpc.id
# #   internet_gateway = aws_internet_gateway.my_igw.id
# # }


