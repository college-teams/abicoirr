output "AMI_ID" {
  value = data.aws_ami.amzlinux.id
}

# output "instanceDetails" {
#   description = "Launched instance details"
#   value       = aws_instance.aws_demo_instance.public_dns
# }

output "lb_dns_name" {
  description = "Load balancer dns"
  value       = aws_lb.instance_lb.dns_name
}

output "db-hostname" {
  description = "Db host name"
  value       = aws_db_instance.mysql_db.address
}

output "db-username" {
  description = "Db username name"
  value       = aws_db_instance.mysql_db.username
}

output "db-password" {
  description = "Db password name"
  value       = aws_db_instance.mysql_db.password
  sensitive   = true
}