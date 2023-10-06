variable "aws_region" {
  description = "Region in which aws resource are running"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "Ec2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_pair" {
  description = "Aws Ec2 key pair that need to be associated with instance"
  type        = string
  default     = "test-key"
}