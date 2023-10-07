output "AMI_ID" {
  value = data.aws_ami.amzlinux.id
}

output "instanceDetails" {
  description = "Launched instance details"
  value       = aws_instance.aws_demo_instance.public_dns
}
