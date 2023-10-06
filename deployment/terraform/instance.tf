resource "aws_instance" "aws_demo_instance" {
  ami             = data.aws_ami.amzlinux.id
  instance_type   = var.instance_type
  key_name        = var.key_pair
  security_groups = [aws_security_group.instance_sg.name, aws_security_group.instance_ssh.name]

  tags = {
    "Name" : "Test Ec2 machine"
  }
}