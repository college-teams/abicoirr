resource "aws_s3_bucket" "tf_state_bucket" {
  bucket        = "abicoir-state-file"
  force_destroy = true
}
