---
title: "AWS Amazon S3 to SQS to AWS Lambda"
subtitle: "Create a Lambda Function for Image Resizing on S3 Uploads via SQS Notifications.
"
date: "Sep 8, 2023."

---


![image](https://github.com/aliyevom/AWS-cloudcraft/blob/main/S3-SNS-SQS-Lambda-S3.png?raw=true)



This SAM template facilitates the deployment of a Lambda function, an SQS queue, two S3 buckets, and the necessary IAM resources to execute the application. The SQS Queue consumes events triggered by object creation within an Amazon S3 bucket, specifically when the uploaded file has a .jpg extension. These SQS events then trigger the Lambda function, which, in turn, validates the uploaded file as an image and generates a thumbnail version, storing it in another designated S3 bucket.

For more information about this architecture pattern, refer to the Serverless Land Patterns guide: [https://serverlessland.com/patterns/s3-sqs-lambda](https://serverlessland.com/patterns/s3-sqs-lambda)

**Important Note**: This application employs various AWS services, and there may be associated costs beyond the Free Tier usage. Kindly review the [AWS Pricing page](https://aws.amazon.com/pricing/) for detailed cost information. You are solely responsible for any AWS costs incurred, and this example does not come with any implied warranty.

## Prerequisites

Ensure you have the following prerequisites in place before proceeding:

* An [AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) - If you don't already have one, create an account and log in. The IAM user you use should possess adequate permissions for necessary AWS service interactions and resource management.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) - Install and configure the AWS Command Line Interface.
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - Make sure Git is installed.
* [AWS Serverless Application Model (AWS SAM)](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) - Install AWS SAM.

## Deployment Instructions

1. Begin by creating a new directory. Navigate to this directory in your terminal and clone the GitHub repository:
    ```bash
    git clone https://github.com/aliyevom/AWS-Amazon-S3-to-SQS-to-AWS-Lambda.git
    ```

2. Change your working directory to the pattern directory:
    ```bash
    cd AWS-cloudcraft/s3-sqs-lambda
    ```

3. Install dependencies:
   ```bash
   npm --prefix ./src install ./src
   ```

4. From the command line, employ AWS SAM to build and deploy the AWS resources as specified in the `template.yml` file:
    ```bash
    sam build
    sam deploy --guided
    ```

5. During the interactive prompts:
   - Enter a stack name.
   - Provide a source bucket name.
   - Specify a destination bucket name.
   - Enter a queue name.
   - Choose your desired AWS Region.
   - Allow SAM CLI to create the required IAM roles.

   After running `sam deploy --guided` once and saving the arguments to a configuration file (`samconfig.toml`), you can use `sam deploy` in the future with these defaults.

6. Take note of the outputs generated during the SAM deployment process. These outputs contain the resource names and/or ARNs required for testing.

## How It Functions

* Use the AWS CLI or AWS console to upload an image to the source S3 Bucket.
* If the uploaded object has a .jpg extension, the Lambda function generates a thumbnail and stores it in the target bucket.
* The code assumes that the destination bucket already exists and its name is a concatenation of the source bucket name followed by "-resized."

==============================================

## Testing

Execute the following AWS CLI command to upload an image to the S3 bucket. Please replace `{SourceBucketName}` with the name of your source S3 Bucket, as provided in the stack outputs.

```bash
aws s3 cp './events/exampleImage.png'  s3://{SourceBucketName}
```

Use the following command to verify the creation of a new version of the image in the destination bucket:

```bash
aws s3 ls s3://{DestinationBucketName}
```

## Cleanup

1. Delete the stack:
    ```bash
    aws cloudformation delete-stack --stack-name STACK_NAME
    ```

2. Confirm that the stack has been deleted:
    ```bash
    aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'STACK_NAME')].StackStatus"
    ```

----

Copyright 2023 Amazon.com, Inc. or its affiliates. All Rights Reserved.

# S3-SNS-SQS-Lambda-S3
