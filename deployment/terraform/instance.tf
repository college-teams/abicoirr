data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default_vpc_subnet_ids" {
  # vpc_id = data.aws_vpc.default_vpc.id
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }

}

# Instance profile

resource "aws_iam_instance_profile" "s3_access_instance_profile" {
  role = aws_iam_role.s3_access_role.name
}

resource "aws_iam_role" "s3_access_role" {
  name = "s3_access_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "s3_access_policy" {
  name   = "s3_access_policy"
  policy = data.aws_iam_policy_document.s3_access_policy.json
}

data "aws_iam_policy_document" "s3_access_policy" {
  statement {
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:AbortMultipartUpload",
      "s3:ListMultipartUploadParts"
    ]

    effect = "Allow"

    resources = [
      aws_s3_bucket.public_bucket.arn,
    ]
  }
}

resource "aws_iam_role_policy_attachment" "s3_access_policy_attachment" {
  policy_arn = aws_iam_policy.s3_access_policy.arn
  role       = aws_iam_role.s3_access_role.name
}


# resource "aws_instance" "aws_demo_instance" {
#   ami                  = data.aws_ami.amzlinux.id
#   instance_type        = var.instance_type
#   key_name             = var.key_pair
#   security_groups      = [aws_security_group.instance_sg.name, aws_security_group.instance_ssh.name]
#   user_data            = file("./app.install.sh")
#   iam_instance_profile = aws_iam_instance_profile.s3_access_instance_profile.name

#   # ebs_block_device { // by default ebs volume is configured in ami level so this config might create additional resource
#   #   device_name           = "/dev/sdf"
#   #   volume_type           = "gp3"
#   #   volume_size           = 8
#   #   delete_on_termination = true
#   # }

#   tags = {
#     "Name" : "Test Ec2 machine"
#     "workspace" : "${terraform.workspace}-workspace"
#   }
# }

# launch template

resource "aws_launch_template" "launchTemplate" {
  name        = "Demo_launch_template"
  description = "Demo launch template test description"

  image_id      = data.aws_ami.amzlinux.id
  instance_type = var.instance_type
  key_name      = var.key_pair
  # user_data               = file("./app.install.sh")
  vpc_security_group_ids  = [aws_security_group.instance_sg.id, aws_security_group.instance_ssh.id]
  disable_api_termination = false

  iam_instance_profile {
    arn = aws_iam_instance_profile.s3_access_instance_profile.arn
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name        = "Demo asg template1"
      Environment = "Prod"
    }
  }

  block_device_mappings {
    device_name = "/dev/sda1"

    ebs {
      volume_size = 8
      volume_type = "gp2"
    }
  }

}


# Asg
resource "aws_autoscaling_group" "instance_asg" {
  name = "Instance_asg"

  launch_template {
    id      = aws_launch_template.launchTemplate.id
    version = "$Latest"
  }

  vpc_zone_identifier       = data.aws_subnets.default_vpc_subnet_ids.ids
  min_size                  = 1
  max_size                  = 2
  desired_capacity          = 1
  health_check_type         = "ELB"
  health_check_grace_period = 60

  target_group_arns = [aws_lb_target_group.instance_lb_tg.arn]

  tag {
    key                 = "Name"
    value               = "Demo Asg"
    propagate_at_launch = true
  }
}

# LB

resource "aws_lb" "instance_lb" {
  name               = "instance-lb"
  internal           = false
  load_balancer_type = "application"
  subnets            = data.aws_subnets.default_vpc_subnet_ids.ids
  security_groups    = [aws_security_group.lb_sg.id]

  enable_deletion_protection = false
  drop_invalid_header_fields = true
  tags = {
    Name        = "Instance lb"
    Environment = "prod"
  }
}

resource "aws_lb_target_group" "instance_lb_tg" {
  name        = "instance-lb-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "instance"

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
    matcher = 200
    # path                = "/"
    # port                = "traffic-port"
  }

  tags = {
    Name        = "Instance lb tg"
    Environment = "prod"
  }
}

resource "aws_lb_listener" "instance_lb_tg_listener" {
  load_balancer_arn = aws_lb.instance_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.instance_lb_tg.arn
  }
}

resource "aws_lb_listener" "instance_lb_tg_listener_ssl" {
  load_balancer_arn = aws_lb.instance_lb.arn
  port              = 443
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.instance_lb_tg.arn
  }
}

# DB config

resource "aws_db_instance" "mysql_db" {
  allocated_storage      = 10
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t2.micro"
  db_name                = "test"
  username               = "root"
  password               = "password"
  port                   = 3306
  parameter_group_name   = aws_db_parameter_group.mysql.name
  publicly_accessible    = true
  deletion_protection    = false
  multi_az               = false
  skip_final_snapshot    = true
  storage_type           = "gp2"
  identifier             = "test-db"
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  tags = {
    "Name" : "Test db"
    "workspace" : "${terraform.workspace}-workspace"
  }
}

resource "aws_db_parameter_group" "mysql" {
  name   = "test-dd-parameter-configs"
  family = "mysql8.0"

  parameter {
    name  = "max_connections"
    value = "10"
  }
}
