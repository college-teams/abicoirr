resource "aws_s3_bucket" "tf_state_bucket" {
  bucket = "test-state-file-storage"
  force_destroy = true
}
