---
title: "Integrating ChatGPT with Slack using AWS API Gateway, Lambda, and Serverless Framework: A Step-by-Step Guide with Code Examples"
author: Jinsoo Heo
pubDatetime: 2023-03-09T18:11:06.000Z
draft: false
tags:
  - slack
  - lambda
  - aws-lambda
  - serverless
  - serverless-framework
  - chatgpt
  - slack-bot
  - aws-api-gateway
  - api-gateway
ogImage: "https://images.unsplash.com/photo-1524635962361-d7f8ae9c79b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDN8fHNsYWNrfGVufDB8fHx8MTY3ODM4NTM3OQ&ixlib=rb-4.0.3&q=80&w=2000"
description: In recent years, natural language processing (NLP) has become increasingly popular in the technology industry. With advancements in machine learning and AI, ...
lang: en
---

In recent years, natural language processing (NLP) has become increasingly popular in the technology industry. With advancements in machine learning and AI, the capabilities of NLP models have grown significantly, making it possible to build chatbots that can understand and respond to human language. One such NLP model is ChatGPT, a large language model developed by OpenAI that can generate human-like responses to text input.

ChatGPT can be integrated with various messaging platforms to build chatbots that can interact with users. In this article, we will explore how to integrate ChatGPT with Slack using AWS API Gateway, Lambda, and the Serverless framework. We will also provide code examples to guide you through the integration process.

## What is AWS API Gateway?

AWS API Gateway is a fully managed service that makes it easy to create, publish, and manage APIs. It acts as a "front door" for your backend services, enabling you to create RESTful APIs that can be accessed by web or mobile applications. With AWS API Gateway, you can define the endpoints for your API and map them to backend services, configure authentication and authorization, and monitor API usage with detailed analytics.

## What is AWS Lambda?

AWS Lambda is a serverless computing service that lets you run code without provisioning or managing servers. You can write your code in a supported language, such as Python, Node.js, or Java, and AWS Lambda will automatically execute it in response to triggers, such as API requests, database events, or file uploads. With AWS Lambda, you pay only for the compute time that your code consumes, and there are no upfront costs or minimum fees.

## What is the Serverless framework?

The Serverless framework is an open-source tool for building serverless applications. It provides a command-line interface (CLI) that simplifies the process of deploying and managing serverless functions, as well as a plugin architecture that allows you to extend its functionality. With the Serverless framework, you can write and deploy serverless applications using a variety of cloud providers, including AWS, Azure, and Google Cloud.

## Integration of ChatGPT with Slack

To integrate ChatGPT with Slack, we will use AWS API Gateway to create an API that receives incoming messages from Slack, AWS Lambda to process the messages and generate a response using ChatGPT, and the Serverless framework to deploy the API and Lambda functions to AWS. Here are the steps to follow:

### Create a Slack app and bot

To get started, you need to create a Slack app and bot that will handle incoming messages from Slack. Here are the steps to follow:

-   Go to the Slack API website and create a new app.
-   Go to the "Bot" section and create a new bot user. Note down the bot token, as you will need it later.
-   Go to the "Event Subscriptions" section and enable events for your app. Add a "Bot Event" for the "message" event, and provide the URL of your API Gateway endpoint as the request URL. Slack will send a POST request to this endpoint whenever a message is sent to your bot.
-   Go to the "OAuth & Permissions" section and install your app to your Slack workspace. Note down the OAuth access token, as you will need it later.

### Set up AWS credentials

To deploy the API and Lambda functions to AWS, you need to set up your AWS credentials. Here are the steps to follow:

-   Go to the AWS Console and create a new IAM user with programmatic access. Give the user the "AdministratorAccess" policy to ensure that it has all the necessary permissions.
-   Note down the access key ID and secret access key for the user.
-   Install the AWS CLI on your local machine and configure it with your credentials by running the following command:

```shell
aws configure
```

### Set up a new Serverless service

Next, we will use the Serverless framework to create a new service that will contain our API and Lambda functions. Here are the steps to follow:

-   Open a terminal and navigate to the directory where you want to create your service.
-   Run the following command to create a new Serverless service:

```shell
sls create --template aws-nodejs --path my-service

```

This will create a new Serverless service with a basic Node.js function in the "my-service" directory.

### Install dependencies

We will use a few libraries in our Lambda function, so we need to install them as dependencies. Here are the steps to follow:

-   Navigate to the "my-service" directory and run the following command to install the necessary dependencies:

```shell
npm install axios @slack/web-api @slack/events-api
```

This will install the Axios library for making HTTP requests, as well as the Slack Web API and Events API libraries for interacting with Slack.

### Configure the Serverless service

Next, we need to configure the Serverless service to deploy our API and Lambda functions to AWS. Here are the steps to follow:

-   Open the "serverless.yml" file in your text editor.
-   Replace the contents of the file with the following:

```yaml
service: my-service

provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1

functions:
  slack:
    handler: handler.slack
    events:
      - http:
          path: /slack
          method: post

```

This configuration tells Serverless to use AWS as the provider, to use Node.js 14.x as the runtime, and to deploy a single function called "slack" that will handle HTTP POST requests to the "/slack" path.

### Write the Lambda function

Next, we need to write the Lambda function that will handle incoming messages from Slack and generate a response using ChatGPT. Here is an example of what the function might look like:

```javascript
const axios = require('axios');
const { WebClient, createEventAdapter } = require('@slack/web-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const { createEventMiddleware } = require('@slack/events-api');

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;

const web = new WebClient(slackBotToken);
const eventMiddleware = createEventMiddleware({ signingSecret: slackSigningSecret });
const messageAdapter = createMessageAdapter(slackSigningSecret);

const chatGPTUrl = process.env.CHAT_GPT_URL;

module.exports.slack = messageAdapter.middleware(async (payload) => {
  if (payload.callback_id === 'chat-gpt') {
    const inputText = payload.submission.text;
    const response = await axios.post(chatGPTUrl, { prompt: inputText });
    const outputText = response.data.choices[0].text.trim();
    await web.chat.postMessage({
      channel: payload.channel.id,
      text: outputText,
    });
  }
});

module.exports.events = async (event, context) => {
  if (event.body) {
    await eventMiddleware.processEvent(event);
  }
  return { statusCode: 200 };
};

```

This function uses the Slack Web API and Events API libraries to interact with Slack, the Axios library to make HTTP requests to the ChatGPT API, and the createMessageAdapter and createEventMiddleware functions to handle incoming messages from Slack.

The function starts by defining some constants for the Slack API tokens and the ChatGPT API URL. It then creates instances of the Slack Web API client, the Slack Events API middleware, and the Slack interactive message adapter.

The function exports two handlers:

-   The `slack` handler is triggered by the Slack interactive message adapter and processes incoming messages. When a user submits a message to the bot, the function sends a request to the ChatGPT API with the message as a prompt. It then posts the response from the ChatGPT API back to the Slack channel where the message was submitted.
-   The `events` handler is triggered by the AWS API Gateway and processes incoming events. It uses the Slack Events API middleware to process incoming Slack events and return a 200 status code.

### Deploy the Serverless service

Once we have written the Lambda function and configured the Serverless service, we can deploy the service to AWS. Here are the steps to follow:

-   Run the following command to deploy the service:

```shell
sls deploy

```

This will deploy the service to AWS and output the API Gateway endpoint URL that we can use to interact with the bot.

### Create a Slack app

Next, we need to create a Slack app and configure it to use the API Gateway endpoint URL as the request URL for incoming messages. Here are the steps to follow:

-   Navigate to the Slack API website and create a new Slack app.
-   In the "Event Subscriptions" section, enable events and enter the API Gateway endpoint URL as the request URL.
-   In the "Interactivity & Shortcuts" section, enable interactivity and enter the same API Gateway endpoint URL as the request URL.
-   In the "OAuth & Permissions" section, install the app to your Slack workspace and grant the necessary permissions.

### Test the integration

Once we have deployed the Serverless service and configured the Slack app, we can test the integration by sending messages to the bot in Slack. Here are the steps to follow:

-   In the Slack app, send a message to the bot with the text "Hello".
-   The bot should respond with a generated message based on the input text.

Congratulations! You have successfully integrated ChatGPT with Slack using AWS API Gateway, Lambda, and the Serverless framework.

## Conclusion

In this article, we have shown how to integrate ChatGPT with Slack using AWS API Gateway, Lambda, and the Serverless framework. We have demonstrated how to create a Serverless service, write a Lambda function, and deploy the service to AWS. We have also shown how to create a Slack app and configure it to use the API Gateway endpoint URL as the request URL for incoming messages. Finally, we have tested the integration by sending messages to the bot in Slack.

The code examples provided in this article are intended to serve as a starting point for your own ChatGPT and Slack integration. You can customize the code to fit your specific use case and deploy it to AWS using the Serverless framework.
