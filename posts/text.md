---
title: "IAP Terraform Example for Cloud Run"
subtitle: "Securing Cloud Run Deployment with VPC Ingress Controls, Identity Aware Proxy (IAP), and OAuth2: A Step-by-Step Guide using Terraform.
"
date: "Oct 12, 2023."

---


This sample demonstrates the deployment of a [Cloud Run](https://cloud.run/) service with VPC [ingress controls] that restrict traffic exclusively to the Cloud HTTPS load balancer equipped with enabled [Identity Aware Proxy (IAP)][iap].

[iap]: https://cloud.google.com/iap
[ingress controls]: https://cloud.google.com/run/docs/securing/ingress

IAP authenticates users through their Google accounts or other external Identity Providers (IdP) and validates their access permissions for the deployed service.

## Prerequisites
You need a registered domain name for which you can modify specific DNS settings. You can also use a subdomain.

## Deployment

### Project Creation
Create a new project if you prefer not to use an existing one. For instance:
```sh
gcloud projects create cloud-run-iap-terraform-demo-1 --name="IAP Cloud Run Demo" --set-as-default
```

If this project isn't your current default, use:
```sh
gcloud config set project cloud-run-iap-terraform-demo-1
```

### Billing Activation
Activate billing for the project if you haven't done so yet. First, obtain your billing account ID:
```sh
gcloud beta billing accounts list
```

This will return something like:
```sh
ACCOUNT_ID            NAME                OPEN  MASTER_ACCOUNT_ID
0X0X0X-0X0X0X-0X0X0X  My Billing Account  True
```

Now enable billing for your new project:
```sh
gcloud beta billing projects link cloud-run-iap-terraform-demo-1 --billing-account 0X0X0X-0X0X0X-0X0X0X
```

### API Enablement
Enable the following APIs in your current project:

```sh
gcloud services enable \
    run.googleapis.com \
    containerregistry.googleapis.com \
    compute.googleapis.com \
    iap.googleapis.com \
    vpcaccess.googleapis.com
```

This might take a moment to complete. Optionally, confirm that these services are now enabled for your project:
```sh
gcloud services list
```

### OAuth2 Web Application Setup
Create an OAuth2 web application (and make note of its client_id and client_secret) from https://console.cloud.google.com/apis/credentials.

If it prompts you to configure a consent screen first, follow these steps:
- Select 'External' for *User Type*
- Provide an 'App name', e.g., `IAP Cloud Run Demo`
- Choose your email address from the dropdown for 'User support email'
- Leave the 'App domain' section blank  
- Add your email address as 'Developer contact information'
- Click 'save and continue' on the subsequent screens and then navigate to the 'Credentials' menu link in the left menu bar

### Terraform Execution
Begin by initializing Terraform:

```sh
terraform init
```

(Optional) preview the resources that will be created:
```sh
terraform apply -var project_id=<project-id> \
    -var region=<region> \
    -var domain=<domain> \
    -var lb_name=<lb_name> \
    -var iap_client_id=<client_id> \
    -var iap_client_secret=<client_secret>
```

Deploy using Terraform; this will take several minutes to complete:

```sh
terraform apply -var project_id=<project-id> \
    -var region=<region> \
    -var domain=<domain> \
    -var lb_name=<lb_name> \
    -var iap_client_id=<client_id> \
    -var iap_client_secret=<client_secret> \
    -auto-approve
```

In this command, fill in:
- project-id: the project id, e.g., `cloud-run-iap-terraform-demo-1`
- region: the region (optional, defaults to `us-central1`)
- domain: the domain name you want to use, e.g., `corpapp.ahmet.dev`
- lb_name: name for the load balancer (optional, defaults to `iap-lb`)
- iap_client_id: the client id for the OAuth client you created earlier
- iap_client_secret: the client secret for the OAuth client you created earlier. You can find it by editing the OAuth client.

#### Troubleshooting Errors
Note: If you encounter an error saying `Output refers to sensitive values`, add `sensitive = true` to `backend_services` in `.terraform/modules/lb-http/modules/serverless_negs/outputs.tf`.

If you receive an error like `Error: Error creating Connector: googleapi: Error 403: The caller does not have permission`, it indicates that the account used to execute the Terraform lacks sufficient permissions. You can rectify this by running:
```sh
gcloud auth application-default login
```

If the issue persists, inspect your project's service account in the GCP console under `IAM & Admin` -> 'Service Accounts', named e.g., `Default compute service account`. From there, troubleshoot missing permissions.

### Post-deployment Steps
Upon completion of the deployment:

1. Configure DNS records of the domain name used with the provided IP address. In other words, add a record named `www` or your subdomain name, of type `A`, pointing to your IPv4 IP address, the output of your Terraform command. **Please allow 10-30 minutes for the load balancer to become functional.**
2. Return to the Credentials page and add the `oauth2_redirect_uri` output to the Authorized Redirect URIs of the web application you created here.

Now, you should be able to authenticate to your web application based on the users/groups specified in [`main.tf`](./main.tf) by visiting your domain.

## Cleanup

:warning: Do not lose the `.tfstate` file created in this directory.

Execute the previous `terraform apply` command as `terraform destroy` to clean up the created resources.

## Infrastructure
The diagram below illustrates the infrastructure created.


### Serverless VPC Access Connector
The [Serverless VPC Access][serverless vpc access] establishes a connection between your Cloud Run service and resources inside your VPC.

### Cloud Run Service
The [Cloud Run Service][cloud run] is a compute service that runs your website. In this example, a simple hello world Docker container is used.

### Serverless Network Endpoint Group
The [Serverless Network Endpoint Group][serverless neg] links your Load Balancer and your Cloud Run service, allowing requests to the load balancer to be routed to the serverless app backend.

### HTTP/S Load Balancer
The [HTTP/S Load Balancer][load balancer] listens for incoming traffic on an IP address and directs it to a backend service. A [Terraform module][tf lb] is employed, which creates various resources, including:
- Global Address
- HTTP Proxy 
- Forwarding rules
- Managed SSL certificate
- Serverless NEG as backend

In this scenario, the load balancer doesn't operate in the traditional sense, where the load is balanced among a group of backend services. Instead, all load is forwarded to the configured backend.

### IAM Policy
The [IAM Policy][iam policy] specifies which members will be granted the `iap.httpsResourceAccessor` role. This role

### IAM Policy Overview
The [IAM Policy][iam policy] specifies the individuals authorized to assume the `iap.httpsResourceAccessor` role. Through this policy, you control access permissions for your website, deciding who has entry and who does not.

### IAM Guidelines for Identity-Aware Proxy WebBackendService
The [IAM Policy for Identity-Aware Proxy WebBackendService][iap] configures the settings of the [Identity-Aware Proxy][iap] and links the defined IAM Policy to the Load Balancer. Within this setup, you can choose the HTTPS resource, access the information panel, and add or remove members from the `IAP-secured Web App User` role.

[Serverless VPC Access]: https://console.cloud.google.com/networking/connectors
[Cloud Run]: https://console.cloud.google.com/run
[Serverless NEG]: https://console.cloud.google.com/compute/networkendpointgroups/list
[Load Balancer]: https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list
[Terraform LB Module]: https://github.com/terraform-google-modules/terraform-google-lb-http
[IAM Policy Details]: https://console.cloud.google.com/iam-admin/roles/details/roles%3Ciap.httpsResourceAccessor
[IAP Configuration]: https://console.cloud.google.com/security/iap
