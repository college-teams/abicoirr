import argparse
import textwrap
import os
from pathlib import Path
import subprocess
import shlex
import boto3
import paramiko

def upload_jar_to_remote(host, username, public_key_path, local_jar_path, remote_dir):
    ssh_client = paramiko.SSHClient()
    users_known_hosts = os.path.expanduser("~/.ssh/known_hosts")
    if os.path.exists(users_known_hosts):
        ssh_client.load_host_keys(users_known_hosts)
    
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy)

    try:
        print("connecting to remote host...")
        ssh_client.connect(host, username=username)
        print("connected to remote host")
        
        print("Uploading jar to the host..")
        sftp = ssh_client.open_sftp()
        
        root = Path().resolve()
        parent_directory = os.path.dirname(root)
        local_setup =  os.path.join(parent_directory, "deployment","machineImage","setup.sh")
        
        sftp.put(local_setup, f"{remote_dir}/setup.sh")  # Adjust the remote filename as needed
        ssh_client.exec_command(f"chmod +x {remote_dir}/setup.sh")
        # Run the setup script with the provided environment variable
        ssh_client.exec_command(f"cd {remote_dir} && DEPLOYMENT_ENV_NAME={'prod'} ./setup.sh")


        sftp.put(local_jar_path, f"{remote_dir}/abicoirr-0.0.1-SNAPSHOT.jar")  # Adjust the remote filename as needed
        sftp.close()
        ssh_client.close()
        print(f"JAR file uploaded successfully to {host}")
    except Exception as e:
        print(f"Error: {e}")



def upload_files_to_remote(host, username, public_key_path, local_dir, remote_dir):
    ssh_client = paramiko.SSHClient()
    users_known_hosts = os.path.expanduser("~/.ssh/known_hosts")
    if os.path.exists(users_known_hosts):
        ssh_client.load_host_keys(users_known_hosts)
    
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy)

    try:
        print(f"Connecting to remote host {host}...")
        ssh_client.connect(host, username=username)
        print(f"Connected to remote host {host}")
        
        sftp = ssh_client.open_sftp()

        for root, dirs, files in os.walk(local_dir):
            for file in files:
                local_file_path = os.path.join(root, file)
                remote_file_path = os.path.join(remote_dir, os.path.relpath(local_file_path, local_dir))
                
                print(f"Uploading {local_file_path} to {host}:{remote_file_path}")
                sftp.put(local_file_path, remote_file_path)

        sftp.close()
        ssh_client.close()
        print(f"All files uploaded successfully to {host}")
    except Exception as e:
        print(f"Error: {e}")


def get_asg_instances(asg_name, region):
    client = boto3.client('autoscaling', region_name=region)
    response = client.describe_auto_scaling_groups(AutoScalingGroupNames=[asg_name])

    instances = []
    for group in response['AutoScalingGroups']:
        for instance in group['Instances']:
            instances.append(instance['InstanceId'])
            
    return instances

def get_instance_hostnames(instance_ids, region):
    ec2_client = boto3.client('ec2', region_name=region)
    response = ec2_client.describe_instances(InstanceIds=instance_ids)

    hostnames = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            hostnames.append(instance['PublicDnsName'])
            
    return hostnames

def parse_args():
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawTextHelpFormatter,
        description=textwrap.dedent("""\
                Devops script for deploying the code to the remote machine
            """)
    )
    parser.add_argument("--environment", help="Environment you want to deploy", default="prod")
    return parser.parse_args()

def build_be(backendPath):
    print(f"Building backend from this path {backendPath}")
    maven_command = "mvn clean install -DENVIRONMENT=prod"
    run_custom_command(backendPath, maven_command)
    
def build_fe(frontendPath):
    print(f"Building frontend from this path {frontendPath}")
    maven_command = "npm run build"
    run_custom_command(frontendPath, maven_command)

def run_custom_command(directory, command):
    try:
        # Change directory to the specified path
        os.chdir(directory)

        # Run the custom Maven command
        os.system(command)

        print("Build successful")
    except subprocess.CalledProcessError as e:
        print(f"Error: Build failed with exit code {e.returncode}")


def get_backend_path(parent_directory):
    return os.path.join(parent_directory, "backend")

def get_frontend_path(parent_directory):
    return os.path.join(parent_directory, "frontend")


def main():
    args = parse_args()
    print(args.environment)
    root = Path().resolve().parent
    root_dir=os.path.dirname(root)
    
    backend_path = get_backend_path(root_dir)
    # build_be(backend_path)
    
    frontend_path = get_frontend_path(root_dir)
    # build_fe(frontend_path)
    
    print("Fetch instance host names")
    
    region = 'us-east-1'  # Replace with your desired region
    instance_ids = get_asg_instances("Instance_asg", region)
    hostnames = get_instance_hostnames(instance_ids, region)
    print(hostnames)
    
    username = 'ec2-user' # Replace with your SSH username
    public_key_path = '~/.ssh/id_rsa.pub'  # Path to your public key
    local_jar_path = os.path.join(backend_path,"target","abicoirr-0.0.1-SNAPSHOT.jar")
    remote_dir = '/etc/abicoirr-api'  # Replace with the desired remote directory

    # for host in hostnames:
    #     upload_jar_to_remote(host, username, public_key_path, local_jar_path, remote_dir)


    local_frontend_dist = os.path.join(frontend_path, "dist")
    remote_frontend_dir = '/var/www/html/'

    for host in hostnames:
        upload_files_to_remote(host, username, public_key_path, local_frontend_dist, remote_frontend_dir)


if __name__ == "__main__":
    main()
