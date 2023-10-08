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


resource "aws_instance" "aws_demo_instance" {
  ami                  = data.aws_ami.amzlinux.id
  instance_type        = var.instance_type
  key_name             = var.key_pair
  security_groups      = [aws_security_group.instance_sg.name, aws_security_group.instance_ssh.name]
  user_data            = file("./app.install.sh")
  iam_instance_profile = aws_iam_instance_profile.s3_access_instance_profile.name

  # ebs_block_device { // by default ebs volume is configured in ami level so this config might create additional resource
  #   device_name           = "/dev/sdf"
  #   volume_type           = "gp3"
  #   volume_size           = 8
  #   delete_on_termination = true
  # }

  tags = {
    "Name" : "Test Ec2 machine"
    "workspace" : "${terraform.workspace}-workspace"
  }
}

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
