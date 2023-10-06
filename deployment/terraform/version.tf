terraform {
  required_version = "~>1.2.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>5.0"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = var.aws_region
}

terraform {
  backend "s3" {
    bucket = "test-state-file-storage"
    key    = "terraform.tfstate"
    region = "ap-south-1"
  }
}