---
title: Boosting Bot Protection with HAProxy and Stick Tables
author: Jinsoo Heo
pubDatetime: 2023-03-09T11:53:48.000Z
modDatetime: 2023-03-18T18:37:36.000Z
draft: false
tags:
  - haproxy
  - bot-protection
ogImage: "https://images.unsplash.com/photo-1597733336794-12d05021d510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG5ldHdvcmt8ZW58MHx8fHwxNjc5MTY0NjUw&ixlib=rb-4.0.3&q=80&w=2000"
description: Protecting your website or application from malicious bots is a critical part of modern web development. Bots can overload your servers with requests, steal ...
lang: en
---

Protecting your website or application from malicious bots is a critical part of modern web development. Bots can overload your servers with requests, steal sensitive data, and compromise the security of your system. One way to defend against bots is by using a load balancer like HAProxy, along with a technique called stick tables.

HAProxy is an open-source load balancer that can distribute incoming traffic across multiple backend servers. It's widely used in production environments because of its high performance, scalability, and flexibility. Stick tables are a feature of HAProxy that allow you to store and retrieve key-value pairs in memory, based on various criteria such as IP addresses, user agents, cookies, or URLs.

In the context of bot protection, stick tables can be used to track the behavior of clients that send requests to your servers. By analyzing the patterns and frequencies of these requests, you can identify bots that exhibit abnormal or malicious behavior, and take appropriate actions to block them. Here are some examples of how stick tables can be used for bot protection:

-   Rate limiting: You can use a stick table to count the number of requests made by each client IP address, and apply a rate limit to prevent excessive requests from the same IP. For example, you can configure HAProxy to allow only 100 requests per minute from each IP, and drop any additional requests. This can help prevent botnets from overloading your servers with fake traffic.
-   Bot detection: You can use a stick table to track the user agents of incoming requests, and compare them against known bot signatures or blacklists. If a user agent matches a bot pattern, you can flag the corresponding IP address as a bot and apply a specific policy, such as redirecting them to a captcha page or blocking them altogether.
-   Session persistence: You can use a stick table to associate incoming requests with specific backend servers, based on a session ID or a cookie. This can help prevent bots from disrupting the user experience by jumping between different servers or dropping their sessions. By sticking a client to a specific server, you can ensure that their requests are handled consistently and efficiently.

To configure stick tables in HAProxy, you need to define a table in the frontend or backend section of your configuration file, and specify the key, type, size, and other attributes of the table. Here's an example of how to define a stick table that counts the number of requests per minute from each IP address:

```plaintext
frontend http
  stick-table type ip size 1m expire 1m store http_req_rate(60s)
  http-request track-sc0 src
  http-request deny if { sc0_http_req_rate(0) gt 100 }
  ...

```

In this example, we create a stick table of type "ip" that can store up to 1 million entries (IP addresses), and expires after 1 minute of inactivity. We also define a "sc0" fetch method that tracks the HTTP request rate of each IP address over the last 60 seconds. Finally, we use a "deny" rule to drop any requests from IPs that exceed a threshold of 100 requests per minute.

Of course, this is just a simple example of what you can achieve with stick tables in HAProxy. Depending on your specific use case and requirements, you can customize the table attributes, fetch methods, match criteria, and actions to suit your needs. HAProxy provides a rich set of features and options for stick tables, which you can explore in the official documentation.

In conclusion, stick tables are a powerful tool for bot protection in HAProxy, that can help you defend your system from various types of bot attacks. By leveraging the flexibility and performance of HAProxy, you can apply sophisticated bot protection strategies that combine rate limiting, bot detection, session persistence, and other techniques. Stick tables provide a way to store and analyze client data in real-time, without the need for external databases or complex scripting.

However, it's important to note that stick tables are not a silver bullet for bot protection. They can help you detect and block many types of bots, but they are not foolproof. Bots can use various techniques to evade or bypass stick tables, such as rotating IP addresses, using randomized user agents, or exploiting vulnerabilities in your web application. Therefore, it's recommended to use multiple layers of defense, such as firewalls, content delivery networks (CDNs), and third-party bot detection services, in addition to HAProxy and stick tables.

In addition, stick tables can also introduce some performance overhead, especially if you have a high volume of traffic or a large number of entries in the table. You should monitor the resource usage of your HAProxy instance, and adjust the table settings as needed to avoid memory or CPU saturation. For example, you can increase the table size, reduce the expiration time, or limit the number of fetch methods or actions.

Overall, stick tables are a valuable feature of HAProxy that can enhance your bot protection capabilities and improve the reliability of your web infrastructure. By investing in a robust bot protection strategy, you can ensure that your users can access your website or application safely and securely, while keeping the bad actors at bay.

To summarize, here are some key takeaways from this article:

-   HAProxy is a powerful load balancer that can be used for bot protection by leveraging stick tables.
-   Stick tables allow you to store and retrieve client data in memory, based on various criteria such as IP addresses, user agents, cookies, or URLs.
-   Stick tables can be used for various bot protection strategies, such as rate limiting, bot detection, session persistence, and more.
-   Stick tables should be used in combination with other bot protection techniques, and should be tuned for optimal performance and resource usage.
-   Bot protection is an ongoing process that requires continuous monitoring, analysis, and adaptation to stay ahead of the evolving bot landscape.

By following these best practices and keeping up with the latest trends and technologies in bot protection, you can build a resilient and secure web infrastructure that can withstand the challenges of the digital age.
