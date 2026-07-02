export interface RoadmapItem {
  name: string;
  detailTitle: string;
  explanation: string;
  commands: string[];
  relatedLabId?: string;
  relatedTopicId?: string;
}

export interface RoadmapStage {
  title: string;
  difficulty: string;
  items: RoadmapItem[];
}

export interface Topic {
  id: string;
  name: string;
  difficulty: string;
  desc: string;
  subtopics: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  level: string;
  link: string;
  github: string;
}

export interface Lab {
  id: string;
  title: string;
  duration: string;
  tool: string;
  description: string;
  completed: boolean;
  steps: string[];
}

export interface InterviewQA {
  q: string;
  a: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface ResourceLink {
  name: string;
  url: string;
}

export interface ResourceCategory {
  title: string;
  links: ResourceLink[];
}

export interface BestPracticeItem {
  title: string;
  rationale: string;
  recommendation: string;
  example: string;
  category: string;
}

export const roadmap: RoadmapStage[] = [
  {
    title: "1. Prerequisites & Fundamentals",
    difficulty: "Beginner",
    items: [
      {
        name: "Linux Operating System: Kernel basics, Unix directory structure, file management, permissions",
        detailTitle: "Linux OS Foundations",
        explanation: "Linux is the cornerstone of DevOps and cloud computing. Most servers, containers, and pipelines run on Linux distributions. You must understand kernel vs user space, the standard filesystem hierarchy (FHS), and ownership models (users, groups, read/write/execute permissions).",
        commands: [
          "ls -la          # List all files with ownership and permissions",
          "chmod 755 s.sh  # Grant owner rwx, others rx permissions",
          "chown root:root # Change owner and group to root",
          "df -h           # Check system disk space utilization",
          "free -m          # Check memory statistics in megabytes",
          "ps aux          # Print all running system processes"
        ],
        relatedTopicId: "linux"
      },
      {
        name: "Essential Shell Commands: grep, awk, sed, find, tar, rsync, htop, curl, wget, systemctl, journalctl",
        detailTitle: "Linux Shell Utilities",
        explanation: "Command line proficiency is essential for debugging, writing automation, and managing files. You must master text processing engines (grep, awk, sed), file find tools, archive utilities (tar), service controllers (systemctl), and log inspection (journalctl).",
        commands: [
          "grep -r 'ERROR' /var/log/  # Search files recursively for pattern",
          "awk '{print $1, $9}' access.log # Print columns from structured text",
          "sed -i 's/foo/bar/g' file.txt   # Inline replace occurrences",
          "find / -name '*.log' -size +10M # Search files by criteria",
          "systemctl status nginx          # Check status of system service",
          "journalctl -u nginx -f          # Tail log files of target unit"
        ],
        relatedTopicId: "linux"
      },
      {
        name: "Computer Networking: OSI model layers, TCP/UDP protocols, DNS resolution process, IP addressing",
        detailTitle: "Networking & DNS Basics",
        explanation: "Workloads must talk to each other. DevOps engineers require a solid understanding of how packets flow. You must know IP addressing, routing tables, DNS resolution, port forwarding, NAT gateways, and load balancer rules.",
        commands: [
          "ping google.com                # Test internet connectivity to host",
          "dig A google.com               # Query DNS server for IP records",
          "ss -tlnp                       # List listening TCP sockets with PIDs",
          "curl -I https://localhost      # Inspect remote service HTTP headers",
          "tcpdump -i eth0 port 80        # Capture and display network packets"
        ],
        relatedTopicId: "cloud"
      },
      {
        name: "Git Version Control: commits, branching strategies (GitFlow), rebasing, cherry-picking, hooks",
        detailTitle: "Version Control Systems (Git)",
        explanation: "Git acts as the single source of truth for applications and infrastructure code. You must learn branching models (Trunk-based vs GitFlow), rebase operations (clearing commit history), cherry-picking (applying specific fixes), and pre-commit hooks for automated code linting.",
        commands: [
          "git checkout -b feature/auth # Create and shift to a new branch",
          "git commit -s -m 'Fix auth'  # Commit changes with GPG/user sign-off",
          "git rebase main              # Re-apply commits on top of main branch",
          "git cherry-pick a1b2c3d      # Apply a specific commit to current HEAD",
          "git branch -D feature/auth   # Force delete local branch"
        ],
        relatedTopicId: "git"
      }
    ]
  },
  {
    title: "2. Scripting & Automation",
    difficulty: "Beginner",
    items: [
      {
        name: "Bash Scripting: Variables, loops, conditionals, exit status codes, standard input/output redirection",
        detailTitle: "Bash Shell Scripting",
        explanation: "Shell scripts automate system operations, configure environments, and run pipeline steps. Learn shebang declarations, command status evaluation, loops, conditional gates, and stdout/stderr file redirects.",
        commands: [
          "#!/bin/bash                      # Shebang header to target interpreter",
          "if [ $? -eq 0 ]; then            # Test exit code of last command",
          "cat file.txt | grep 'alert'      # Pipeline commands redirect output",
          "for f in *.log; do echo $f; done # Loop through matching filenames",
          "command > out.log 2>&1           # Merge stderr into stdout file"
        ],
        relatedLabId: "bash-monitoring",
        relatedTopicId: "linux"
      },
      {
        name: "Automation Fundamentals: Automating daily tasks, backup scripts, system health monitoring, cron jobs",
        detailTitle: "Automation & Cron Jobs",
        explanation: "Scheduled automations keep systems clean. Cron jobs run scripts (e.g. database dumps, log rotations) at predefined intervals.",
        commands: [
          "crontab -e                    # Edit current user's cron schedule",
          "*/5 * * * * /path/to/script.sh # Run script every 5 minutes",
          "0 0 * * 0 /path/to/backup.sh   # Run backup script weekly on Sunday"
        ],
        relatedLabId: "bash-monitoring",
        relatedTopicId: "linux"
      },
      {
        name: "Python for DevOps: Using subprocess, OS module, requests library for API calls, parsing JSON/YAML",
        detailTitle: "Python Automation",
        explanation: "For complex automation logic where Bash gets unwieldy, Python is the industry favorite. Use the standard OS and Subprocess modules, fetch metrics from REST APIs using requests, and parse configs in JSON/YAML.",
        commands: [
          "import os, subprocess          # Import system operation modules",
          "res = requests.get('api/url')  # Query HTTP REST endpoint",
          "data = json.loads(res.text)    # Parse JSON response to dictionary",
          "subprocess.run(['ls', '-l'])   # Execute raw binary commands"
        ],
        relatedTopicId: "linux"
      }
    ]
  },
  {
    title: "3. Operating Systems & Containers",
    difficulty: "Intermediate",
    items: [
      {
        name: "Docker Core Concepts: Namespaces, cgroups, Union File System (overlay2), container virtualization",
        detailTitle: "Containerization Core Concepts",
        explanation: "Docker isolates processes. It doesn't run a virtual hypervisor. Instead, it utilizes Linux kernel namespaces (PID, NET, Mount, IPC) for isolation, cgroups for resources ceiling, and overlay2 storage drivers for copy-on-write image layers.",
        commands: [
          "docker run -d -p 80:80 nginx  # Run container, map host port",
          "docker inspect my-container   # Display low-level metadata json",
          "docker stats                  # Stream live container resources usage",
          "docker system prune -a        # Clean all dangling containers & images"
        ],
        relatedLabId: "docker-nginx",
        relatedTopicId: "docker"
      },
      {
        name: "Optimized Dockerfiles: Multi-stage builds, reducing image layers, choosing secure base images, caching",
        detailTitle: "Writing Optimized Dockerfiles",
        explanation: "Clean Dockerfiles build lightweight, secure containers. Separate build tools (compilers, npm cache) from the final execution runtime. Choose alpine or distroless base images to minimize host vulnerabilities.",
        commands: [
          "FROM golang:alpine AS builder # Use rich image for compiling",
          "FROM alpine:latest            # Use minimal runtime image for execution",
          "COPY --from=builder /bin/app  # Import only final compiled artifacts",
          "USER appuser                  # Drop root permissions for safety"
        ],
        relatedLabId: "docker-nginx",
        relatedTopicId: "docker"
      },
      {
        name: "Container Management: Docker Volumes, Docker Bridge/Overlay Networking, Compose configuration",
        detailTitle: "Docker Compose & Networking",
        explanation: "Manage multiple services locally. Docker Compose orchestrates multi-container applications (app, database, cache) with local networking bridges, shared environment configurations, and volume mappings.",
        commands: [
          "docker compose up -d          # Boot all services in background",
          "docker compose down -v        # Terminate services and drop volumes",
          "docker compose logs -f web    # Tail outputs of specific service"
        ],
        relatedTopicId: "docker"
      }
    ]
  },
  {
    title: "4. Cloud Providers & Infrastructure",
    difficulty: "Intermediate",
    items: [
      {
        name: "Cloud Fundamentals: Compute instances (EC2), Object Storage (S3), IAM roles & policies, VPC networking",
        detailTitle: "Cloud Infrastructure (AWS)",
        explanation: "Cloud computing hosts modern application architectures. Master virtual private networks (VPCs), subnets, routing tables, security group access blocks, S3 bucket configurations, and granular IAM user/role policies.",
        commands: [
          "aws sts get-caller-identity        # Verify active IAM credentials",
          "aws s3 ls s3://my-bucket/          # List objects stored inside bucket",
          "aws ec2 describe-instances         # Fetch status of cloud instances"
        ],
        relatedTopicId: "cloud"
      },
      {
        name: "Infrastructure as Code: Declaring infrastructure with Terraform, HCL syntax, resource state management",
        detailTitle: "Terraform Infrastructure as Code",
        explanation: "IaC manages cloud environments safely. Terraform parses declarative HCL configuration files and compiles an execution graph. The state file tracks deployed infrastructure resources; locks prevent simultaneous edits.",
        commands: [
          "terraform init                # Initialize backend and plugins",
          "terraform plan                # Dry-run execution changes preview",
          "terraform apply -auto-approve # Create and update cloud resources",
          "terraform destroy             # Tear down all managed assets"
        ],
        relatedLabId: "terraform-vpc",
        relatedTopicId: "iac"
      },
      {
        name: "Configuration Management: Idempotency, writing Ansible Playbooks, inventory layout, role organization",
        detailTitle: "Ansible Configuration Engine",
        explanation: "Configure deployed servers automatically. Ansible runs agentless over SSH to configure settings, verify user permissions, install packages, and manage files idempotently (applying changes only if needed).",
        commands: [
          "ansible all -m ping             # Test server connection and access",
          "ansible-playbook -i inv playbook.yml # Run playbook tasks list",
          "ansible-galaxy install -r reqs.yml   # Retrieve community roles"
        ],
        relatedLabId: "ansible-hardening",
        relatedTopicId: "iac"
      }
    ]
  },
  {
    title: "5. CI/CD & Automation Pipelines",
    difficulty: "Advanced",
    items: [
      {
        name: "Pipeline Tools: Designing declarative Jenkins pipelines (Jenkinsfile), building GitHub Actions workflows",
        detailTitle: "CI/CD Pipeline Automation",
        explanation: "Continuous Integration automates code compiling, security linting, and unit tests on commits. Continuous Deployment builds images and automates rolling upgrades to staging and production environments.",
        commands: [
          "pipeline { agent any ... }     # Declare Jenkins pipeline block",
          "on: [push, pull_request]       # Declare Github Action event hook",
          "uses: actions/checkout@v3     # Trigger reusable workspace action"
        ],
        relatedLabId: "jenkins-pipeline",
        relatedTopicId: "cicd"
      },
      {
        name: "GitOps Operations: Declarative configuration sync using ArgoCD, helm chart deployments, tracking drift",
        detailTitle: "GitOps with ArgoCD",
        explanation: "GitOps deploys applications declaratively. Developers check Kubernetes manifests into a Git repository. ArgoCD runs in the cluster, detects when Git differs from cluster state, and automatically syncs the changes.",
        commands: [
          "argocd app create web-app ... # Register new GitOps synchronization",
          "argocd app sync web-app       # Force drift reconciliation loop",
          "argocd app get web-app        # Display synchronization details"
        ],
        relatedTopicId: "cicd"
      }
    ]
  },
  {
    title: "6. Container Orchestration",
    difficulty: "Advanced",
    items: [
      {
        name: "Kubernetes Architecture: Control Plane (apiserver, etcd, scheduler) and Worker Nodes (kubelet, kube-proxy)",
        detailTitle: "Kubernetes Architecture",
        explanation: "Kubernetes manages microservice containers. The Control Plane runs the api-server, etcd (key-value store), scheduler (places pods), and controller-manager (checks health). Worker nodes run the kubelet agent and kube-proxy network routing handler.",
        commands: [
          "kubectl cluster-info          # Display active control plane endpoints",
          "kubectl get nodes             # List worker nodes and status",
          "kubectl describe node worker-1 # Inspect node resources and capacity"
        ],
        relatedTopicId: "kubernetes"
      },
      {
        name: "Core Resources: Pods, Deployments, ReplicaSets, DaemonSets, StatefulSets, Job/CronJobs configurations",
        detailTitle: "Kubernetes Core Resources",
        explanation: "Kubernetes utilizes API objects: Pods are the smallest deployable units. Deployments run replica sets for stateless apps. StatefulSets run databases with stable storage identities. DaemonSets run logging agents on every node.",
        commands: [
          "kubectl apply -f deployment.yaml # Provision defined API resources",
          "kubectl get pods -n production   # List active application instances",
          "kubectl logs deployment/web-app  # Stream logs of replica group",
          "kubectl scale deployment/web --replicas=5 # Scale application count"
        ],
        relatedLabId: "k8s-deploy",
        relatedTopicId: "kubernetes"
      },
      {
        name: "K8s Networking: Services (ClusterIP, NodePort, LoadBalancer), Ingress controllers, CoreDNS routing",
        detailTitle: "Kubernetes Networking",
        explanation: "Pods are ephemeral and get new IPs when restarted. Services provide a stable IP/DNS entry (ClusterIP for internal, NodePort/LoadBalancer for external exposure). Ingress Controllers (like Nginx) manage path-based domain routing.",
        commands: [
          "kubectl get svc                    # List cluster virtual IPs",
          "kubectl expose deployment/web --port=8080 # Expose container port",
          "kubectl describe ingress main-path # Verify domain routing maps"
        ],
        relatedLabId: "k8s-deploy",
        relatedTopicId: "kubernetes"
      }
    ]
  },
  {
    title: "7. Monitoring, Observability & Tuning",
    difficulty: "Expert",
    items: [
      {
        name: "Observability Stack: Deploying Prometheus server, scraping metrics, Grafana visualization dashboards",
        detailTitle: "Prometheus & Grafana Observability",
        explanation: "Observability answers why applications are slow or crashing. Prometheus pulls time-series performance metrics from servers and microservices. Grafana queries Prometheus using PromQL to build dashboards.",
        commands: [
          "prometheus --config.file=config # Boot Prometheus metrics scraper",
          "rate(http_requests_total[5m])   # PromQL expression to calculate RPS",
          "node_memory_Active_bytes        # Fetch active host memory metrics"
        ],
        relatedLabId: "prometheus-alerting",
        relatedTopicId: "monitoring"
      },
      {
        name: "Incident Alerting: Alertmanager integration, alert routing, threshold rules tuning, notifications",
        detailTitle: "Alerting & Incident Response",
        explanation: "Alertmanager handles alert lifecycles triggered by Prometheus rules. It deduplicates alerts, silences redundant triggers, and dispatches pages to Slack, email, or PagerDuty.",
        commands: [
          "amtool check-config alert.yml  # Verify Alertmanager config syntax",
          "kubectl get prometheusrules    # View Kubernetes alerting rules"
        ],
        relatedLabId: "prometheus-alerting",
        relatedTopicId: "monitoring"
      }
    ]
  }
];

export const topics: Topic[] = [
  {
    id: "linux",
    name: "Linux & OS Essentials",
    difficulty: "Beginner",
    desc: "The absolute foundation of DevOps. Learn system architecture, systemd daemons, process tree management, memory/CPU statistics monitoring, and standard shell utilities.",
    subtopics: ["Bash Scripting & Automation", "Systemd Services & Unit files", "File System Hierarchy & Permissions", "Process Management (ps, top, kill, nice)", "Package Management (apt, yum, dnf)"]
  },
  {
    id: "git",
    name: "Git & Collaboration",
    difficulty: "Beginner",
    desc: "Source code is the single source of truth. Master branching strategies, pull request processes, merge conflicts resolution, commit signing, and Git hooks automation.",
    subtopics: ["GitFlow & Trunk-Based Development", "Cherry-Picking & Rebasing", "Git Hooks & Pre-commit validation", "GitHub and GitLab Workflows", "SSH & GPG authentication key configurations"]
  },
  {
    id: "docker",
    name: "Docker & Containerization",
    difficulty: "Intermediate",
    desc: "Standardize application runs. Master overlay filesystems, namespaces isolation, container network bridges, multi-stage Dockerfiles, and image registry deployments.",
    subtopics: ["Multi-Stage Dockerfile Compilation", "Docker Compose Orchestration", "Overlay2 Storage Engine", "Image Security Scanning & Hardening", "Namespaces & Cgroups kernel features"]
  },
  {
    id: "kubernetes",
    name: "Kubernetes Orchestration",
    difficulty: "Advanced",
    desc: "Scale microservices. Master cluster scheduling, networking specifications, config management, auto-scaling configurations, helm deployments, and cluster upgrades.",
    subtopics: ["Pods, Deployments & DaemonSets", "Ingress Controllers & Service Routing", "ConfigMaps & SealedSecrets", "Horizontal/Vertical Pod Autoscaler", "Helm Charts & Custom Resources (CRDs)"]
  },
  {
    id: "cicd",
    name: "CI/CD & GitOps Automation",
    difficulty: "Intermediate",
    desc: "Deploy code securely. Learn declarative Jenkins pipelines, GitHub Actions workflows, ArgoCD GitOps pipelines, build gates, validation suites, and deployment strategies.",
    subtopics: ["Declarative Jenkinsfile & Shared Libraries", "GitHub Actions & Reusable Workflows", "ArgoCD & GitOps Pull-based CD", "Canary & Blue-Green Deployments", "Artifact Repositories (Nexus/JFrog)"]
  },
  {
    id: "iac",
    name: "Infrastructure as Code (IaC)",
    difficulty: "Intermediate",
    desc: "Declare infrastructure. Master Terraform state lifecycle, remote locking with DynamoDB, variables/outputs, Ansible configuration playbooks, and server configurations.",
    subtopics: ["Terraform HCL & State locking", "Terraform Modules & Registry", "Ansible Playbooks & Idempotency", "Ansible Roles & Galaxy integrations", "Packer Image Generation"]
  },
  {
    id: "monitoring",
    name: "Monitoring & Observability",
    difficulty: "Advanced",
    desc: "Gain deep insights into workloads. Set up PromQL scrapers, Alertmanager triggers, Kibana/Fluentd centralized logs, distributed Jaeger traces, and status dashboards.",
    subtopics: ["Prometheus TSDB & Exporters", "Grafana Visualization Dashboards", "ELK / EFK Logging Stack", "Alertmanager Slack & Mail triggers", "Distributed Tracing (APM)"]
  },
  {
    id: "cloud",
    name: "Cloud Architecture (AWS)",
    difficulty: "Advanced",
    desc: "Leverage global virtual infrastructure. Master VPC subnets, route tables, IAM authentication roles, Application Load Balancers, Route53, and serverless compute.",
    subtopics: ["VPC Subnets, NAT & Route Tables", "IAM Policy & Role-Based Permissions", "Auto Scaling & Application Load Balancers", "S3 Storage & CloudFront CDN", "AWS EKS (Elastic Kubernetes Service)"]
  }
];

export const projects: Project[] = [
  {
    title: "End-to-End GitOps Pipeline",
    description: "A complete production-grade CI/CD pipeline using GitHub Actions to compile a microservices app, test dependencies, build optimized Docker images, and push them to ECR. ArgoCD continuously monitors a configuration repository and deploys manifests into an AWS EKS cluster with zero-downtime rolling updates.",
    tags: ["Kubernetes", "ArgoCD", "GitHub Actions", "Docker", "AWS EKS", "ECR"],
    level: "Advanced",
    link: "https://demo.devops.jatinsharma.com/gitops",
    github: "https://github.com/devops-jatin/gitops-pipeline"
  },
  {
    title: "AWS Infrastructure as Code",
    description: "Modular Terraform configurations to provision a highly available, multi-AZ VPC architecture with public/private subnets, NAT gateways, ALB, auto-scaling EC2 instances, and RDS databases. Secure remote state storage in an S3 bucket with state locking managed by DynamoDB tables.",
    tags: ["Terraform", "AWS", "VPC", "EC2", "RDS", "DynamoDB"],
    level: "Intermediate",
    link: "https://demo.devops.jatinsharma.com/aws-vpc",
    github: "https://github.com/devops-jatin/aws-terraform-vpc"
  },
  {
    title: "K8s Observability Stack",
    description: "Automated deployment of Prometheus and Grafana onto a Kubernetes cluster via Helm charts. Includes custom alerting rules, PromQL queries, and bespoke dashboards for cluster health and app metrics. Configured Alertmanager to route alerts to Slack and email based on thresholds.",
    tags: ["Prometheus", "Grafana", "Helm", "Kubernetes", "Alertmanager"],
    level: "Advanced",
    link: "https://demo.devops.jatinsharma.com/observability",
    github: "https://github.com/devops-jatin/k8s-observability"
  },
  {
    title: "Multi-Tenant EKS Cluster Deployment",
    description: "A comprehensive Terraform module deploying an AWS EKS cluster configured with namespace-level isolation, Kubernetes RBAC integrated with AWS IAM, Cluster Autoscaler, CoreDNS adjustments, and AWS VPC CNI for optimized pod IP allocation.",
    tags: ["AWS EKS", "Terraform", "IAM", "VPC CNI", "RBAC", "Auto-scaling"],
    level: "Advanced",
    link: "https://demo.devops.jatinsharma.com/eks-multitenant",
    github: "https://github.com/devops-jatin/eks-multitenant-terraform"
  },
  {
    title: "Centralized Logging Stack (EFK)",
    description: "Deploying Elasticsearch, Fluentd, and Kibana (EFK) via Helm charts on a Kubernetes cluster. Fluentd runs as a DaemonSet to scrape logs from node paths, filters/formats them, and forwards them to Elasticsearch. Kibana indexes the records for rapid log debugging and dashboard analysis.",
    tags: ["Elasticsearch", "Fluentd", "Kibana", "Helm", "Kubernetes", "DaemonSet"],
    level: "Advanced",
    link: "https://demo.devops.jatinsharma.com/efk-logging",
    github: "https://github.com/devops-jatin/k8s-efk-logging"
  },
  {
    title: "Serverless Log Processor",
    description: "An event-driven pipeline where access logs uploaded to an S3 bucket trigger AWS Lambda execution. The Lambda function parses, transforms, and indexes the logs inside an OpenSearch service cluster. SNS handles error routing and alert emails.",
    tags: ["AWS Lambda", "S3", "OpenSearch", "Python", "Serverless", "SNS"],
    level: "Intermediate",
    link: "https://demo.devops.jatinsharma.com/serverless-logs",
    github: "https://github.com/devops-jatin/serverless-log-processor"
  },
  {
    title: "Blue-Green Deployment Demo",
    description: "A practical implementation of zero-downtime deployments using Nginx reverse proxy and Docker containers. Scripted workflow to seamlessly switch traffic between application versions.",
    tags: ["Docker", "Nginx", "Bash", "Networking"],
    level: "Intermediate",
    link: "https://demo.devops.jatinsharma.com/blue-green",
    github: "https://github.com/devops-jatin/blue-green-deployment"
  },
  {
    title: "Automated Server Config",
    description: "Ansible playbooks and roles to completely bootstrap bare-metal Linux servers. Secures SSH, sets up firewall rules, installs necessary runtimes, and creates user accounts idempotently.",
    tags: ["Ansible", "Linux", "Security", "Automation"],
    level: "Intermediate",
    link: "https://demo.devops.jatinsharma.com/ansible",
    github: "https://github.com/devops-jatin/ansible-server-bootstrap"
  }
];

export const labs: Lab[] = [
  {
    id: "docker-nginx",
    title: "Deploy Nginx with Docker",
    duration: "30 mins",
    tool: "Docker",
    description: "Learn the basics of Docker by writing a Dockerfile, building an image, and running an Nginx web server.",
    completed: true,
    steps: [
      "Create a working directory for your project: `mkdir docker-nginx && cd docker-nginx`",
      "Create a simple homepage: `echo '<h1>Hello from Docker!</h1>' > index.html`",
      "Create a `Dockerfile` with the following configuration:\n```dockerfile\nFROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/index.html\n```",
      "Build your Docker image: `docker build -t custom-nginx .`",
      "Run the image as a background container: `docker run -d -p 8080:80 --name my-nginx custom-nginx`",
      "Test by opening `http://localhost:8080` in your web browser or running `curl http://localhost:8080`."
    ]
  },
  {
    id: "jenkins-pipeline",
    title: "Setup a Jenkins Pipeline",
    duration: "60 mins",
    tool: "Jenkins",
    description: "Create a multibranch Jenkins declarative pipeline that builds and tests a sample Node.js application.",
    completed: false,
    steps: [
      "Run Jenkins locally using Docker: `docker run -d -p 8080:8080 -p 50000:50000 --name jenkins jenkins/jenkins:lts`",
      "Access Jenkins at `http://localhost:8080` and unlock it using the administrator password shown in logs.",
      "Install recommended plugins and install the NodeJS tool plugin via Manage Jenkins -> Tools.",
      "Create a `Jenkinsfile` in your Git project repository:\n```groovy\npipeline {\n    agent any\n    tools { nodejs 'node' }\n    stages {\n        stage('Checkout') { steps { checkout scm } }\n        stage('Install') { steps { sh 'npm install' } }\n        stage('Test') { steps { sh 'npm test' } }\n        stage('Build') { steps { sh 'npm run build' } }\n    }\n}\n```",
      "Create a new 'Multibranch Pipeline' project in Jenkins, configure the source repository branch, and click 'Build Now'."
    ]
  },
  {
    id: "terraform-vpc",
    title: "Provision AWS VPC with Terraform",
    duration: "45 mins",
    tool: "Terraform",
    description: "Write HCL code to provision a secure VPC with public/private subnets and route tables in AWS.",
    completed: false,
    steps: [
      "Install the Terraform CLI and configure AWS local credentials via `aws configure`.",
      "Create a file named `main.tf` with this configuration:\n```hcl\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\nresource \"aws_vpc\" \"main\" {\n  cidr_block = \"10.0.0.0/16\"\n  tags = { Name = \"dev-vpc\" }\n}\nresource \"aws_subnet\" \"public\" {\n  vpc_id                  = aws_vpc.main.id\n  cidr_block              = \"10.0.1.0/24\"\n  map_public_ip_on_launch = true\n}\n```",
      "Initialize Terraform plugins in the folder: `terraform init`",
      "View the execution layout: `terraform plan`",
      "Deploy the infrastructure onto AWS: `terraform apply` (type 'yes' to confirm)."
    ]
  },
  {
    id: "k8s-deploy",
    title: "Deploy Application to Kubernetes",
    duration: "90 mins",
    tool: "Kubernetes",
    description: "Write deployment and service manifests to run a highly available application on a local Minikube cluster.",
    completed: false,
    steps: [
      "Start a local Kubernetes cluster using minikube: `minikube start`",
      "Create a deployment manifest `deployment.yaml`:\n```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:alpine\n        ports:\n        - containerPort: 80\n```",
      "Apply the deployment to your cluster: `kubectl apply -f deployment.yaml`",
      "Expose the pods through a NodePort service: `kubectl expose deployment web-app --type=NodePort --port=80`",
      "Retrieve the local access URL: `minikube service web-app --url`"
    ]
  },
  {
    id: "bash-monitoring",
    title: "Bash Scripting System Monitor",
    duration: "40 mins",
    tool: "Linux",
    description: "Write a portable Bash script that monitors CPU, memory, and disk utilization, logs alerts, and sends a notification when thresholds are exceeded.",
    completed: false,
    steps: [
      "Create script file: `touch sys-monitor.sh && chmod +x sys-monitor.sh`",
      "Open the file and write the shell code:\n```bash\n#!/bin/bash\nTHRESHOLD=80\nDISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')\nMEM_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}' | cut -d. -f1)\nCPU_USAGE=$(top -bn1 | grep 'Cpu(s)' | sed 's/.*, *\\([0-9.]*\\)%* id.*/\\1/' | awk '{print 100 - $1}')\n\nif [ $DISK_USAGE -gt $THRESHOLD ]; then\n  echo \"ALERT: High Disk Usage ($DISK_USAGE%)\" | mail -s \"Disk Alert\" admin@domain.com\nfi\nif [ $MEM_USAGE -gt $THRESHOLD ]; then\n  echo \"ALERT: High Memory Usage ($MEM_USAGE%)\" | mail -s \"Memory Alert\" admin@domain.com\nfi\n```",
      "Test run: `./sys-monitor.sh`",
      "Automate execution every 5 minutes: `(crontab -l; echo \"*/5 * * * * $(pwd)/sys-monitor.sh\") | crontab -`"
    ]
  },
  {
    id: "ansible-hardening",
    title: "Ansible Server Hardening",
    duration: "50 mins",
    tool: "Ansible",
    description: "Write an Ansible playbook that securely hardens SSH configuration, configures firewall rules (UFW), and installs security patches.",
    completed: false,
    steps: [
      "Create inventory directory structure: `mkdir -p playbooks/roles && cd playbooks`",
      "Define `inventory` file: `echo \"[servers]\n192.168.1.50 ansible_user=root\" > inventory`",
      "Create `secure-playbook.yaml`:\n```yaml\n- hosts: servers\n  become: yes\n  tasks:\n    - name: Ensure UFW is installed\n      apt: name=ufw state=present\n    - name: Allow SSH traffic\n      ufw: rule=allow port=22 proto=tcp\n    - name: Enable UFW firewall\n      ufw: state=enabled policy=deny\n    - name: Disable password SSH login\n      lineinfile:\n        path: /etc/ssh/sshd_config\n        regexp: '^PasswordAuthentication'\n        line: 'PasswordAuthentication no'\n      notify: Restart SSH\n  handlers:\n    - name: Restart SSH\n      service: name=ssh state=restarted\n```",
      "Execute the hardening run: `ansible-playbook -i inventory secure-playbook.yaml`"
    ]
  },
  {
    id: "prometheus-alerting",
    title: "Prometheus & Grafana Alerting Setup",
    duration: "60 mins",
    tool: "Monitoring",
    description: "Deploy Prometheus Alertmanager and configure alerting rules that notify a Slack channel on high CPU or memory load.",
    completed: false,
    steps: [
      "Define custom alert rule file `alert.rules.yml`:\n```yaml\ngroups:\n  - name: resource_alerts\n    rules:\n      - alert: HostHighCpuLoad\n        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100) > 85\n        for: 2m\n        labels:\n          severity: critical\n        annotations:\n          summary: High CPU load on host\n```",
      "Configure Alertmanager configuration `alertmanager.yml`:\n```yaml\nroute:\n  receiver: 'slack-notifications'\nreceivers:\n  - name: 'slack-notifications'\n    slack_configs:\n      - api_url: 'https://hooks.slack.com/services/T00/B00/X00'\n        channel: '#devops-alerts'\n```",
      "Mount rules configuration and restart Prometheus and Alertmanager containers.",
      "Verify the alert is successfully registered in the Prometheus UI (`http://localhost:9090/alerts`)."
    ]
  }
];

export const interview: Record<string, InterviewQA[]> = {
  "Docker & K8s": [
    {
      q: "What is the difference between a Container and a Virtual Machine?",
      a: "A Virtual Machine runs a full guest operating system on top of a hypervisor, which translates instructions to the host hardware. A container runs directly on the host OS kernel, sharing it with other containers, but packaging its own dependencies and libraries. Containers are significantly lighter (MBs vs GBs), start in milliseconds instead of minutes, and use far fewer resources.",
      level: "Beginner",
    },
    {
      q: "Explain the Kubernetes Pod lifecycle.",
      a: "A Pod goes through several phases: Pending (accepted by the cluster but containers not yet created, often waiting for image pulls or scheduling), Running (bound to a node, all containers created, at least one is running or starting), Succeeded (all containers terminated with exit code 0), Failed (all containers terminated, at least one with a non-zero exit code), and Unknown (state could not be obtained, usually a node communication issue).",
      level: "Intermediate",
    },
    {
      q: "How does Docker Compose differ from Kubernetes?",
      a: "Docker Compose is a tool for defining and running multi-container Docker applications on a single host using a YAML file. It is ideal for local development and testing environments. Kubernetes is a production-grade orchestration platform for running containers across a cluster of many hosts, providing automatic scaling, self-healing, load balancing, rolling updates, and secret management.",
      level: "Beginner",
    },
    {
      q: "What is a Kubernetes Ingress and when would you use it?",
      a: "A Kubernetes Ingress is an API object that manages external HTTP/S access to services inside a cluster. Rather than exposing each service individually with a LoadBalancer (which creates a cloud load balancer per service, which is costly), an Ingress controller (like Nginx or Traefik) routes traffic based on hostnames and URL paths to internal ClusterIP services. Use it when you need path-based routing, SSL/TLS termination, or virtual hosting.",
      level: "Intermediate",
    },
    {
      q: "Explain Kubernetes resource Requests and Limits.",
      a: "Resource Requests are the guaranteed amount of CPU/memory that the scheduler reserves for a pod when placing it on a node. Limits are the maximum a container can consume. If a container exceeds its memory limit it is OOMKilled; if it exceeds CPU limit it is throttled. Setting these correctly is critical for cluster stability and preventing the 'noisy neighbor' problem.",
      level: "Intermediate",
    },
    {
      q: "What is a Dockerfile ENTRYPOINT vs CMD?",
      a: "CMD provides default arguments that can be overridden at runtime (e.g., 'docker run image <new-cmd>'). ENTRYPOINT defines the executable that always runs; it cannot be overridden by runtime arguments (only with --entrypoint flag). The best practice is to use ENTRYPOINT for the main process and CMD for default, overridable arguments: ENTRYPOINT [\"nginx\"] CMD [\"-g\", \"daemon off;\"]",
      level: "Beginner",
    },
    {
      q: "What is Kubernetes Horizontal Pod Autoscaler (HPA)?",
      a: "HPA automatically scales the number of pod replicas in a Deployment or StatefulSet based on observed metrics (CPU usage, memory, or custom metrics from Prometheus). It queries the Metrics Server at regular intervals (default 15s) and adjusts replica count between a defined min and max. Example: 'kubectl autoscale deployment frontend --cpu-percent=50 --min=2 --max=10' scales out when CPU exceeds 50%.",
      level: "Advanced",
    },
    {
      q: "What is a Sidecar container pattern in Kubernetes?",
      a: "A sidecar is a utility container that runs in the same Pod alongside the main application container. It shares the same storage volume, loopback network interface, and lifecycle. Typical use cases include log forwarding (e.g. Fluentd forwarding stdout logs), proxying network traffic (e.g. Istio Envoy sidecars for service mesh), and secrets syncing (e.g. Vault agent loading secrets into memory).",
      level: "Intermediate",
    },
    {
      q: "How does Kubernetes resolve service names internally via DNS?",
      a: "Kubernetes runs a cluster DNS service (usually CoreDNS). When a Service is created, it is allocated a DNS name: `<service-name>.<namespace>.svc.cluster.local`. Pods querying this name have their DNS queries redirected to the CoreDNS Pods, which resolve the name to the Service's virtual ClusterIP. Kube-proxy then handles routing from that ClusterIP to actual Pod IPs.",
      level: "Intermediate",
    },
    {
      q: "What are Taints and Tolerations in Kubernetes?",
      a: "Taints are node properties that repel pods (e.g. preventing pods from scheduling on control-plane nodes, or degraded nodes). Tolerations are applied to pods, enabling them to schedule on nodes with matching taints. Example: A node is tainted with `key=dedicated:NoSchedule`. Only pods carrying a toleration matching this key can schedule there. This is used to partition nodes for specific workloads.",
      level: "Advanced",
    }
  ],
  "CI/CD & GitOps": [
    {
      q: "What is Blue-Green deployment?",
      a: "A release strategy that reduces downtime and risk by maintaining two identical production environments called Blue and Green. At any given time, only one environment is live (e.g., Blue serves production traffic). You deploy the new version to the idle environment (Green), run smoke tests, then switch the load balancer to Green. If issues arise, traffic is instantly switched back to Blue. The main trade-off is that it requires double the infrastructure cost.",
      level: "Intermediate",
    },
    {
      q: "Explain declarative vs. scripted pipelines in Jenkins.",
      a: "Declarative pipelines use a strict, simplified syntax with a predefined structure (pipeline { agent any stages { ... } }). They are easier to read, have built-in error handling, and support the Blue Ocean UI well. Scripted pipelines use Groovy code directly (node { stage('Build') { ... } }), giving maximum flexibility for complex logic, but they are harder to maintain and less readable for teams.",
      level: "Beginner",
    },
    {
      q: "What is GitOps and how does ArgoCD implement it?",
      a: "GitOps is an operational framework that uses a Git repository as the single source of truth for declarative infrastructure and application definitions. Any change to production is made via a pull request to the Git repo. ArgoCD is a pull-based GitOps tool that runs inside the Kubernetes cluster. It continuously watches the Git repository and automatically syncs the cluster state to match the desired state defined in Git, alerting on any drift.",
      level: "Advanced",
    },
    {
      q: "What is Canary deployment?",
      a: "Canary deployment is a technique to gradually roll out a new version by directing a small percentage of user traffic (e.g., 5%) to the new version while the majority continues to receive the stable version. You monitor metrics (error rate, latency) on the canary, and if they look healthy, you progressively increase traffic to the new version until it handles 100%. This minimizes blast radius compared to a full rollout.",
      level: "Advanced",
    },
    {
      q: "What is the purpose of a Jenkinsfile?",
      a: "A Jenkinsfile is a text file that contains the definition of a Jenkins Pipeline and is checked into source control. This brings pipeline-as-code benefits: version history, code review for pipeline changes, ability to recover pipelines if Jenkins is lost, and a single source of truth. It enables the pipeline definition to live alongside the application code it deploys.",
      level: "Beginner",
    },
    {
      q: "What is the difference between ArgoCD manual and auto-sync?",
      a: "In Manual Sync mode, when Git configuration drifts from cluster state, ArgoCD marks the application as OutOfSync, requiring manual intervention to hit Sync. In Auto-Sync mode, ArgoCD automatically executes resource modifications to match Git state. Autoyns can also be configured with self-heal (overwrites manual cluster changes) and prune (deletes resources removed in Git).",
      level: "Intermediate",
    },
    {
      q: "How do you protect Git secret leaks in automated pipelines?",
      a: "Use tools like `git-secrets`, `gitleaks`, or pre-commit hooks that scan files for AWS keys, private tokens, or passwords before commit. In CI pipelines, use secrets scanners as the very first test step. Ensure all database credentials and API tokens are injected dynamically in memory via tools like HashiCorp Vault or Cloud Secret Managers.",
      level: "Advanced",
    }
  ],
  "Terraform & IaC": [
    {
      q: "What does 'Infrastructure as Code' mean?",
      a: "IaC is the process of managing and provisioning computing infrastructure through machine-readable definition files, rather than through manual processes or interactive configuration tools. Benefits include version control (track changes in Git), repeatability (identical environments every time), self-documentation, and the ability to peer-review infrastructure changes before applying them.",
      level: "Beginner",
    },
    {
      q: "Explain Terraform state and why it matters.",
      a: "Terraform state is a JSON file (terraform.tfstate) that maps your configuration to real-world resources. It tracks resource IDs, metadata, and dependencies. Without state, Terraform cannot know what already exists in your infrastructure. State should always be stored remotely (S3 + DynamoDB, Terraform Cloud) for team use, and never committed to Git, as it can contain sensitive values.",
      level: "Intermediate",
    },
    {
      q: "What is the difference between Terraform plan and apply?",
      a: "'terraform plan' is a dry-run that shows what changes Terraform will make (create, update, destroy) without making any real changes. It is the equivalent of a diff. 'terraform apply' executes those changes. Best practice in CI/CD is to run plan on pull requests so the team can review the impact before merging, then apply after merge.",
      level: "Beginner",
    },
    {
      q: "What are Terraform modules and why use them?",
      a: "A Terraform module is a reusable, self-contained collection of Terraform configurations that represents a logical component (e.g., a VPC module, an EKS module). They enforce consistency, reduce code duplication, and allow teams to abstract infrastructure complexity. Root modules call child modules using the 'module' block. Public modules are available on the Terraform Registry.",
      level: "Intermediate",
    },
    {
      q: "How does Terraform handle resource drift?",
      a: "Resource drift occurs when infrastructure changes are made outside of Terraform (e.g. manually updating security group rules via AWS console). When running `terraform plan` or `terraform apply`, Terraform queries the actual state of resources, compares it against the local state file, and generates a plan to revert those manual changes, reconciling infrastructure back to configuration definitions.",
      level: "Intermediate",
    },
    {
      q: "What is a Terraform remote backend and state locking?",
      a: "A remote backend (like AWS S3 or HashiCorp Consul) stores the terraform state file remotely rather than locally, allowing multiple team members to share access. State locking (using DynamoDB or Consul locks) prevents multiple developers from executing terraform apply at the same time, avoiding state file corruption and resource double-provisioning.",
      level: "Advanced",
    }
  ],
  "Linux & Networking": [
    {
      q: "How do you find all processes using a specific port?",
      a: "Use 'lsof -i :<port>' (e.g., lsof -i :8080) or 'ss -tlnp | grep :<port>' or 'netstat -tlnp | grep :<port>'. The ss command is preferred on modern systems as netstat is deprecated. These show the process name, PID, and socket state, allowing you to identify and kill processes blocking a port.",
      level: "Beginner",
    },
    {
      q: "What is the difference between a hard link and a soft link in Linux?",
      a: "A hard link is a directory entry pointing directly to the inode of a file. Deleting the original file does not affect the hard link because both point to the same inode. Hard links cannot span filesystems or link to directories. A symbolic (soft) link is a separate file that contains the path to the target. If the target is deleted, the symlink becomes a 'dangling link' and breaks.",
      level: "Beginner",
    },
    {
      q: "How would you troubleshoot high CPU usage on a Linux server?",
      a: "Step 1: Run 'top' or 'htop' to identify the PID consuming the most CPU. Step 2: Use 'ps aux --sort=-%cpu' for a sorted snapshot. Step 3: Use 'strace -p <PID>' to see system calls. Step 4: For Java apps, use 'jstack' for thread dumps. Step 5: Check logs in /var/log. Step 6: Examine cron jobs with 'crontab -l'. Step 7: Use 'perf top' or 'sar' for deeper profiling.",
      level: "Intermediate",
    },
    {
      q: "Explain the TCP three-way handshake.",
      a: "The TCP three-way handshake establishes a connection: (1) SYN — the client sends a segment with the SYN flag set and a random initial sequence number (ISN). (2) SYN-ACK — the server responds with both SYN and ACK flags set, acknowledging the client's ISN and sending its own ISN. (3) ACK — the client acknowledges the server's ISN. After this, the connection is established and data transfer can begin.",
      level: "Intermediate",
    },
    {
      q: "What is an inode and what happens when inodes are exhausted?",
      a: "An inode is a data structure in Unix filesystems storing metadata about a file (size, owner, permissions, data blocks location) except the filename and actual data. If a disk runs out of inodes (e.g. due to millions of tiny files like cache or session logs), you will get a 'No space left on device' error even if there is plenty of gigabytes of disk storage remaining.",
      level: "Advanced",
    },
    {
      q: "How do you trace packet routing paths and test network latency?",
      a: "Use `traceroute <destination>` (sends UDP or ICMP probes with incrementing TTL values) or `mtr <destination>` (combines traceroute and ping, continuously monitoring packet loss and latency). Use `ping` for basic latency testing, `tcpdump` to capture raw TCP/UDP packets, and `dig` or `nslookup` for DNS tracing.",
      level: "Intermediate",
    }
  ],
  "General & System Design": [
    {
      q: "How do you handle secrets in DevOps pipelines?",
      a: "Secrets should never be hardcoded in source code or committed to version control (use tools like git-secrets or pre-commit hooks to prevent this). Store secrets in dedicated secret management systems: HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault. In CI/CD pipelines (Jenkins, GitHub Actions), use masked environment variables or native secret stores that inject values at runtime without exposing them in logs.",
      level: "Intermediate",
    },
    {
      q: "What is the 12-Factor App methodology and how does DevOps relate to it?",
      a: "The 12-Factor App is a methodology for building software-as-a-service apps that are portable and cloud-ready. Key factors include: storing config in environment variables (not code), treating logs as event streams, exporting services via port binding, and designing stateless processes. DevOps practices like containerization, CI/CD, and IaC directly enable these factors — containers provide environment parity, pipelines enforce automated testing, and environment variables handle configuration.",
      level: "Advanced",
    },
    {
      q: "How would you design a highly available system on AWS?",
      a: "Use multiple Availability Zones (AZs) for all components. Deploy EC2 instances in an Auto Scaling Group across AZs behind an Application Load Balancer. Use RDS Multi-AZ for database HA with automatic failover. Store static assets in S3 with CloudFront CDN. Use ElastiCache for session storage to keep app stateless. Implement health checks at every layer. Use Route 53 with health checks for DNS failover. Aim for an RTO and RPO aligned with business SLAs.",
      level: "Advanced",
    },
    {
      q: "What is observability and how does it differ from monitoring?",
      a: "Monitoring tells you WHEN something is broken (based on predefined thresholds and known failure modes). Observability tells you WHY something is broken by letting you explore arbitrary questions about your system's internal state using three pillars: Metrics (time-series numerical data, e.g., Prometheus), Logs (timestamped event records, e.g., ELK), and Traces (request flow across distributed services, e.g., Jaeger/Tempo). Observability is proactive; monitoring is reactive.",
      level: "Advanced",
    },
    {
      q: "What are RTO and RPO in Disaster Recovery planning?",
      a: "Recovery Time Objective (RTO) is the maximum acceptable duration of downtime before an application must be restored (how long can the business survive without the system). Recovery Point Objective (RPO) is the maximum acceptable age of data that can be lost due to outage (e.g. database backup interval). A lower RTO/RPO requires active-active multi-region replication and is more expensive.",
      level: "Advanced",
    }
  ]
};

export const resources: ResourceCategory[] = [
  {
    title: "Official Documentation",
    links: [
      { name: "Kubernetes Documentation Portal", url: "https://kubernetes.io/docs/home/" },
      { name: "Terraform Providers Registry", url: "https://registry.terraform.io/" },
      { name: "Docker Reference Docs", url: "https://docs.docker.com/reference/" },
      { name: "AWS Well-Architected Framework", url: "https://aws.amazon.com/architecture/well-architected/" },
      { name: "Ansible Official Guides", url: "https://docs.ansible.com/ansible/latest/index.html" },
      { name: "Prometheus Monitoring Server", url: "https://prometheus.io/docs/introduction/overview/" }
    ]
  },
  {
    title: "Recommended Books",
    links: [
      { name: "The DevOps Handbook (Gene Kim, Jez Humble)", url: "https://www.amazon.com/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002" },
      { name: "Site Reliability Engineering (Google Team)", url: "https://sre.google/sre-book/table-of-contents/" },
      { name: "Kubernetes Up & Running (Kelsey Hightower)", url: "https://www.oreilly.com/library/view/kubernetes-up-and/9781492046523/" },
      { name: "Accelerate (Dr. Nicole Forsgren)", url: "https://itrevolution.com/book/accelerate/" },
      { name: "Designing Data-Intensive Applications", url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781492003052/" }
    ]
  },
  {
    title: "YouTube Channels & Courses",
    links: [
      { name: "TechWorld with Nana - DevOps Bootcamp", url: "https://www.youtube.com/@TechWorldwithNana" },
      { name: "NetworkChuck - Network & Linux Academy", url: "https://www.youtube.com/@NetworkChuck" },
      { name: "DevOps Toolkit - K8s and CI/CD Deep Dives", url: "https://www.youtube.com/@DevOpsToolkit" },
      { name: "Hussein Nasser - Software & Network Engineering", url: "https://www.youtube.com/@HusseinNasser" },
      { name: "Kunal Kushwaha - Cloud-Native Tutorials", url: "https://www.youtube.com/@KunalKushwaha" }
    ]
  },
  {
    title: "Cheatsheets & Development Tools",
    links: [
      { name: "Linux Command Line Cheatsheet", url: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/" },
      { name: "Git Flow Branching Tutorial", url: "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" },
      { name: "Regex101 Regular Expression Parser", url: "https://regex101.com/" },
      { name: "Crontab Schedule Generator", url: "https://crontab.guru/" },
      { name: "Kube.academy - Free Kubernetes Lessons", url: "https://kube.academy/" }
    ]
  }
];

export const bestPractices: BestPracticeItem[] = [
  {
    category: "Docker",
    title: "Enforce Multi-Stage Builds",
    rationale: "Single-stage builds include compiler runtimes, build tools, and raw source code, making the resulting container image bloated and vulnerable.",
    recommendation: "Separate compilation from final run execution. Build artifacts in a builder image, then copy only the compiled binaries/assets into a minimal base runtime.",
    example: "```dockerfile\n# Stage 1: Build\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Run\nFROM node:18-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY package*.json ./\nRUN npm ci --only=production\nUSER node\nCMD [\"node\", \"dist/index.js\"]\n```"
  },
  {
    category: "Docker",
    title: "Do Not Run Containers as Root",
    rationale: "If a container runs as root and is compromised, attackers can gain privilege access to node namespaces and escape to the host kernel.",
    recommendation: "Explicitly declare a non-root group and user inside the Dockerfile, and switch context using the USER instruction.",
    example: "```dockerfile\nFROM alpine:3.18\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nWORKDIR /home/appuser\nUSER appuser\nCMD [\"sleep\", \"30\"]\n```"
  },
  {
    category: "Kubernetes",
    title: "Always Define Resource Requests and Limits",
    rationale: "Without requests and limits, Kubernetes scheduler cannot properly allocate workloads, leading to noisy-neighbor issues and node crashes (OOMKilled).",
    recommendation: "Specify CPU and Memory requests (guaranteed reservation) and limits (hard ceilings) for every container.",
    example: "```yaml\nresources:\n  requests:\n    memory: \"256Mi\"\n    cpu: \"250m\"\n  limits:\n    memory: \"512Mi\"\n    cpu: \"500m\"\n```"
  },
  {
    category: "Kubernetes",
    title: "Configure Liveness and Readiness Probes",
    rationale: "Kubernetes needs to know if a container has successfully booted and can receive traffic, and if it is healthy or needs restarting.",
    recommendation: "Implement readiness probes for routing endpoints, and liveness probes for internal health checks. Avoid database connectivity in liveness checks.",
    example: "```yaml\nreadinessProbe:\n  httpGet:\n    path: /healthz/ready\n    port: 8080\n  initialDelaySeconds: 5\n  periodSeconds: 10\nlivenessProbe:\n  httpGet:\n    path: /healthz/live\n    port: 8080\n  initialDelaySeconds: 15\n  periodSeconds: 20\n```"
  },
  {
    category: "Terraform",
    title: "Configure Remote Backend & State Locking",
    rationale: "Storing state files locally blocks team collaboration and risks state corruption or data loss when running parallel applications.",
    recommendation: "Configure Terraform backends (such as S3) and integrate state locking (using DynamoDB tables). Pin provider versions.",
    example: "```hcl\nterraform {\n  required_version = \">= 1.5.0\"\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n  backend \"s3\" {\n    bucket         = \"my-company-tfstate\"\n    key            = \"global/s3/terraform.tfstate\"\n    region         = \"us-east-1\"\n    dynamodb_table = \"my-company-tflocks\"\n    encrypt        = true\n  }\n}\n```"
  },
  {
    category: "CI/CD",
    title: "Enforce Build-Once Deploy-Many Pattern",
    rationale: "Recompiling code or rebuilding images for different environments (Dev, Staging, Prod) introduces environment variance and invalidates testing status.",
    recommendation: "Build a single artifact (such as a Docker image), tag it with the commit SHA, and push it to the registry. Deploy that exact image across environments, passing environment variables for configuration.",
    example: "```yaml\n# GitHub Actions Snippet\nsteps:\n  - name: Build & Push Image\n    run: |\n      docker build -t ecr/app:${{ github.sha }} .\n      docker push ecr/app:${{ github.sha }}\n\n  - name: Deploy to Staging\n    run: helm upgrade --set image.tag=${{ github.sha }} app-staging\n```"
  },
  {
    category: "Linux & Security",
    title: "Restrict SSH Access and Disable Password Authentication",
    rationale: "SSH endpoints are targets for brute-force attacks. Password-based authentication makes servers vulnerable to credential leakage.",
    recommendation: "Harden `/etc/ssh/sshd_config` by disabling password auth and empty passwords. Restrict login via public keys only.",
    example: "```text\n# Edit /etc/ssh/sshd_config\nPasswordAuthentication no\nPubkeyAuthentication yes\nPermitEmptyPasswords no\nPermitRootLogin prohibit-password\nMaxAuthTries 3\n```"
  }
];
