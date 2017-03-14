# Heroku vs AWS

Heroku and AWS are cloud services that enable developers to deploy
web and mobile apps.

Heroku is a Platform as a Service (PaaS) with
multiple features and add-ons that allow developers to focus on their
application rather than creating and maintaining infrastructure.

Amazon Web Services offers two products that are often compared to
Heroku: Elastic Computer Cloud (EC2) and Elastic Beanstalk.
Amazon Elastic Computer Cloud (EC2) is an infrastructure as a Service
(IaaS), which means developers need to set up and maintain the
infrastructure themselves. Using EC2 requires basic Unix administration
and DevOps knowledge, making the service less friendly for new developers.
Amazon's Elastic Beanstalk product is a PaaS that more closely rivals
Heroku: developers can choose to access the infrastructure, but don't
have to completely set it up themselves.


### What's Heroku?
- Platform as a Service (PaaS)
- Developers don't have to know anything about infrastructure management,
freeing them to focus on app development
- Provides development instruments, a pre-installed operating system,
and redundant servers
- Many features make it easy to deploy and maintain apps:
  - Capacity Provisioning
  - Database Rollback
  - Application Rollback
  - Manual Vertical and Horizontal Scaling
  - App Health Monitoring
  - Full GitHub Integration: this imposes a fast and easy deployment
  workflow
- Charged on a per-thread basis: you pay for the server resources
(dynos) you use
- No bandwidth limitations: your app will continue to work if it
suddenly goes viral and gets a ton of visitors.
- Initially designed and still optimized for Ruby on Rails
  - Also runs environments for Python, PHP, Clojure, Go, Java, Scala,
  and Node.js applications
- Has many add-ons
  - Redis is easier to start using with Heroku than AWS because less
  setup is required
- Relatively simple, very well documented, and supported by an online
community

### What are the AWS options?
- Elastic Computer Cloud (EC2) is an Infrastructure-as-a-Service (IaaS)
  - Developers must set up and manage the infrastructure
  - Includes templates for deployment and multiple configurations
  (CPU, RAM, etc.)
  - Can be used with other AWS products. S3 is often used to store
  assets permanently in the cloud
  - Developers need to know basic Unix Admin and AWS DevOps

- Elastic Beanstalk
  - Developers can deploy apps via AWS's Management Console, a Git repo,
  or an IDE
  - Custom infrastructure setup is available, but not required
  - Environments for Ruby, NodeJS, Python, Go, Docker, PHP, and .NET
  applications
- Pricing is based on the AWS resources used, likely EC2 instances or
S3 buckets. There is a free tier, but users will be charged AWS rates
if their applications use more resources than the free tier provides.

Why would you use Heroku?
  - For a fast MVP
  - If you don't need many computational resources (otherwise it
    gets more expensive as you purchase the use of more dynos)
  - If you want lots of support and documentation

Why would you use Elastic Beanstalk?
  - For a fast MVP
  - If don't need many computational resources (paying for Elastic Load
    Balancing and more EC2 instances becomes expensive)

Why would you use EC2 ?
  - For the infrastructure flexibility
  - If you know and love DevOps
  - It's less expensive to scale
  - If you need a lot of computational resources
  - If you want to use other AWS services

For App Academy use, Heroku is preferred.
  - Beginner friendly
  - Free for your full stack project needs
  - Built for Rails apps
  - Well-documented and well-supported (by online communities and the
    App Academy instructional staff)

### Additional Resources:
- [Heroku vs AWS Comparison Table][comparison-table]
- [Elastic Beanstalk Product Page][elastic-beanstalk]
- [EC2 Product Page][ec2]

[comparison-table]: https://dzone.com/articles/heroku-or-amazon-web-services-which-is-best-for-your-startup

[elastic-beanstalk]: https://aws.amazon.com/elasticbeanstalk/
[heroku]: https://www.heroku.com/platform
[ec2]: https://aws.amazon.com/ec2/
