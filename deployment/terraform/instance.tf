resource "aws_instance" "aws_demo_instance" {
  ami             = data.aws_ami.amzlinux.id
  instance_type   = var.instance_type
  key_name        = var.key_pair
  security_groups = [aws_security_group.instance_sg.name, aws_security_group.instance_ssh.name]
  user_data       = file("./app.install.sh")

  # ebs_block_device { // by default ebs volume is configured in ami level so this config might create additional resource
  #   device_name           = "/dev/sdf"
  #   volume_type           = "gp3"
  #   volume_size           = 8
  #   delete_on_termination = true
  # }

  tags = {
    "Name" : "Test Ec2 machine"
  }
}