---
title: "AWS-Jenkins-Pipeline"
subtitle: "Automating AWS Deployments with Jenkins: A CI/CD Pipeline Tutorial."
date: "Sep 18, 2023."
---

In this repository, we demonstrate how to establish a robust CI/CD pipeline by seamlessly integrating Jenkins with AWS CodeBuild and AWS CodeDeploy. This powerful combination automates the deployment of AWS CodeBuild artifacts using AWS CodeDeploy, facilitating a streamlined development and deployment process. 

When properly configured, this CI/CD pipeline is triggered automatically whenever code changes are pushed to your GitHub repository. It orchestrates the entire process: code compilation by CodeBuild and subsequent deployment by CodeDeploy.

The functional pipeline sets up a fully managed build service to compile your source code, generating code artifacts ready for deployment on your production environment.

![CI/CD Pipeline](https://user-images.githubusercontent.com/48589838/89983289-e5fc2900-dc94-11ea-9258-685375cad1dd.png)

### Step-by-Step Walkthrough

1. **Resource Creation**: Begin by creating the necessary infrastructure resources, including the Jenkins server, CodeBuild project, and CodeDeploy application. These resources enable a seamless CI/CD pipeline.

2. **Access and Unlock Jenkins Server**: Gain access to the Jenkins server by copying the JenkinsServerDNSName value from the CloudFormation stack's Outputs tab and pasting it into your browser. Unlock the server following the provided instructions.

3. **Project Setup and Configuration**: Create a project and configure the CodeDeploy Jenkins plugin to seamlessly integrate CodeDeploy with Jenkins, enabling smooth code deployments.

4. **Testing the CI/CD Pipeline**: To verify the pipeline's functionality, place an application in your GitHub repository. This may include source files, executables, and packages. After pushing the code changes to your repository, monitor the Jenkins server dashboard to observe the pipeline in action.

![CodeDeploy Configuration](https://user-images.githubusercontent.com/48589838/89985330-87d14500-dc98-11ea-9964-c1211d0c8a03.png)

![Jenkins Server Unlock](https://user-images.githubusercontent.com/48589838/89985442-ba7b3d80-dc98-11ea-9cb4-9014339ba6e3.png)

![Pipeline Testing](https://user-images.githubusercontent.com/48589838/89986084-a71ca200-dc99-11ea-9021-097d82084171.png)

Upon successful completion, Jenkins will confirm the deployment of your web application, and you can verify its operation using your ELB DNS name.

![Successful Deployment](https://user-images.githubusercontent.com/48589838/89986033-9409d200-dc99-11ea-883c-37f6a469e02c.png)
